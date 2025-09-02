from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import ProductColor
from core.repositories.base_repository import SQlAlchemyRepository


class ProductColorRepository(SQlAlchemyRepository):
    model = ProductColor

    @classmethod
    async def get_by_product_id(cls, session: AsyncSession, product_id: int) -> list[ProductColor]:
        stmt = select(ProductColor).where(ProductColor.product_id == product_id)
        result = await session.scalars(stmt)
        return list(result)