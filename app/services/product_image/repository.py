from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import inspect
from core.models import ProductImage
from core.repositories.base_repository import SQlAlchemyRepository


class ProductImageRepository(SQlAlchemyRepository):
    model = ProductImage

    async def update(
            self,
            session: AsyncSession,
            data: dict,
            image: ProductImage) -> ProductImage:
        mapper = inspect(ProductImage)
        for key, value in data.items():
            if key in mapper.attrs:
                setattr(image, key, value)
        await session.commit()
        await session.refresh(image)
        return image

    async def get_by_id(self, session: AsyncSession, id: int):
        return await session.get(ProductImage, id)
