from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.inspection import inspect

from core.models import Product
from core.repositories.base_repository import SQlAlchemyRepository


class ProductRepository(SQlAlchemyRepository):
    model = Product

    async def update(
            self,
            session: AsyncSession,
            data: dict,
            product: Product) -> Product:
        mapper = inspect(Product)
        for key, value in data.items():
            if key in mapper.attrs:
                setattr(product, key, value)
        await session.commit()
        await session.refresh(product)
        return product

    async def get_by_id(self, session: AsyncSession, id: int):
        return await session.get(Product, id)
