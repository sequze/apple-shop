from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies import order_item_service
from services.order_item.schemas import OrderItemDTO, OrderItemCreateSchema, OrderItemUpdateSchema
from services.order_item.service import OrderItemService, OrderItemNotFoundError, OrderItemAlreadyExistsError

router = APIRouter()

order_item_service_dep = Annotated[OrderItemService, Depends(order_item_service)]


@router.get("/")
async def get_all_order_items(
        order_item_service: order_item_service_dep,
) -> list[OrderItemDTO]:
    return await order_item_service.get_all()


@router.get("/{order_item_id}")
async def get_order_item(
        order_item_id: int,
        order_item_service: order_item_service_dep,
) -> OrderItemDTO:
    try:
        return await order_item_service.get_by_id(order_item_id)
    except OrderItemNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order Item not found",
        )


@router.post("/")
async def create_order_item(
        order_item_service: order_item_service_dep,
        data: OrderItemCreateSchema,
) -> OrderItemDTO:
    try:
        return await order_item_service.create(data)
    except OrderItemAlreadyExistsError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Order Item already exists",
        )


@router.patch("/{order_item_id}")
async def update_order_item(
        order_item_id: int,
        data: OrderItemUpdateSchema,
        order_item_service: order_item_service_dep,
) -> OrderItemDTO:
    try:
        return await order_item_service.update(data, order_item_id)
    except OrderItemNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order Item not found"
        )


@router.delete("/{order_item_id}")
async def delete_order_item(
        order_item_id: int,
        order_item_service: order_item_service_dep,
) -> OrderItemDTO:
    try:
        return await order_item_service.delete(order_item_id)
    except OrderItemNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order Item not found"
        )
