from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies import product_service, product_delete_use_case
from plugins.s3_storage.client import DeleteFileError
from services.product.schemas import ProductDTO, ProductCreateSchema, ProductUpdateSchema
from services.product.service import ProductService, ProductNotFoundError, ProductDeleteUseCase

router = APIRouter()

product_service_dep = Annotated[ProductService, Depends(product_service)]


@router.get("/")
async def get_all_products(
        product_service: product_service_dep,
) -> list[ProductDTO]:
    return await product_service.get_all()


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
) -> ProductDTO:
    return await product_service.create(data)


@router.patch("/{product_id}")
async def update_product(
        product_id: int,
        data: ProductUpdateSchema,
        product_service: product_service_dep,
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
