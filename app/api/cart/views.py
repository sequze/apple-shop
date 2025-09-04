from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies import cart_item_service, user_get_cart_use_case, CurrentUserDep, AdminUserDep
from services.cart.schemas import CartDTO, AddToCartSchema
from services.cart.service import UserGetCartUseCase
from services.cart_item.schemas import CartItemDTO, CartItemUpdateSchema, CartItemCreateSchema
from services.cart_item.service import CartItemService, CartItemNotFoundError, CartItemAlreadyExistsError
from services.colors.service import ProductColorNotFoundError
from services.product.exceptions import ProductNotFoundError

router = APIRouter()

cart_item_service_dep = Annotated[CartItemService, Depends(cart_item_service)]

user_cart_service = Annotated[UserGetCartUseCase, Depends(user_get_cart_use_case)]
@router.get("/user_cart")
async def get_user_cart(
        cart_service: user_cart_service,
        user: CurrentUserDep,
) -> CartDTO:
    return await cart_service.execute(user_data=user)

@router.post("/add_to_cart")
async def add_to_cart(
        cart_item_service: cart_item_service_dep,
        user: CurrentUserDep,
        data: AddToCartSchema,
) -> CartItemDTO:
    try:
        return await cart_item_service.create(
            CartItemCreateSchema(
                quantity=data.quantity,
                user_id=user.id,
                product_id=data.product_id,
                color_id=data.color_id,
            )
        )
    except CartItemAlreadyExistsError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Cart Item already exists",
        )
    except ProductNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )
    except ProductColorNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product color not found",
        )
@router.get("/")
async def get_all_cart_items(
        cart_item_service: cart_item_service_dep,
        admin: AdminUserDep,
) -> list[CartItemDTO]:
    return await cart_item_service.get_all()


@router.get("/{cart_item_id}")
async def get_cart_item(
        cart_item_id: int,
        cart_item_service: cart_item_service_dep,
        admin: AdminUserDep,
) -> CartItemDTO:
    try:
        return await cart_item_service.get_by_id(cart_item_id)
    except CartItemNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart Item not found",
        )


@router.post("/")
async def create_cart_item(
        cart_item_service: cart_item_service_dep,
        data: CartItemCreateSchema,
        admin: AdminUserDep,
) -> CartItemDTO:
    try:
        return await cart_item_service.create(data)
    except CartItemAlreadyExistsError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Cart Item already exists",
        )
    except ProductNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )


@router.patch("/{cart_item_id}")
async def update_cart_item(
        cart_item_id: int,
        data: CartItemUpdateSchema,
        cart_item_service: cart_item_service_dep,
        user: CurrentUserDep,
) -> CartItemDTO:
    try:
        return await cart_item_service.update(data, cart_item_id, user.id)
    except CartItemNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart Item not found"
        )


@router.delete("/{cart_item_id}")
async def delete_cart_item(
        cart_item_id: int,
        cart_item_service: cart_item_service_dep,
        user: CurrentUserDep,
) -> CartItemDTO:
    try:
        return await cart_item_service.delete(cart_item_id, user.id)
    except CartItemNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart Item not found"
        )