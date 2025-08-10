from sqlalchemy.ext.asyncio.session import AsyncSession

from core.models import Discount
from core.repositories.uow import UnitOfWork
from .repository import DiscountRepository
from .schemas import DiscountCreateSchema, DiscountDTO, DiscountUpdateSchema
from ..category.repository import CategoryRepository
from ..category.service import CategoryNotFoundError
from ..product.exceptions import ProductNotFoundError
from ..product.repository import ProductRepository


class DiscountNotFoundError(Exception):
    pass


class InvalidTimeIntervalError(Exception):
    """End date bigger then start date"""
    pass


class DiscountService:

    def __init__(
            self,
            repository: DiscountRepository,
            uow: UnitOfWork,
    ):
        self.repository = repository
        self.uow = uow

    async def __find_by_id(self, session: AsyncSession, id: int) -> Discount:
        discount = await self.repository.get_by_id(session, id)
        if discount is None:
            raise DiscountNotFoundError
        return discount

    async def create(
            self,
            data: DiscountCreateSchema
    ) -> DiscountDTO:
        async with self.uow as uow:
            res = await self.repository.create(uow.session, data.model_dump())
            await uow.commit()
            return DiscountDTO.model_validate(res)

    async def get_by_id(self, id: int) -> DiscountDTO:
        async with self.uow as uow:
            discount = await self.__find_by_id(uow.session, id)
            return DiscountDTO.model_validate(discount)

    async def get_all(self) -> list[DiscountDTO]:
        async with self.uow as uow:
            res = await self.repository.get_all(uow.session)
            return [DiscountDTO.model_validate(discount) for discount in res]

    async def delete(self, id: int) -> DiscountDTO:
        async with self.uow as uow:
            discount = await self.__find_by_id(uow.session, id)
            await self.repository.delete(uow.session, discount)
            await uow.commit()
            return DiscountDTO.model_validate(discount)

    async def update(self, id: int, data: DiscountUpdateSchema) -> DiscountDTO:
        async with self.uow as uow:
            discount = await self.__find_by_id(uow.session, id)
            if data.end_date or data.start_date:
                if data.end_date: data.end_date = data.end_date.replace(tzinfo=None)
                if data.start_date: data.start_date = data.start_date.replace(tzinfo=None)
                end_date = data.end_date if data.end_date else discount.end_date
                start_date = data.start_date if data.start_date else discount.start_date
                if end_date <= start_date:
                    raise InvalidTimeIntervalError
            await self.repository.update(
                uow.session,
                data.model_dump(exclude_unset=True),
                discount)
            await uow.commit()
            await uow.session.refresh(discount)
            return DiscountDTO.model_validate(discount)

    async def deactivate(self, id: int) -> None:
        async with self.uow as uow:
            discount = await self.__find_by_id(uow.session, id)
            discount.is_active = False
            await uow.commit()


class AddDiscountToProductUseCase:
    def __init__(
            self,
            product_rep: ProductRepository,
            discount_rep: DiscountRepository,
            uow: UnitOfWork):
        self.product_rep = product_rep
        self.discount_rep = discount_rep
        self.uow = uow

    async def execute(self, product_id, discount_id) -> None:
        async with self.uow as uow:
            product = await self.product_rep.get_by_id(uow.session, product_id)
            discount = await self.discount_rep.get_by_id(uow.session, discount_id)
            if product is None: raise ProductNotFoundError
            if discount is None: raise DiscountNotFoundError
            if discount not in product.discounts:
                product.discounts.append(discount)
            await uow.commit()




class AddDiscountToCategoryUseCase:
    def __init__(
            self,
            category_rep: CategoryRepository,
            discount_rep: DiscountRepository,
            uow: UnitOfWork,
    ):
        self.category_rep = category_rep
        self.discount_rep = discount_rep
        self.uow = uow

    async def execute(self, category_id, discount_id) -> None:
        async with self.uow as uow:
            category = await self.category_rep.get_with_products(uow.session, category_id)
            if category is None: raise CategoryNotFoundError
            discount = await self.discount_rep.get_by_id(uow.session, discount_id)
            if discount is None: raise DiscountNotFoundError
            for product in category.products:
                if discount not in product.discounts:
                    product.discounts.append(discount)
            await uow.commit()

class CreateProductDiscountUseCase:
    def __init__(
            self,
            product_rep: ProductRepository,
            discount_rep: DiscountRepository,
            uow: UnitOfWork):
        self.product_rep = product_rep
        self.discount_rep = discount_rep
        self.uow = uow

    async def execute(self, data: DiscountCreateSchema, product_id) -> None:
        async with self.uow as uow:
            product = await self.product_rep.get_by_id(uow.session, product_id)
            if product is None: raise ProductNotFoundError
            discount = await self.discount_rep.create(uow.session, data.model_dump())
            product.discounts.append(discount)
            await uow.commit()

class CreateCategoryDiscountUseCase:
    def __init__(
            self,
            category_rep: CategoryRepository,
            discount_rep: DiscountRepository,
            uow: UnitOfWork,
    ):
        self.category_rep = category_rep
        self.discount_rep = discount_rep
        self.uow = uow

    async def execute(self, data: DiscountCreateSchema, category_id) -> None:
        async with self.uow as uow:
            category = await self.category_rep.get_with_products(uow.session, category_id)
            if category is None: raise CategoryNotFoundError
            discount = await self.discount_rep.create(uow.session, data.model_dump())
            for product in category.products:
                product.discounts.append(discount)
            await uow.commit()


class DeleteDiscountFromCategoryUseCase:
    def __init__(
            self,
            uow: UnitOfWork,
            category_rep: CategoryRepository,
    ):
        self.uow = uow
        self.category_rep = category_rep

    async def execute(self, category_id, discount_id) -> None:
        async with self.uow as uow:
            category = await self.category_rep.get_with_products(uow.session, category_id)
            if category is None: raise CategoryNotFoundError
            for product in category.products:
                for discount in product.discounts:
                    if discount.id == discount_id:
                        product.discounts.remove(discount)
            await uow.commit()
