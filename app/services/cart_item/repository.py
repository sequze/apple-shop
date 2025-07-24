from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import inspect, select
from core.models import CartItem
from repositories.base_repository import SQlAlchemyRepository


class CartItemRepository(SQlAlchemyRepository):
    model = CartItem

    async def update(
            self,
            session: AsyncSession,
            data: dict,
            cart_item: CartItem) -> CartItem:
        mapper = inspect(CartItem)
        for key, value in data.items():
            if key in mapper.attrs:
                setattr(cart_item, key, value)
        await session.commit()
        await session.refresh(cart_item)
        return cart_item

    async def get_by_id(self, session: AsyncSession, id: int) -> CartItem | None:
        return await session.get(CartItem, id)

    async def get_by_user_and_product(self, session: AsyncSession, user_id: int, product_id: int) -> CartItem | None:
        return await session.scalar(select(CartItem).filter_by(user_id=user_id, product_id=product_id))
