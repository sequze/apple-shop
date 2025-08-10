from fastapi import APIRouter
from .users import router as users_router
from .categories import router as categories_router
from .products import router as products_router
from core.config import settings
from .discounts import router as discounts_router
from .orders import router as orders_router
from .cart import router as cart_items_router
from .product_image import router as product_image_router
from .auth import router as auth_router
from .colors import router as colors_router
router = APIRouter()

router.include_router(
    auth_router,
    tags=["Auth"],
    prefix=settings.api_prefix.auth,
)

router.include_router(
    users_router,
    tags=["Users"],
    prefix=settings.api_prefix.users,
)

router.include_router(
    categories_router,
    tags=["Categories"],
    prefix=settings.api_prefix.categories
)

router.include_router(
    products_router,
    tags=["Products"],
    prefix=settings.api_prefix.products
)

router.include_router(
    discounts_router,
    tags=["Discounts"],
    prefix=settings.api_prefix.discounts
)

router.include_router(
    orders_router,
    tags=["Orders"],
    prefix=settings.api_prefix.orders
)

router.include_router(
    cart_items_router,
    tags=["Cart"],
    prefix=settings.api_prefix.cart_items
)

router.include_router(
    product_image_router,
    tags=["Product Images"],
    prefix=settings.api_prefix.product_images
)

router.include_router(
    colors_router,
    tags=["Colors"],
    prefix=settings.api_prefix.colors
)