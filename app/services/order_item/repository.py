from sqlalchemy.ext.asyncio.session import AsyncSession

from core.models import OrderItem
from core.repositories.base_repository import SQlAlchemyRepository
from sqlalchemy import inspect


class OrderItemRepository(SQlAlchemyRepository):
    model = OrderItem

    @classmethod
    async def get_by_order_and_product(cls, session: AsyncSession, order_id: int, product_id: int) -> OrderItem | None:
        return await cls.get_by_filters(
            session,
            {"order_id": order_id, "product_id": product_id},
            one=True
        )
