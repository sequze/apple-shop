from core.repositories.uow import UnitOfWork
from plugins.s3_storage.client import DeleteFileError
from services.product.repository import ProductRepository
from services.product.schemas import ProductCreateSchema, ProductDTO, ProductUpdateSchema
from services.product_image.repository import ProductImageRepository
from plugins.s3_storage.utils import delete_file_from_storage


class ProductNotFoundError(Exception):
    """Product not found"""
    pass


class ProductService:
    def __init__(
            self,
            repository: ProductRepository,
            uow: UnitOfWork,
    ):
        self.repository = repository
        self.uow = uow

    async def create(self, data: ProductCreateSchema) -> ProductDTO:
        async with self.uow as uow:
            product = await self.repository.create(uow.session, data.model_dump())
            await uow.commit()
            return ProductDTO.model_validate(product)

    async def update(self, data: ProductUpdateSchema, id: int) -> ProductDTO:
        async with self.uow as uow:
            product = await self.repository.get_by_id(uow.session, id)
            await self.repository.update(uow.session, data.model_dump(exclude_unset=True), product)
            await uow.commit()
            await uow.session.refresh(product)
            return ProductDTO.model_validate(product)

    async def get_by_id(self, id: int) -> ProductDTO:
        async with self.uow as uow:
            product = await self.repository.get_by_id(uow.session, id)
            if product is None: raise ProductNotFoundError
            return ProductDTO.model_validate(product)

    async def get_all(self) -> list[ProductDTO]:
        async with self.uow as uow:
            products = await self.repository.get_all(uow.session)
            return [ProductDTO.model_validate(product) for product in products]


class ProductDeleteUseCase:
    def __init__(
            self,
            product_repository: ProductRepository,
            product_image_repository: ProductImageRepository,
            uow: UnitOfWork,
    ):
        self.product_repository = product_repository
        self.product_image_repository = product_image_repository
        self.uow = uow
    async def delete(self, id: int) -> ProductDTO:
        async with self.uow as uow:
            product = await self.product_repository.get_by_id(uow.session, id)
            if product is None: raise ProductNotFoundError
            for image in product.images:
                try:
                    await delete_file_from_storage(image.url)
                except DeleteFileError:
                    raise
                await self.product_image_repository.delete(uow.session, image)
            await uow.session.refresh(product)
            await self.product_repository.delete(uow.session, product)
            await uow.commit()
            return ProductDTO.model_validate(product)