from sqlalchemy.ext.asyncio.session import AsyncSession

from core.models import CartItem
from repositories.uow import UnitOfWork
from services.cart_item.repository import CartItemRepository
from services.cart_item.schemas import CartItemDTO, CartItemCreateSchema, CartItemUpdateSchema


class CartItemNotFoundError(Exception):
    pass


class CartItemAlreadyExistsError(Exception):
    pass


class CartItemService:
    # get_all get_by_id create update delete

    def __init__(
            self,
            repository: CartItemRepository,
            uow: UnitOfWork):
        self.repository = repository
        self.uow = uow

    async def __find_by_id(self, session: AsyncSession, id: int) -> CartItem:
        cart_item = await self.repository.get_by_id(session, id)
        if cart_item is None:
            raise CartItemNotFoundError
        return cart_item

    async def __validate_by_product_and_user(
            self,
            session: AsyncSession,
            user_id: int,
            product_id: int
    ) -> None:
        cart_item = await self.repository.get_by_user_and_product(session, user_id, product_id)
        if cart_item: raise CartItemAlreadyExistsError

    async def get_by_id(self, id: int) -> CartItemDTO:
        async with self.uow as uow:
            cart_item = await self.__find_by_id(uow.session, id)
            return CartItemDTO.model_validate(cart_item)

    async def create(self, data: CartItemCreateSchema):
        async with self.uow as uow:
            await self.__validate_by_product_and_user(uow.session, data.user_id, data.product_id)
            cart_item = await self.repository.create(uow.session, data.model_dump())
            return CartItemDTO.model_validate(cart_item)

    async def update(self, data: CartItemUpdateSchema, id: int):
        async with self.uow as uow:
            cart_item = await self.__find_by_id(uow.session, id)
            cart_item_updated = await self.repository.update(uow.session, data.model_dump(exclude_unset=True),
                                                             cart_item)
            return CartItemDTO.model_validate(cart_item_updated)

    async def delete(self, id: int):
        async with self.uow as uow:
            cart_item = await self.__find_by_id(uow.session, id)
            await self.repository.delete(uow.session, cart_item)
            return CartItemDTO.model_validate(cart_item)

    async def get_all(self) -> list[CartItemDTO]:
        async with self.uow as uow:
            cart_items = await self.repository.get_all(uow.session)
            return [CartItemDTO.model_validate(item) for item in cart_items]
