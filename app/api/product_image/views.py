from typing import Annotated

from fastapi import APIRouter, Depends, UploadFile, Form, status, HTTPException

from pydantic import PositiveInt

from api.dependencies import product_image_service
from plugins.s3_storage.client import UploadingFileError, DeleteFileError, InvalidFileTypeError
from services.product_image.schemas import ProductImageDTO, ProductImageCreate, ProductImageUpdateSchema
from services.product_image.service import ProductImageService, ProductImageNotFoundError

router = APIRouter()

product_image_service_dep = Annotated[ProductImageService, Depends(product_image_service)]


@router.post("/")
async def create_image(
        file: UploadFile,
        service: product_image_service_dep,
        alt_text: str = Form(...),
        is_main: bool = Form(...),
        product_id: PositiveInt = Form(...),
) -> ProductImageDTO:
    data = ProductImageCreate(
        alt_text=alt_text,
        is_main=is_main,
        product_id=product_id
    )
    try:
        return await service.create(data, file)
    except UploadingFileError:
        raise HTTPException(
            503,
            detail="Uploading file error"
        )


@router.get("/")
async def get_images(
        service: product_image_service_dep,
) -> list[ProductImageDTO]:
    return await service.get_all()


@router.get("/{product_image_id}")
async def get_image(
        product_image_id: PositiveInt,
        service: product_image_service_dep,
) -> ProductImageDTO:
    try:
        return await service.get_by_id(product_image_id)
    except ProductImageNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product image not found",
        )


@router.patch("/{product_image_id}")
async def update_image(
        product_image_id: PositiveInt,
        data: ProductImageUpdateSchema,
        service: product_image_service_dep,
) -> ProductImageDTO:
    try:
        return await service.update(data, product_image_id)
    except ProductImageNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product image not found",
        )


@router.delete("/{product_image_id}")
async def delete_product_image(
        product_image_id: PositiveInt,
        service: product_image_service_dep,
) -> ProductImageDTO:
    try:
        return await service.delete(product_image_id)
    except ProductImageNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product image not found",
        )
    except DeleteFileError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Error while deleting image",
        )
