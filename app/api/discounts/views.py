from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from api.dependencies import discount_service, AdminUserDep, add_discount_to_product_use_case, \
    add_discount_to_category_use_case
from services.category.service import CategoryNotFoundError
from services.discount.schemas import DiscountDTO, DiscountCreateSchema, DiscountUpdateSchema
from services.discount.service import DiscountService, DiscountNotFoundError, InvalidTimeIntervalError
from services.product.exceptions import ProductNotFoundError

router = APIRouter()

discount_service_dep = Annotated[DiscountService, Depends(discount_service)]


@router.get("/")
async def get_all_discounts(
        discount_service: discount_service_dep,
) -> list[DiscountDTO]:
    return await discount_service.get_all()


@router.get("/{discount_id}")
async def get_discount(
        discount_id: int,
        discount_service: discount_service_dep,
) -> DiscountDTO:
    try:
        return await discount_service.get_by_id(discount_id)
    except DiscountNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="discount not found",
        )


@router.post("/{discount_id}/product/{product_id}")
async def add_product_to_discount(
        discount_id: int,
        product_id: int,
        admin: AdminUserDep,
        use_case = Depends(add_discount_to_product_use_case)
):
    try:
        await use_case.execute(product_id, discount_id)
    except DiscountNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Discount not found",
        )
    except ProductNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

@router.post("/{discount_id}/category/{category_id}")
async def add_category_to_discount(
        discount_id: int,
        category_id: int,
        admin: AdminUserDep,
        use_case = Depends(add_discount_to_category_use_case),
):
    try:
        await use_case.execute(category_id, discount_id)
    except DiscountNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Discount not found",
        )
    except CategoryNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

@router.post("/")
async def create_discount(
        discount_service: discount_service_dep,
        data: DiscountCreateSchema,
        admin: AdminUserDep,
) -> DiscountDTO:
    return await discount_service.create(data)


@router.patch("/{discount_id}")
async def update_discount(
        discount_id: int,
        data: DiscountUpdateSchema,
        discount_service: discount_service_dep,
        admin: AdminUserDep,
) -> DiscountDTO:
    try:
        return await discount_service.update(discount_id, data)
    except DiscountNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="discount not found"
        )
    except InvalidTimeIntervalError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="invalid time interval"
        )


@router.delete("/{discount_id}")
async def delete_discount(
        discount_id: int,
        discount_service: discount_service_dep,
        admin: AdminUserDep,
) -> DiscountDTO:
    try:
        return await discount_service.delete(discount_id)
    except DiscountNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="discount not found"
        )


@router.post("/{discount_id}/deactivate")
async def deactivate_discount(
        discount_id: int,
        discount_service: discount_service_dep,
        admin: AdminUserDep,
) -> None:
    try:
        await discount_service.deactivate(discount_id)
    except DiscountNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="discount not found"
        )
