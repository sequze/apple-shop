from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.inspection import inspect
from sqlalchemy import insert
from datetime import timezone
from core.models import Discount
from repositories.base_repository import SQlAlchemyRepository


class DiscountRepository(SQlAlchemyRepository):
    model = Discount

    async def create(self, session: AsyncSession, data: dict) -> Discount:
        data["start_date"] = data["start_date"].astimezone(timezone.utc).replace(tzinfo=None)
        data["end_date"] = data["end_date"].astimezone(timezone.utc).replace(tzinfo=None)
        stmt = insert(Discount).values(**data).returning(Discount)
        result = await session.execute(stmt)
        await session.commit()
        return result.scalar()

    async def update(
            self,
            session: AsyncSession,
            data: dict,
            discount: Discount) -> Discount:
        mapper = inspect(Discount)
        for key, value in data.items():
            if key in mapper.attrs:
                setattr(discount, key, value)
        await session.commit()
        await session.refresh(discount)
        return discount

    async def get_by_id(self, session: AsyncSession, id: int) -> Discount | None:
        return await session.get(Discount, id)

    async def deactivate(self, session: AsyncSession, entity: Discount):
        entity.is_active = False
        await session.commit()
