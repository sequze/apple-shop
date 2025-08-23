from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, Form

from api.dependencies import product_service, product_delete_use_case, AdminUserDep, \
    product_color_service, create_product_discount_use_case, PaginationParams, product_characteristic_service
from plugins.s3_storage.client import DeleteFileError, UploadingFileError, InvalidFileTypeError
from services.category.service import CategoryNotFoundError
from services.colors.schemas import ProductColorCreateSchema, ProductColorDTO, ProductColorBaseSchema
from services.colors.service import ProductColorService
from services.discount.schemas import DiscountCreateSchema, DiscountDTO
from services.discount.service import DiscountNotFoundError
from services.product.schemas import ProductDTO, ProductCreateSchema, ProductUpdateSchema
from services.product.service import ProductService, ProductDeleteUseCase
from services.product.exceptions import ProductNotFoundError
from services.product_characteristics.schemas import ProductCharacteristicDTO, ProductCharacteristicCreate, \
    ProductCharacteristicUpdate
from services.product_characteristics.service import ProductCharacteristicService, CharacteristicNotFoundError

router = APIRouter()

product_service_dep = Annotated[ProductService, Depends(product_service)]

ProductCharacteristicServiceDep = Annotated[ProductCharacteristicService, Depends(product_characteristic_service)]
@router.get("/")
async def get_all_products(
        service: product_service_dep,
        pagination: PaginationParams,
        category: int | None = None,
        min_price: int | None = None,
        max_price: int | None = None,
        order_by: str | None = None,
        in_stock: bool | None = None,
) -> list[ProductDTO]:
    return await service.get_all(
        pagination.get("page"),
        pagination.get("size"),
        category,
        min_price,
        max_price,
        order_by,
        in_stock,
    )


@router.get("/{product_id}")
async def get_product(
        product_id: int,
        product_service: product_service_dep,
) -> ProductDTO:
    try:
        return await product_service.get_by_id(product_id)
    except ProductNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )


@router.post("/")
async def create_product(
        product_service: product_service_dep,
        data: ProductCreateSchema,
        admin: AdminUserDep,
) -> ProductDTO:
    try:
        return await product_service.create(data)
    except CategoryNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")


@router.patch("/{product_id}")
async def update_product(
        product_id: int,
        data: ProductUpdateSchema,
        product_service: product_service_dep,
        admin: AdminUserDep,
) -> ProductDTO:
    try:
        return await product_service.update(data, product_id)
    except ProductNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )


@router.delete("/{product_id}")
async def delete_product(
        product_id: int,
        admin: AdminUserDep,
        product_delete: ProductDeleteUseCase = Depends(product_delete_use_case),
) -> ProductDTO:
    try:
        return await product_delete.delete(product_id)
    except ProductNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    except DeleteFileError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Error with delete images",
        )

@router.post("/{product_id}/colors")
async def create_product_color(
        product_id: int,
        data: ProductColorBaseSchema,
        service: ProductColorService = Depends(product_color_service)
) -> ProductColorDTO:
    try:
        return await service.create(
            ProductColorCreateSchema(
                **data.model_dump(),
                product_id=product_id,
            ))
    except ProductNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

@router.post("/{product_id}/discount")
async def create_product_discount(
        product_id: int,
        data: DiscountCreateSchema,
        admin: AdminUserDep,
        use_case = Depends(create_product_discount_use_case),
) -> DiscountDTO:
    try:
        return await use_case.execute(data, product_id)
    except ProductNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

@router.delete("/{product_id}/discount/{discount_id}")
async def delete_product_discount(
        product_id: int,
        discount_id: int,
        service: product_service_dep,
        admin: AdminUserDep,
):
    try:
        await service.remove_discount(product_id, discount_id)
        return {"status": "ok"}
    except ProductNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )
    except DiscountNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Discount not found",
        )

@router.post("/{product_id}/characteristics/")
async def create_product_characteristic(
        product_id: int,
        service: ProductCharacteristicServiceDep,
        admin: AdminUserDep,
        file: UploadFile | None = None,
        name: str | None = Form(default=None),
        value: str | None = Form(default=None),
) -> ProductCharacteristicDTO:
    try:
        data = ProductCharacteristicCreate(
            name=name,
            value=value,
        )
        return await service.create(file, data, product_id)
    except ProductNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )
    except UploadingFileError:
        raise HTTPException(
            503,
            detail="Uploading file error"
        )
    except InvalidFileTypeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only image files are allowed",
        )

@router.patch("/{product_id}/characteristics/{characteristic_id}")
async def update_product_characteristic(
        product_id: int,
        characteristic_id: int,
        service: ProductCharacteristicServiceDep,
        admin: AdminUserDep,
        name: str | None = Form(default=None),
        value: str | None = Form(default=None),
        file: UploadFile | None = None,
) -> ProductCharacteristicDTO:
    try:
        data = ProductCharacteristicUpdate(name=name, value=value)
        return await service.update(file, data, product_id, characteristic_id)
    except CharacteristicNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Characteristic not found",
        )
    except UploadingFileError:
        raise HTTPException(
            503,
            detail="Uploading file error"
        )
    except DeleteFileError:
        raise HTTPException(
            503,
            detail="Delete file error"
        )
    except InvalidFileTypeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only image files are allowed",
        )

@router.delete("/{product_id}/characteristics/{characteristic_id}")
async def delete_product_characteristic(
        product_id: int,
        characteristic_id: int,
        service: ProductCharacteristicServiceDep,
        admin: AdminUserDep,
) -> ProductCharacteristicDTO:
    try:
        return await service.delete(characteristic_id,product_id)
    except CharacteristicNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Characteristic not found",
        )
    except DeleteFileError:
        raise HTTPException(
            503,
            detail="Delete file error"
        )