from sqlalchemy.ext.asyncio.session import AsyncSession

from core.models import Discount
from core.repositories.uow import UnitOfWork
from .repository import DiscountRepository
from .schemas import DiscountCreateSchema, DiscountDTO, DiscountUpdateSchema


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
