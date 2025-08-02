from sqlalchemy.ext.asyncio import AsyncSession

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from core.models import User
from core.repositories.base_repository import SQlAlchemyRepository


class UserRepository(SQlAlchemyRepository):
    model = User

    async def get_by_email(self, session: AsyncSession, email: str):
        return await session.scalar(select(User).where(User.email == email))

    async def get_with_orders(self, session: AsyncSession, id: int):
        user = await session.scalar(select(User).where(User.id == id).options(selectinload(User.orders)))
        return user

    async def get_with_cart_items(self, session: AsyncSession, id: int):
        return await session.scalar(select(User).where(User.id == id).options(selectinload(User.cart_items)))