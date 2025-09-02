from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import inspect, delete
from core.models import RefreshSession
from core.repositories.base_repository import SQlAlchemyRepository


class AuthRepository(SQlAlchemyRepository):
    model = RefreshSession

    @classmethod
    async def delete_multi(cls, session: AsyncSession, **filters):
        stmt = delete(RefreshSession).filter_by(**filters)
        await session.execute(stmt)
