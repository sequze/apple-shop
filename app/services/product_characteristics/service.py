from fastapi import UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from core.models import ProductCharacteristic, Product
from core.repositories.uow import UnitOfWork
from plugins.s3_storage.utils import delete_file_from_storage, upload_image
from services.product.exceptions import ProductNotFoundError
from services.product_characteristics.repository import ProductCharacteristicRepository
from services.product_characteristics.schemas import ProductCharacteristicUpdate, ProductCharacteristicCreate, \
    ProductCharacteristicDTO


class CharacteristicNotFoundError(Exception):
    pass


class ProductCharacteristicService:
    def __init__(self,
                 repository: ProductCharacteristicRepository,
                 uow: UnitOfWork):
        self.repository = repository
        self.uow = uow

    async def __get_by_id(self, session: AsyncSession, id: int, product_id: int) -> ProductCharacteristic:
        result = await session.execute(
            select(ProductCharacteristic).where(
                ProductCharacteristic.id == id,
                ProductCharacteristic.product_id == product_id
            )
        )
        char = result.scalar_one_or_none()
        if not char:
            raise CharacteristicNotFoundError
        return char

    async def create(self, file: UploadFile | None, data: ProductCharacteristicCreate, product_id) -> ProductCharacteristicDTO:
        async with self.uow as uow:
            product = await uow.session.get(Product, product_id)
            if product is None:
                raise ProductNotFoundError
            data_to_create = data.model_dump()
            data_to_create.update(product_id=product.id)
            if file:
                url = await upload_image(file, file.filename)
                data_to_create.update(image_url=url)
            characteristic = await self.repository.create(uow.session, data_to_create)
            await uow.commit()
            return ProductCharacteristicDTO.model_validate(characteristic)

    async def update(self, file: UploadFile | None, data: ProductCharacteristicUpdate, product_id: int, id: int) -> ProductCharacteristicDTO:
        file_to_delete = None
        async with self.uow as uow:
            characteristic = await self.__get_by_id(uow.session, id, product_id)
            data_to_update = data.model_dump(exclude_unset=True)
            if file:
                if characteristic.image_url:
                    file_to_delete = characteristic.image_url
                url = await upload_image(file, file.filename)
                data_to_update.update(image_url=url)
            await self.repository.update(uow.session, data_to_update, characteristic)
            await uow.commit()
            await uow.session.refresh(characteristic)
        if file_to_delete:
            await delete_file_from_storage(file_to_delete)
        return ProductCharacteristicDTO.model_validate(characteristic)

    async def delete(self, id: int, product_id: int) -> ProductCharacteristicDTO:
        file_to_delete = None
        async with self.uow as uow:
            characteristic = await self.__get_by_id(uow.session, id, product_id)
            if characteristic.image_url:
                file_to_delete = characteristic.image_url
            await self.repository.delete(uow.session, characteristic)
            await uow.commit()
        if file_to_delete:
            await delete_file_from_storage(file_to_delete)
        return ProductCharacteristicDTO.model_validate(characteristic)

    async def get(self, id: int) -> ProductCharacteristicDTO:
        async with self.uow as uow:
            characteristic = await self.__get_by_id(uow.session, id)
            return ProductCharacteristicDTO.model_validate(characteristic)



