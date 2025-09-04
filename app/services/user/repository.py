from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from core.models import User
from core.repositories.base_repository import SQlAlchemyRepository


class UserRepository(SQlAlchemyRepository):
    model = User

    @classmethod
    async def get_by_email(cls, session: AsyncSession, email: str):
        return await session.scalar(select(User).where(User.email == email))

    @classmethod
    async def get_with_orders(cls, session: AsyncSession, id: int):
        user = await session.scalar(
            select(User).where(User.id == id).options(selectinload(User.orders))
        )
        return user

    @classmethod
    async def get_with_cart_items(cls, session: AsyncSession, id: int):
        return await session.scalar(
            select(User).where(User.id == id).options(selectinload(User.cart_items))
        )
