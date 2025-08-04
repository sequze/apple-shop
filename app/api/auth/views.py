from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status, Response
from api.dependencies import get_current_active_user, auth_service, users_service, get_token_for_refresh
from core.auth.token import Token
from core.config import settings
from services.auth.schemas import LoginSchema, RegisterSchema
from services.auth.service import AuthService, EmailNotExistsError, InvalidPasswordError, InvalidTokenError, \
    TokenExpiredError
from services.user import UserDTO, UserService, UserCreateSchema
from services.user.service import EmailAlreadyExists
from pydantic import BaseModel

router = APIRouter()

auth_service_dep = Annotated[AuthService, Depends(auth_service)]
user_service_dep = Annotated[UserService, Depends(users_service)]


@router.get("/me")
async def get_user(
        user: UserDTO = Depends(get_current_active_user),
) -> UserDTO:
    return user


@router.post("/login")
async def login(
        data: LoginSchema,
        service: auth_service_dep,
        response: Response,
) -> Token:
    try:
        tokens = await service.authenticate_user(data)
        response.set_cookie(
            'refresh_token',
            tokens.refresh_token,
            max_age=settings.auth_jwt.refresh_token_expire_days * 24 * 60,
            httponly=True,
        )
        return tokens
    except (EmailNotExistsError, InvalidPasswordError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )


@router.post("/register")
async def register(
        data: RegisterSchema,
        user_service: user_service_dep,
):
    try:
        await user_service.create_user(UserCreateSchema.model_validate(data.model_dump()))
        return {"status": "ok"}
    except EmailAlreadyExists:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email already exists"
        )


@router.post("/refresh")
async def refresh_jwt(
        response: Response,
        service: auth_service_dep,
        token=Depends(get_token_for_refresh),
) -> Token:
    try:
        tokens = await service.refresh_token(token)
        response.set_cookie(
            'refresh_token',
            tokens.refresh_token,
            max_age=settings.auth_jwt.refresh_token_expire_days * 24 * 60,
            httponly=True,
        )
        return tokens
    except (InvalidTokenError, TokenExpiredError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )


@router.post("/logout")
async def logout(
        service: auth_service_dep,
        response: Response,
        token=Depends(get_token_for_refresh),
) -> None:
    await service.logout(token)
    response.delete_cookie('refresh_token')


class ChangePasswordSchema(BaseModel):
    old_password: str
    new_password: str


@router.post("/change_password")
async def change_password(
        service: auth_service_dep,
        data: ChangePasswordSchema,
        user=Depends(get_current_active_user),

):
    try:
        await service.change_password(user.email, data.old_password, data.new_password)
        return {"message": "ok"}
    except InvalidPasswordError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Invalid Password"
        )


@router.post("/quit_all")
async def quit_all(
        service: auth_service_dep,
        user=Depends(get_current_active_user),
):
    await service.abort_all_sessions(user.id)
    return {"message": "ok"}
