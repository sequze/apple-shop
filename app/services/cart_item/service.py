from decimal import Decimal

from sqlalchemy.ext.asyncio.session import AsyncSession

from core.models import CartItem
from core.repositories.uow import UnitOfWork
from services.cart_item.repository import CartItemRepository
from services.cart_item.schemas import CartItemDTO, CartItemCreateSchema, CartItemUpdateSchema
from services.product.schemas import ProductDTO


class CartItemNotFoundError(Exception):
    pass


class CartItemAlreadyExistsError(Exception):
    pass



def get_cart_item_dto(item: CartItem) -> CartItemDTO:
    total_price = item.product.price
    discount_description = None
    if len(item.product.discounts) == 0: discount = 0
    else:
        discount = max([ds for ds in item.product.discounts if ds.is_active == True], key=lambda d: d.percent)
        discount_description = discount.description
        discount = discount.percent
    price_with_discount = total_price * Decimal((100 - discount) / 100)
    return CartItemDTO(
        total_price=total_price,
        discount=discount,
        discount_description=discount_description,
        price_with_discount=price_with_discount,
        id=item.id,
        product=ProductDTO.model_validate(item.product),
        quantity=item.quantity,
        user_id=item.user_id,
        product_id=item.product.id,

    )


class CartItemService:

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
            return get_cart_item_dto(cart_item)
    async def create(self, data: CartItemCreateSchema):
        async with self.uow as uow:
            await self.__validate_by_product_and_user(uow.session, data.user_id, data.product_id)
            cart_item = await self.repository.create(uow.session, data.model_dump())
            await uow.commit()
            return get_cart_item_dto(cart_item)

    async def update(self, data: CartItemUpdateSchema, id: int):
        async with self.uow as uow:
            cart_item = await self.__find_by_id(uow.session, id)
            await self.repository.update(uow.session, data.model_dump(exclude_unset=True),
                                                             cart_item)
            await uow.commit()
            await uow.session.refresh(cart_item)
            return get_cart_item_dto(cart_item)

    async def delete(self, id: int):
        async with self.uow as uow:
            cart_item = await self.__find_by_id(uow.session, id)
            await self.repository.delete(uow.session, cart_item)
            await uow.commit()
            return get_cart_item_dto(cart_item)

    async def get_all(self) -> list[CartItemDTO]:
        async with self.uow as uow:
            cart_items = await self.repository.get_all(uow.session)
            return [get_cart_item_dto(item) for item in cart_items]
