from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form, status


from api.dependencies import product_color_service, product_image_service, AdminUserDep, delete_color_use_case
from plugins.s3_storage.client import UploadingFileError, InvalidFileTypeError
from services.colors.schemas import ProductColorDTO, ProductColorCreateSchema, ProductColorUpdateSchema
from services.colors.service import ProductColorService, ProductColorNotFoundError, DeleteColorUseCase
from services.product.exceptions import ProductNotFoundError
from services.product_image.schemas import ProductImageDTO, ProductImageCreate
from services.product_image.service import ProductImageService

router = APIRouter()

color_service = Annotated[ProductColorService, Depends(product_color_service)]

@router.get("/{color_id}")
async def get_product_color(
        color_id: int,
        service: color_service,
) -> ProductColorDTO:
    try:
        return await service.get_by_id(color_id)
    except ProductColorNotFoundError:
        raise HTTPException(status_code=404, detail="Color not found")

@router.post("/")
async def create_product_color(
        data: ProductColorCreateSchema,
        service: color_service,
) -> ProductColorDTO:
    try:
        return await service.create(data)
    except ProductNotFoundError:
        raise HTTPException(status_code=404, detail="Product not found")

@router.patch("/{color_id}")
async def update_product_color(
        color_id: int,
        data: ProductColorUpdateSchema,
        service: color_service,
) -> ProductColorDTO:
    try:
        return await service.update(color_id, data)
    except ProductColorNotFoundError:
        raise HTTPException(status_code=404, detail="Color not found")


@router.delete("/{color_id}")
async def delete_product_color(
        color_id: int,
        delete_color: DeleteColorUseCase = Depends(delete_color_use_case),
) -> ProductColorDTO:
    try:
        return await delete_color.execute(color_id)
    except ProductColorNotFoundError:
        raise HTTPException(status_code=404, detail="Color not found")


@router.post("/{color_id}/images")
async def create_color_image(
        color_id: int,
        file: UploadFile,
        admin: AdminUserDep,
        alt_text: str = Form(...),
        is_main: bool = Form(...),
        service: ProductImageService = Depends(product_image_service),
) -> ProductImageDTO:
    try:
        return await service.create(
            ProductImageCreate(
                alt_text=alt_text,
                is_main=is_main,
                color_id=color_id,
            ),
            file=file
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
    except ProductColorNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product color not found",
        )
