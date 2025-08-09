from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies import product_service, product_delete_use_case, get_products_use_case, AdminUserDep, \
    product_color_service
from plugins.s3_storage.client import DeleteFileError, UploadingFileError, InvalidFileTypeError
from services.category.service import CategoryNotFoundError
from services.colors.schemas import ProductColorCreateSchema, ProductColorDTO, ProductColorBaseSchema
from services.colors.service import ProductColorService
from services.product.schemas import ProductDTO, ProductCreateSchema, ProductUpdateSchema
from services.product.service import ProductService, ProductDeleteUseCase
from services.product.exceptions import ProductNotFoundError

router = APIRouter()

product_service_dep = Annotated[ProductService, Depends(product_service)]


@router.get("/")
async def get_all_products(
        category: str | None = None,
        min_price: int | None = None,
        max_price: int | None = None,
        order_by: str | None = None,
        in_stock: bool | None = None,
        get_products=Depends(get_products_use_case),
) -> list[ProductDTO]:
    try:
        return await get_products.execute(
            category,
            min_price,
            max_price,
            order_by,
            in_stock,
        )
    except CategoryNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")


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
                name=data.name,
                stock=data.stock,
                product_id=product_id,
            ))
    except ProductNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )
