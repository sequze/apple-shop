from sqlalchemy.ext.asyncio.session import AsyncSession

from core.models import OrderItem
from repositories.uow import UnitOfWork
from services.order_item.repository import OrderItemRepository
from services.order_item.schemas import OrderItemCreateSchema, OrderItemDTO, OrderItemUpdateSchema


class OrderItemNotFoundError(Exception):
    pass


class OrderItemAlreadyExistsError(Exception):
    pass


class OrderItemService:
    def __init__(
            self,
            repository: OrderItemRepository,
            uow: UnitOfWork,
    ):
        self.uow = uow
        self.repository = repository

    async def __find_by_id(self, session: AsyncSession, id: int) -> OrderItem:
        item = await self.repository.get_by_id(session, id)
        if item is None:
            raise OrderItemNotFoundError
        return item

    async def __validate_order_and_product(self, session: AsyncSession, order_id: int, product_id: int) -> None:
        item = await self.repository.get_by_order_and_product(session, order_id, product_id)
        if item: raise OrderItemAlreadyExistsError

    async def create(
            self,
            data: OrderItemCreateSchema,
    ) -> OrderItemDTO:
        async with self.uow as uow:
            await self.__validate_order_and_product(uow.session, data.order_id, data.product_id)
            item = await self.repository.create(uow.session, data.model_dump())

            return OrderItemDTO.model_validate(item)

    async def update(self, data: OrderItemUpdateSchema, id: int) -> OrderItemDTO:
        async with self.uow as uow:
            item = await self.__find_by_id(uow.session, id)
            item_updated = await self.repository.update(uow.session, data.model_dump(exclude_unset=True), item)
            return OrderItemDTO.model_validate(item_updated)

    async def delete(self, id: int) -> OrderItemDTO:
        async with self.uow as uow:
            item = await self.__find_by_id(uow.session, id)
            await self.repository.delete(uow.session, item)
            return OrderItemDTO.model_validate(item)

    async def get_by_id(self, id: int) -> OrderItemDTO:
        async with self.uow as uow:
            item = await self.__find_by_id(uow.session, id)
            return OrderItemDTO.model_validate(item)

    async def get_all(self) -> list[OrderItemDTO]:
        async with self.uow as uow:
            items = await self.repository.get_all(uow.session)
            return [OrderItemDTO.model_validate(item) for item in items]
