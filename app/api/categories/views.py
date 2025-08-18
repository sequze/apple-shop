from typing import Annotated

from fastapi import APIRouter, Path, HTTPException, status, Depends, UploadFile
from pydantic import PositiveInt
from pygments.lexers import data

from plugins.s3_storage.client import UploadingFileError, DeleteFileError, InvalidFileTypeError
from services.category.schemas import CategoryDTO, CategoryCreateSchema, CategoryUpdateSchema
from services.category.service import CategoryService, CategoryNotFoundError
from api.dependencies import category_service, AdminUserDep, create_category_discount_use_case, \
    delete_discount_from_category_use_case
from services.discount.schemas import DiscountCreateSchema, DiscountDTO
from services.product.schemas import ProductDTO

router = APIRouter()

category_service_dep = Annotated[CategoryService, Depends(category_service)]


@router.get("/")
async def get_categories(
        category_service: category_service_dep,
) -> list[CategoryDTO]:
    res = await category_service.get_all()
    return res


@router.get("/{category_id}")
async def get_category_by_id(
        category_id: Annotated[int, Path(ge=1)],
        category_service: category_service_dep,
) -> CategoryDTO:
    try:
        res = await category_service.get_by_id(category_id)
    except CategoryNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    return res

@router.get("/{category_id}/products")
async def get_category_products(
        category_id: Annotated[int, Path(ge=1)],
        category_service: category_service_dep,
) -> list[ProductDTO]:
    try:
        return await category_service.get_products(category_id)
    except CategoryNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
@router.post("/")
async def create_category(
        data: CategoryCreateSchema,
        category_service: category_service_dep,
        admin: AdminUserDep,
) -> CategoryDTO:
    res = await category_service.create(data)
    return res


@router.patch("/{category_id}")
async def update_category(
        category_id: int,
        data: CategoryUpdateSchema,
        category_service: category_service_dep,
        admin: AdminUserDep,
) -> CategoryDTO:
    try:
        category = await category_service.update(data, category_id)
        return category
    except CategoryNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )


@router.delete("/{category_id}")
async def delete_category(
        category_id: int,
        category_service: category_service_dep,
        admin: AdminUserDep,
) -> CategoryDTO:
    try:
        category = await category_service.delete(category_id)
        return category
    except CategoryNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

@router.post("/{category_id}/discount")
async def create_category_discount(
        category_id: int,
        data: DiscountCreateSchema,
        admin: AdminUserDep,
        use_case = Depends(create_category_discount_use_case),
) -> DiscountDTO:
    try:
        return await use_case.execute(data, category_id)
    except CategoryNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

@router.delete("/{category_id}/discount/{discount_id}")
async def delete_category_discount(
        category_id: int,
        discount_id: int,
        use_case = Depends(delete_discount_from_category_use_case),
):
    try:
        await use_case.execute(category_id, discount_id)
        return {"status": "ok"}
    except CategoryNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

@router.post("/{category_id}/image")
async def update_category_image(
        category_id: PositiveInt,
        file: UploadFile,
        service: category_service_dep,
        admin_dep: AdminUserDep,
) -> str:
    try:
        return await service.update_image(category_id, file)
    except (UploadingFileError, DeleteFileError):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Error while uploading/deleting image",
        )
    except InvalidFileTypeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only image files are allowed",
        )

@router.delete("/{category_id}/image")
async def delete_category_image(
        category_id: PositiveInt,
        service: category_service_dep,
        admin_dep: AdminUserDep,
):
    try:
        await service.delete_image(category_id)
    except DeleteFileError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Error while deleting image",
        )
