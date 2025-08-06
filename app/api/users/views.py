from typing import Annotated

from fastapi import APIRouter, Path, HTTPException, status, Depends, UploadFile

from plugins.s3_storage.client import DeleteFileError, UploadingFileError, InvalidFileTypeError
from services.order.schemas import OrderDTO
from services.user.schemas import UserDTO, UserCreateSchema, UserUpdateSchema
from services.user.service import UserService, UserNotFoundError, EmailAlreadyExists
from api.dependencies import users_service, CurrentUserDep

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
        current_user: CurrentUserDep,
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



@router.post("/image")
async def update_profile_image(
        file: UploadFile,
        user_service: user_service_dep,
        current_user: CurrentUserDep,
) -> str:
    try:
        return await user_service.update_profile_image(current_user, file)
    except (UploadingFileError, DeleteFileError):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Error while uploading/deleting image",
        )
    except InvalidFileTypeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only image files are allowed",
        )

@router.delete("/image")
async def delete_profile_image(
        user_service: user_service_dep,
        current_user: CurrentUserDep,
):
    try:
        await user_service.delete_profile_image(current_user)
    except DeleteFileError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Error while deleting image",
        )


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
