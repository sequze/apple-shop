from sqlalchemy.ext.asyncio.session import AsyncSession

from core.models import OrderItem
from repositories.base_repository import SQlAlchemyRepository
from sqlalchemy import inspect


class OrderItemRepository(SQlAlchemyRepository):
    model = OrderItem

    async def update(
            self,
            session: AsyncSession,
            data: dict,
            order_item: OrderItem) -> OrderItem:
        mapper = inspect(OrderItem)
        for key, value in data.items():
            if key in mapper.attrs:
                setattr(order_item, key, value)
        await session.commit()
        await session.refresh(order_item)
        return order_item

    async def get_by_id(self, session: AsyncSession, id: int) -> OrderItem | None:
        return await session.get(OrderItem, id)
