from sqlalchemy.ext.asyncio.session import AsyncSession

from core.models import Order, Product
from core.repositories.uow import UnitOfWork
from services.order.repository import OrderRepository
from services.order.schemas import OrderDTO, OrderCreateSchema, OrderUpdateSchema
from services.order_item.repository import OrderItemRepository
from services.product.service import ProductNotFoundError, get_product_discount


class OrderNotFoundError(Exception):
    pass


class OrderService:
    def __init__(
            self,
            repository: OrderRepository,
            uow: UnitOfWork,
    ):
        self.repository = repository
        self.uow = uow

    async def __find_by_id(self, session: AsyncSession, id: int) -> Order:
        order = await self.repository.get_by_id(session, id)
        if order is None:
            raise OrderNotFoundError
        return order

    async def get_by_id(self, id: int) -> OrderDTO:
        async with self.uow as uow:
            order = await self.repository.get_by_id(uow.session, id)
            return OrderDTO.model_validate(order)

    async def update(self, data: OrderUpdateSchema, id: int) -> OrderDTO:
        async with self.uow as uow:
            order = await self.__find_by_id(uow.session, id)
            await self.repository.update(uow.session, data.model_dump(exclude_unset=True), order)
            await uow.commit()
            await uow.session.refresh(order)
            return OrderDTO.model_validate(order)

    async def get_all(self) -> list[OrderDTO]:
        async with self.uow as uow:
            orders = await self.repository.get_all(uow.session)
            return [OrderDTO.model_validate(order) for order in orders]


class DeleteOrderUseCase:
    def __init__(
            self,
            order_repository: OrderRepository,
            order_item_repository: OrderItemRepository,
            uow: UnitOfWork,
    ):
        self.order_repository = order_repository
        self.order_item_repository = order_item_repository
        self.uow = uow

    async def execute(self, id: int):
        async with self.uow as uow:
            session = uow.session
            order = await self.order_repository.get_by_id(session, id)
            if order is None:
                raise OrderNotFoundError
            for item in order.items:
                await self.order_item_repository.delete(session, item)
            await self.order_repository.delete(session, order)
            await session.commit()


class CreateOrderUseCase:
    def __init__(
            self,
            order_repository: OrderRepository,
            order_item_repository: OrderItemRepository,
            uow: UnitOfWork,
    ):
        self.order_repository = order_repository
        self.order_item_repository = order_item_repository
        self.uow = uow

    async def execute(self, data: OrderCreateSchema, user_id: int) -> OrderDTO:

        async with self.uow as uow:
            session = uow.session
            data_to_create = data.model_dump(exclude_unset=True)
            data_to_create.update(user_id=user_id, total_amount=0)
            total_amount = 0
            order = await self.order_repository.create(session, data_to_create)
            for product in data.items:
                product_db = await session.get(Product, product.product_id)
                if not product_db: raise ProductNotFoundError
                product_discount = get_product_discount(product_db)
                total_amount += product_discount.price_with_discount * product.quantity
                await self.order_item_repository.create(
                    session,
                    {
                        "quantity": product.quantity,
                        "unit_price": product_discount.price_with_discount,
                        "order_id": order.id,
                        "product_id": product.product_id,
                }
                )
            order.total_amount = total_amount
            await session.commit()
            await session.refresh(order)
            return OrderDTO.model_validate(order)
