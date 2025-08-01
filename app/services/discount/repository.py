from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.inspection import inspect
from sqlalchemy import insert
from datetime import timezone
from core.models import Discount
from core.repositories.base_repository import SQlAlchemyRepository


class DiscountRepository(SQlAlchemyRepository):
    model = Discount

    async def create(self, session: AsyncSession, data: dict) -> Discount:
        data["start_date"] = data["start_date"].astimezone(timezone.utc).replace(tzinfo=None)
        data["end_date"] = data["end_date"].astimezone(timezone.utc).replace(tzinfo=None)
        stmt = insert(Discount).values(**data).returning(Discount)
        result = await session.execute(stmt)
        return result.scalar()
