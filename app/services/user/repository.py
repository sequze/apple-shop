from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from core.models import User
from core.repositories.base_repository import SQlAlchemyRepository


class UserRepository(SQlAlchemyRepository):
    model = User

    async def get_by_email(self, session: AsyncSession, email: str):
        return await session.scalar(select(User).where(User.email == email))
