from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.sql.schema import UniqueConstraint

from .base import Base
from sqlalchemy.orm import mapped_column, Mapped, relationship
from datetime import datetime, timezone
from .mixins import IntIdPkMixin
from .mixins.created_at import CreatedAtMixin

if TYPE_CHECKING:
    from core.models.product import Product


class Category(IntIdPkMixin, Base):
    __tablename__ = "categories"
    name: Mapped[str] = mapped_column()

    products: Mapped[list["Product"]] = relationship(back_populates="category")

