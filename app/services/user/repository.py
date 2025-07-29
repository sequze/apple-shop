from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from core.models import User
from core.repositories.base_repository import SQlAlchemyRepository


class UserRepository(SQlAlchemyRepository):
    model = User

    async def get_by_id(
            self,
            session: AsyncSession,
            id: int) -> User:
        """
        get User by id or None if User not exists
        """
        u = await session.get(User, id)
        return u

    async def update(
            self,
            session: AsyncSession,
            data: dict,
            user: User) -> User:
        for name, value in data.items():
            setattr(user, name, value)
        await session.commit()
        await session.refresh(user)
        return user

    async def get_by_email(self, session: AsyncSession, email: str):
        return await session.scalar(select(User).where(User.email == email))
