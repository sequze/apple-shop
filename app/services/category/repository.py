from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import select
from sqlalchemy.inspection import inspect
from sqlalchemy.orm import joinedload
from core.models import Category
from core.repositories.base_repository import SQlAlchemyRepository


class CategoryRepository(SQlAlchemyRepository):
    model = Category

    async def get_with_children(self, session: AsyncSession, id: int):
        res = await session.scalar(select(Category)
                                   .where(Category.id == id)
                                   .options(joinedload(Category.children)))
        return res
