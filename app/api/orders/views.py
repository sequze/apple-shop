from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import PositiveInt

from api.dependencies import (
    order_service,
    delete_order_use_case,
    create_order_use_case,
    CurrentUserDep,
    AdminUserDep,
    PaginationParams,
)
from api.exceptions import NotAllowed
from core.models.order import OrderStatus
from services.order.schemas import OrderDTO, OrderCreateSchema, OrderUpdateSchema
from services.order.service import (
    OrderService,
    OrderNotFoundError,
    DeleteOrderUseCase,
    CreateOrderUseCase,
    StatusNotAllowed,
    ActionNotAllowed,
)
from services.product.exceptions import ProductNotFoundError

router = APIRouter()

order_service_dep = Annotated[OrderService, Depends(order_service)]


@router.get("/")
async def get_all_orders(
    pagination: PaginationParams,
    order_service: order_service_dep,
    admin: AdminUserDep,
) -> list[OrderDTO]:
    return await order_service.get_all(
        pagination["page"],
        pagination["size"],
    )


@router.get("/{order_id}")
async def get_order(
    order_id: int,
    order_service: order_service_dep,
    user: CurrentUserDep,
) -> OrderDTO:
    try:
        return await order_service.get_by_id(order_id, user)
    except OrderNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )
    except ActionNotAllowed:
        raise NotAllowed


@router.post("/")
async def create_order(
    data: OrderCreateSchema,
    user: CurrentUserDep,
    order_create: CreateOrderUseCase = Depends(create_order_use_case),
) -> OrderDTO:
    try:
        return await order_create.execute(data, user.id)
    except ProductNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id {e} not found",
        )


@router.patch("/{order_id}")
async def update_order(
    order_id: int,
    data: OrderUpdateSchema,
    order_service: order_service_dep,
    user: CurrentUserDep,
) -> OrderDTO:
    try:
        return await order_service.update(data, order_id, user)
    except OrderNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Order not found"
        )


@router.put("/{order_id}/update_status", tags=["Admin"])
async def update_order_status(
    order_id: PositiveInt,
    order_status: OrderStatus,
    service: order_service_dep,
    admin_user: AdminUserDep,
) -> OrderDTO:
    try:
        return await service.update_status(order_status, order_id)
    except OrderNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Order not found"
        )
    except StatusNotAllowed:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Status not allowed"
        )
    except ActionNotAllowed:
        raise NotAllowed


@router.post("/cancel/{order_id}")
async def cancel_order(
    order_id: int,
    user: CurrentUserDep,
    service: order_service_dep,
) -> OrderDTO:
    try:
        return await service.cancel_order(order_id, user)
    except ActionNotAllowed:
        raise NotAllowed
    except OrderNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Order not found"
        )


@router.delete("/{order_id}")
async def delete_order(
    order_id: int,
    admin: AdminUserDep,
    order_delete: DeleteOrderUseCase = Depends(delete_order_use_case),
):
    try:
        await order_delete.execute(order_id)
        return {
            "success": True,
        }
    except OrderNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Order not found"
        )
