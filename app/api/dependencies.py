from typing import Annotated

from fastapi import Depends, HTTPException, status, Request, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jwt import InvalidTokenError

from core.auth.utils import decode_jwt
from core.models import db_helper
from core.repositories.uow import UnitOfWork
from services.auth.service import AuthService
from services.auth.service import TOKEN_TYPE_FIELD, ACCESS_TOKEN_FIELD
from services.cart.service import UserGetCartUseCase
from services.cart_item.service import CartItemService
from services.category.service import CategoryService
from services.colors.service import ProductColorService, DeleteColorUseCase
from services.discount.service import (
    DiscountService,
    AddDiscountToProductUseCase,
    AddDiscountToCategoryUseCase,
    CreateProductDiscountUseCase,
    CreateCategoryDiscountUseCase,
    DeleteDiscountFromCategoryUseCase,
)
from services.order.service import OrderService, DeleteOrderUseCase, CreateOrderUseCase
from services.product.service import ProductService, ProductDeleteUseCase
from services.product_characteristics.service import ProductCharacteristicService
from services.product_image.service import ProductImageService
from services.user import UserDTO
from services.user.service import UserService, UserNotFoundError


def pagination_params(
    page: int = Query(ge=0, default=0),
    size: int | None = Query(ge=1, le=100, default=None),
):
    return {
        "page": page,
        "size": size,
    }


PaginationParams = Annotated[dict, Depends(pagination_params)]


def unit_of_work() -> UnitOfWork:
    return UnitOfWork(db_helper.session_factory)


def users_service() -> UserService:
    return UserService(unit_of_work())


def category_service() -> CategoryService:
    return CategoryService(unit_of_work())


def product_service() -> ProductService:
    return ProductService(unit_of_work())


def discount_service() -> DiscountService:
    return DiscountService(unit_of_work())


def order_service() -> OrderService:
    return OrderService(unit_of_work())


def cart_item_service() -> CartItemService:
    return CartItemService(unit_of_work())


def product_image_service() -> ProductImageService:
    return ProductImageService(unit_of_work())


def auth_service() -> AuthService:
    return AuthService(unit_of_work())


def delete_color_use_case() -> DeleteColorUseCase:
    return DeleteColorUseCase(unit_of_work())


def product_delete_use_case() -> ProductDeleteUseCase:
    return ProductDeleteUseCase(delete_color_use_case(), unit_of_work())


def user_get_cart_use_case() -> UserGetCartUseCase:
    return UserGetCartUseCase(unit_of_work())


def delete_order_use_case() -> DeleteOrderUseCase:
    return DeleteOrderUseCase(unit_of_work())


def create_order_use_case() -> CreateOrderUseCase:
    return CreateOrderUseCase(unit_of_work())


def product_color_service() -> ProductColorService:
    return ProductColorService(unit_of_work())


def add_discount_to_product_use_case() -> AddDiscountToProductUseCase:
    return AddDiscountToProductUseCase(unit_of_work())


def add_discount_to_category_use_case() -> AddDiscountToCategoryUseCase:
    return AddDiscountToCategoryUseCase(unit_of_work())


def create_product_discount_use_case() -> CreateProductDiscountUseCase:
    return CreateProductDiscountUseCase(unit_of_work())


def create_category_discount_use_case() -> CreateCategoryDiscountUseCase:
    return CreateCategoryDiscountUseCase(unit_of_work())


def delete_discount_from_category_use_case() -> DeleteDiscountFromCategoryUseCase:
    return DeleteDiscountFromCategoryUseCase(unit_of_work())


def product_characteristic_service() -> ProductCharacteristicService:
    return ProductCharacteristicService(unit_of_work())


# auth dependencies

http_bearer = HTTPBearer()


def get_current_token_payload(
    credentials: HTTPAuthorizationCredentials = Depends(http_bearer),
) -> dict:
    token = credentials.credentials
    try:
        payload = decode_jwt(token)
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )
    return payload


async def get_token_for_refresh(
    request: Request,
) -> str:
    token = request.cookies.get("refresh_token")
    if token:
        return token
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No token",
    )


async def get_current_user(
    payload: dict = Depends(get_current_token_payload),
    user_service=Depends(users_service),
) -> UserDTO:
    token_type = payload.get(TOKEN_TYPE_FIELD)
    if token_type != ACCESS_TOKEN_FIELD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type"
        )
    email = payload.get("sub")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
    try:
        user = await user_service.get_by_email(email)
        return user
    except UserNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )


async def get_current_active_user(
    user: UserDTO = Depends(get_current_user),
) -> UserDTO:
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User inactive",
        )
    return user


async def get_current_superuser(
    user: UserDTO = Depends(get_current_active_user),
) -> UserDTO:
    if not user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User not a superuser",
        )
    return user


# current user dependencies

AdminUserDep = Annotated[UserDTO, Depends(get_current_superuser)]
CurrentUserDep = Annotated[UserDTO, Depends(get_current_active_user)]
