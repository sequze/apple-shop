from typing import Annotated

from core.models import db_helper
from services.auth.repository import AuthRepository
from services.auth.service import AuthService
from services.cart.service import UserGetCartUseCase
from services.cart_item.repository import CartItemRepository
from services.cart_item.service import CartItemService
from services.category.repository import CategoryRepository
from services.category.service import CategoryService
from services.colors.repository import ProductColorRepository
from services.colors.service import ProductColorService, DeleteColorUseCase
from services.discount.repository import DiscountRepository
from services.discount.service import DiscountService, AddDiscountToProductUseCase, AddDiscountToCategoryUseCase, \
    CreateProductDiscountUseCase, CreateCategoryDiscountUseCase, DeleteDiscountFromCategoryUseCase
from services.order.repository import OrderRepository
from services.order.service import OrderService, DeleteOrderUseCase, CreateOrderUseCase
from services.order_item.repository import OrderItemRepository
from services.product.repository import ProductRepository
from services.product.service import ProductService, ProductDeleteUseCase, GetProductsUseCase
from services.product_characteristics.repository import ProductCharacteristicRepository
from services.product_characteristics.service import ProductCharacteristicService
from services.product_image.repository import ProductImageRepository
from services.product_image.service import ProductImageService
from services.user import UserDTO
from services.user.service import UserService, UserNotFoundError
from core.repositories.uow import UnitOfWork
from services.user.repository import UserRepository
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends, HTTPException, status, Request, Query
from core.auth.utils import decode_jwt
from jwt import InvalidTokenError
from services.auth.service import TOKEN_TYPE_FIELD, ACCESS_TOKEN_FIELD

def pagination_params(
    page: int = Query(ge=0, default=0),
    size: int | None = Query(ge=1, le=100, default=None)
):
    return {
        "page": page,
        "size": size,
    }

PaginationParams = Annotated[dict, Depends(pagination_params)]

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


def cart_item_service() -> CartItemService:
    return CartItemService(CartItemRepository(), unit_of_work())


def product_image_service() -> ProductImageService:
    return ProductImageService(ProductImageRepository(), unit_of_work())


def auth_service() -> AuthService:
    return AuthService(UserRepository(), AuthRepository(), unit_of_work())

def delete_color_use_case() -> DeleteColorUseCase:
    return DeleteColorUseCase(ProductColorRepository(), ProductImageRepository(), unit_of_work())

def product_delete_use_case() -> ProductDeleteUseCase:
    return ProductDeleteUseCase(ProductRepository(), delete_color_use_case(), unit_of_work())

def user_get_cart_use_case() -> UserGetCartUseCase:
    return UserGetCartUseCase(UserRepository(), unit_of_work())

def delete_order_use_case() -> DeleteOrderUseCase:
    return DeleteOrderUseCase(OrderRepository(), OrderItemRepository(), unit_of_work())

def create_order_use_case() -> CreateOrderUseCase:
    return CreateOrderUseCase(OrderRepository(), OrderItemRepository(), unit_of_work())

def get_products_use_case() -> GetProductsUseCase:
    return GetProductsUseCase(ProductRepository(), CategoryRepository(), unit_of_work())

def product_color_service() -> ProductColorService:
    return ProductColorService(ProductColorRepository(), unit_of_work())

def add_discount_to_product_use_case() -> AddDiscountToProductUseCase:
    return AddDiscountToProductUseCase(ProductRepository(), DiscountRepository(), unit_of_work())

def add_discount_to_category_use_case() -> AddDiscountToCategoryUseCase:
    return AddDiscountToCategoryUseCase(CategoryRepository(), DiscountRepository(), unit_of_work())

def create_product_discount_use_case() -> CreateProductDiscountUseCase:
    return CreateProductDiscountUseCase(ProductRepository(), DiscountRepository(), unit_of_work())

def create_category_discount_use_case() -> CreateCategoryDiscountUseCase:
    return CreateCategoryDiscountUseCase(CategoryRepository(), DiscountRepository(), unit_of_work())

def delete_discount_from_category_use_case() -> DeleteDiscountFromCategoryUseCase:
    return DeleteDiscountFromCategoryUseCase(unit_of_work(), CategoryRepository())

def product_characteristic_service() -> ProductCharacteristicService:
    return ProductCharacteristicService(ProductCharacteristicRepository(), unit_of_work())


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

# current user dependencies

AdminUserDep = Annotated[UserDTO, Depends(get_current_superuser)]
CurrentUserDep = Annotated[UserDTO, Depends(get_current_active_user)]