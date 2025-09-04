from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import insert, select, and_
from datetime import timezone, datetime
from core.models import Discount
from core.repositories.base_repository import SQlAlchemyRepository


class DiscountRepository(SQlAlchemyRepository):
    model = Discount
    session: AsyncSession

    @classmethod
    async def get_all(cls, session: AsyncSession):
        return await session.scalars(
            select(Discount)
            .where(
                and_(
                    Discount.end_date > datetime.now(),
                    Discount.is_active == True,
                )))
    @classmethod
    async def get_by_filters(
            cls,
            session: AsyncSession,
            filters: dict,
            one: bool = True):
        stmt = select(Discount).filter_by(**filters, is_active=True).where(Discount.end_date < datetime.now())
        res = await session.execute(stmt)
        if one:
            return res.scalar_one_or_none()
        return res.scalars().all()

    @classmethod
    async def create(cls, session: AsyncSession, data: dict) -> Discount:
        data["start_date"] = data["start_date"].astimezone(timezone.utc).replace(tzinfo=None)
        data["end_date"] = data["end_date"].astimezone(timezone.utc).replace(tzinfo=None)
        stmt = insert(Discount).values(**data).returning(Discount)
        result = await session.execute(stmt)
        return result.scalar()
