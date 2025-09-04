from pathlib import Path
from typing import Literal

from pydantic_settings import BaseSettings
from pydantic import BaseModel, Extra
from pydantic import PostgresDsn
from pydantic_settings import SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_PATH = BASE_DIR / ".env"


class RunConfig(BaseModel):
    host: str = "0.0.0.0"
    port: int = 8000


class ApiPrefix(BaseModel):
    prefix: str = "/api"
    users: str = "/users"
    categories: str = "/categories"
    products: str = "/products"
    discounts: str = "/discounts"
    orders: str = "/orders"
    order_items: str = "/order_items"
    cart_items: str = "/cart_items"
    product_images: str = "/product_images"
    auth: str = "/auth"
    colors: str = "/colors"


class ObjectStorageConfig(BaseModel):
    access_key: str
    secret_key: str
    endpoint_url: str
    bucket_name: str
    domain: str


class AuthJWTConfig(BaseModel):
    private_key_path: Path = BASE_DIR / "app" / "certs" / "jwt-private.pem"
    public_key_path: Path = BASE_DIR / "app" / "certs" / "jwt-public.pem"
    algorithm: str = "RS256"
    refresh_token_expire_days: int = 30
    access_token_expire_minutes: int = 15


class DatabaseConfig(BaseModel):
    url: PostgresDsn
    echo: bool = False
    pool_size: int = 50
    max_overflow: int = 10
    naming_convention: dict[str, str] = {
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s"
    }


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=ENV_PATH,
        extra="ignore",
        case_sensitive=False,
        env_nested_delimiter="__",  # разделитель
        env_prefix="FASTAPI__",
    )
    mode: Literal["DEV", "TEST", "PROD"]
    run: RunConfig = RunConfig()
    api_prefix: ApiPrefix = ApiPrefix()
    auth_jwt: AuthJWTConfig = AuthJWTConfig()
    db: DatabaseConfig
    test_db: DatabaseConfig
    s3: ObjectStorageConfig


settings = Settings()
