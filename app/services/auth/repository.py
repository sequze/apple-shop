from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import inspect, delete
from core.models import RefreshSession
from core.repositories.base_repository import SQlAlchemyRepository


class AuthRepository(SQlAlchemyRepository):
    model = RefreshSession

    async def update(
            self,
            session: AsyncSession,
            data: dict,
            refresh_session: RefreshSession) -> RefreshSession:
        mapper = inspect(RefreshSession)
        for key, value in data.items():
            if key in mapper.attrs:
                setattr(refresh_session, key, value)
        await session.commit()
        await session.refresh(refresh_session)
        return refresh_session

    async def get_by_id(self, session: AsyncSession, id: int) -> RefreshSession | None:
        return await session.get(RefreshSession, id)

    async def delete_multi(self, session: AsyncSession, **filters):
        stmt = delete(RefreshSession).filter_by(**filters)
        await session.execute(stmt)
        await session.commit()
