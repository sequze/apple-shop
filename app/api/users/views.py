from typing import Annotated

from fastapi import APIRouter, Path, HTTPException, status, Depends
from services.order.schemas import OrderDTO
from services.user.schemas import UserDTO, UserCreateSchema, UserUpdateSchema
from services.user.service import UserService, UserNotFoundError, EmailAlreadyExists
from api.dependencies import users_service, get_current_active_user

router = APIRouter()

user_service_dep = Annotated[UserService, Depends(users_service)]


@router.get("/")
async def get_users(
        user_service: user_service_dep,
) -> list[UserDTO]:
    res = await user_service.get_users()
    return res

@router.get("/orders")
async def get_user_orders(
        user_service: user_service_dep,
        current_user: UserDTO = Depends(get_current_active_user),
) -> list[OrderDTO]:
    return await user_service.get_orders(current_user)

@router.get("/{user_id}")
async def get_user_by_id(
        user_id: Annotated[int, Path(ge=1)],
        user_service: user_service_dep,
) -> UserDTO:
    try:
        res = await user_service.get_by_id(user_id)
    except UserNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return res


@router.post("/")
async def create_user(
        data: UserCreateSchema,
        user_service: user_service_dep,
):
    try:
        res = await user_service.create_user(data)
        return res
    except EmailAlreadyExists:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
        )


@router.patch("/{user_id}")
async def update_user(
        user_id: int,
        data: UserUpdateSchema,
        user_service: user_service_dep,
) -> UserDTO:
    try:
        user = await user_service.update_user(data, user_id)
        return user
    except UserNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )


@router.delete("/{user_id}")
async def delete_user(
        user_id: int,
        user_service: user_service_dep,
) -> UserDTO:
    try:
        user = await user_service.delete_user(user_id)
        return user
    except UserNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
