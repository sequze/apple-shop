from typing import Annotated

from fastapi import APIRouter, Path, HTTPException, status, Depends

from services.category.schemas import CategoryDTO, CategoryCreateSchema, CategoryUpdateSchema
from services.category.service import CategoryService, CategoryNotFoundError
from api.dependencies import category_service

router = APIRouter()

category_service_dep = Annotated[CategoryService, Depends(category_service)]


@router.get("/")
async def get_categories(
        category_service: category_service_dep,
) -> list[CategoryDTO]:
    res = await category_service.get_all()
    return res


@router.get("/{category_id}/children")
async def get_children(
        category_id: Annotated[int, Path(ge=1)],
        category_service: category_service_dep,
) -> list[CategoryDTO]:
    try:
        res = await category_service.get_children(category_id)
    except CategoryNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
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


@router.post("/")
async def create_category(
        data: CategoryCreateSchema,
        category_service: category_service_dep,
):
    res = await category_service.create(data)
    return res


@router.patch("/{category_id}")
async def update_category(
        category_id: int,
        data: CategoryUpdateSchema,
        category_service: category_service_dep,
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
) -> CategoryDTO:
    try:
        category = await category_service.delete(category_id)
        return category
    except CategoryNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
