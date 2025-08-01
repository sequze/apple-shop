from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import inspect, select
from core.models import CartItem
from core.repositories.base_repository import SQlAlchemyRepository


class CartItemRepository(SQlAlchemyRepository):
    model = CartItem

    async def get_by_user_and_product(self, session: AsyncSession, user_id: int, product_id: int) -> CartItem | None:
        return await session.scalar(select(CartItem).filter_by(user_id=user_id, product_id=product_id))
