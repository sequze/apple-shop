from fastapi import APIRouter
from .users import router as users_router
from .categories import router as categories_router
from .products import router as products_router
from core.config import settings

router = APIRouter()

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
