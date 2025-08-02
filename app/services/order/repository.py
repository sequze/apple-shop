from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.inspection import inspect
from sqlalchemy import select, insert
from sqlalchemy.orm import joinedload

from core.models import Order
from core.repositories.base_repository import SQlAlchemyRepository


class OrderRepository(SQlAlchemyRepository):
    model = Order

    async def create(self, session: AsyncSession, data: dict):
        stmt = insert(Order).values(**data, total_amount=0).returning(Order)
        result = await session.execute(stmt)
        return result.scalar()
