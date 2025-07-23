from repositories.uow import UnitOfWork
from services.product.repository import ProductRepository
from services.product.schemas import ProductCreateSchema, ProductDTO, ProductUpdateSchema


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
            return ProductDTO.model_validate(product)

    async def update(self, data: ProductUpdateSchema, id: int) -> ProductDTO:
        async with self.uow as uow:
            product = await self.repository.get_by_id(uow.session, id)
            product_updated = await self.repository.update(uow.session, data.model_dump(exclude_unset=True), product)
            return ProductDTO.model_validate(product_updated)

    async def delete(self, id: int) -> ProductDTO:
        async with self.uow as uow:
            product = await self.repository.get_by_id(uow.session, id)
            if product is None: raise ProductNotFoundError
            await self.repository.delete(uow.session, product)
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
