from typing import Annotated

from fastapi import APIRouter, Path, HTTPException, status, Depends
from core.schemas.user import UserDTO, UserCreateSchema, UserUpdateSchema
from core.services.user_service import UserService, UserNotFoundError, EmailAlreadyExists
from api.dependencies import users_service

router = APIRouter()

user_service_dep = Annotated[UserService, Depends(users_service)]


@router.get("/")
async def get_users(
        user_service: user_service_dep,
) -> list[UserDTO]:
    res = await user_service.get_users()
    return res


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
