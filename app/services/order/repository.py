from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.inspection import inspect
from sqlalchemy import select, insert
from sqlalchemy.orm import joinedload

from core.models import Order
from repositories.base_repository import SQlAlchemyRepository


class OrderRepository(SQlAlchemyRepository):
    model = Order

    async def create(self, session: AsyncSession, data: dict):
        stmt = insert(Order).values(**data, total_amount=0).returning(Order)
        result = await session.execute(stmt)
        await session.commit()
        return result.scalar()

    async def update(
            self,
            session: AsyncSession,
            data: dict,
            order: Order) -> Order:
        mapper = inspect(Order)
        for key, value in data.items():
            if key in mapper.attrs:
                setattr(order, key, value)
        await session.commit()
        await session.refresh(order)
        return order

    async def get_by_id(self, session: AsyncSession, id: int):
        return await session.get(Order, id)

    async def get_with_items(self, session: AsyncSession, filters=None, one: bool = False):
        stmt = select(Order).options(joinedload(Order.items))
        if filters:
            stmt = stmt.filter_by(**filters)
        res = await session.execute(stmt)
        if one:
            return res.unique().scalar_one_or_none()
        return res.scalars().all()
