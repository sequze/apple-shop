from typing import Annotated

from fastapi import APIRouter, Path, HTTPException, status, Depends
from pygments.lexers import data

from services.category.schemas import CategoryDTO, CategoryCreateSchema, CategoryUpdateSchema
from services.category.service import CategoryService, CategoryNotFoundError
from api.dependencies import category_service, AdminUserDep, create_category_discount_use_case, \
    delete_discount_from_category_use_case
from services.discount.schemas import DiscountCreateSchema
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
):
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
async def create_product_discount(
        category_id: int,
        data: DiscountCreateSchema,
        admin: AdminUserDep,
        use_case = Depends(create_category_discount_use_case),
):
    try:
        await use_case.execute(data, category_id)
        return {"status": "ok"}
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