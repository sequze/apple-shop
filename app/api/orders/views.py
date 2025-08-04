from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies import order_service, order_delete_use_case
from services.order.schemas import OrderDTO, OrderCreateSchema, OrderUpdateSchema
from services.order.service import OrderService, OrderNotFoundError, OrderDeleteUseCase

router = APIRouter()

order_service_dep = Annotated[OrderService, Depends(order_service)]


@router.get("/")
async def get_all_orders(
        order_service: order_service_dep,
) -> list[OrderDTO]:
    return await order_service.get_all()


@router.get("/{order_id}")
async def get_order(
        order_id: int,
        order_service: order_service_dep,
) -> OrderDTO:
    try:
        return await order_service.get_by_id(order_id)
    except OrderNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )


@router.post("/")
async def create_order(
        order_service: order_service_dep,
        data: OrderCreateSchema,
) -> OrderDTO:
    return await order_service.create(data)


@router.patch("/{order_id}")
async def update_order(
        order_id: int,
        data: OrderUpdateSchema,
        order_service: order_service_dep,
) -> OrderDTO:
    try:
        return await order_service.update(data, order_id)
    except OrderNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )


@router.delete("/{order_id}")
async def delete_order(
        order_id: int,
        order_delete: OrderDeleteUseCase = Depends(order_delete_use_case),
):
    try:
        await order_delete.execute(order_id)
        return {
            "success": True,
        }
    except OrderNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
