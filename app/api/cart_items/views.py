from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies import cart_item_service
from services.cart_item.schemas import CartItemDTO, CartItemUpdateSchema, CartItemCreateSchema
from services.cart_item.service import CartItemService, CartItemNotFoundError, CartItemAlreadyExistsError

router = APIRouter()

cart_item_service_dep = Annotated[CartItemService, Depends(cart_item_service)]


@router.get("/")
async def get_all_cart_items(
        cart_item_service: cart_item_service_dep,
) -> list[CartItemDTO]:
    return await cart_item_service.get_all()


@router.get("/{cart_item_id}")
async def get_cart_item(
        cart_item_id: int,
        cart_item_service: cart_item_service_dep,
) -> CartItemDTO:
    try:
        return await cart_item_service.get_by_id(cart_item_id)
    except CartItemNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="cart_item not found",
        )


@router.post("/")
async def create_cart_item(
        cart_item_service: cart_item_service_dep,
        data: CartItemCreateSchema,
) -> CartItemDTO:
    try:
        return await cart_item_service.create(data)
    except CartItemAlreadyExistsError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Cart Item already exists",
        )


@router.patch("/{cart_item_id}")
async def update_cart_item(
        cart_item_id: int,
        data: CartItemUpdateSchema,
        cart_item_service: cart_item_service_dep,
) -> CartItemDTO:
    try:
        return await cart_item_service.update(data, cart_item_id)
    except CartItemNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="cart_item not found"
        )


@router.delete("/{cart_item_id}")
async def delete_cart_item(
        cart_item_id: int,
        cart_item_service: cart_item_service_dep,
) -> CartItemDTO:
    try:
        return await cart_item_service.delete(cart_item_id)
    except CartItemNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart Item not found"
        )
