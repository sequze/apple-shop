from core.models import db_helper
from services.auth.repository import AuthRepository
from services.auth.service import AuthService
from services.cart.service import UserGetCartUseCase
from services.cart_item.repository import CartItemRepository
from services.cart_item.service import CartItemService
from services.category.repository import CategoryRepository
from services.category.service import CategoryService
from services.discount.repository import DiscountRepository
from services.discount.service import DiscountService
from services.order.repository import OrderRepository
from services.order.service import OrderService
from services.order_item.repository import OrderItemRepository
from services.order_item.service import OrderItemService
from services.product.repository import ProductRepository
from services.product.service import ProductService, ProductDeleteUseCase
from services.product_image.repository import ProductImageRepository
from services.product_image.service import ProductImageService
from services.user import UserDTO
from services.user.service import UserService, UserNotFoundError
from core.repositories.uow import UnitOfWork
from services.user.repository import UserRepository
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends, HTTPException, status, Request
from core.auth.utils import decode_jwt
from jwt import InvalidTokenError
from services.auth.service import TOKEN_TYPE_FIELD, ACCESS_TOKEN_FIELD


def unit_of_work() -> UnitOfWork:
    return UnitOfWork(db_helper.session_factory)


def users_service() -> UserService:
    return UserService(UserRepository(), unit_of_work())


def category_service() -> CategoryService:
    return CategoryService(CategoryRepository(), unit_of_work())


def product_service() -> ProductService:
    return ProductService(ProductRepository(), unit_of_work())


def discount_service() -> DiscountService:
    return DiscountService(DiscountRepository(), unit_of_work())


def order_service() -> OrderService:
    return OrderService(OrderRepository(), unit_of_work())


def order_item_service() -> OrderItemService:
    return OrderItemService(OrderItemRepository(), unit_of_work())


def cart_item_service() -> CartItemService:
    return CartItemService(CartItemRepository(), unit_of_work())


def product_image_service() -> ProductImageService:
    return ProductImageService(ProductImageRepository(), unit_of_work())


def auth_service() -> AuthService:
    return AuthService(UserRepository(), AuthRepository(), unit_of_work())

def product_delete_use_case() -> ProductDeleteUseCase:
    return ProductDeleteUseCase(ProductRepository(), ProductImageRepository(), unit_of_work())

def user_get_cart_use_case() -> UserGetCartUseCase:
    return UserGetCartUseCase(UserRepository(), unit_of_work())
# auth dependencies


http_bearer = HTTPBearer()


def get_current_token_payload(
        credentials: HTTPAuthorizationCredentials = Depends(http_bearer)
) -> dict:
    token = credentials.credentials
    try:
        payload = decode_jwt(token)
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
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
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type"
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
