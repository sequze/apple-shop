from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import Numeric, ForeignKey, text
from sqlalchemy.orm import mapped_column, Mapped, relationship
from datetime import datetime, timezone

from core.models import Category
from .base import Base
from .mixins import IntIdPkMixin
from .mixins.created_at import CreatedAtMixin
from .product_discount_association_table import product_discount_association_table

if TYPE_CHECKING:
    from .category import Category
    from .product_color import ProductColor
    from .discount import Discount
    from .product_characteristic import ProductCharacteristic

class Product(CreatedAtMixin, IntIdPkMixin, Base):
    name: Mapped[str]
    description: Mapped[str] = mapped_column(nullable=True)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id", ondelete="SET NULL"), nullable=True)
    views: Mapped[int] = mapped_column(default=0, server_default=text("0"))
    colors: Mapped[list["ProductColor"]] = relationship(
        back_populates="product",
        lazy="selectin",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
    category: Mapped["Category"] = relationship(back_populates="products")
    discounts: Mapped[list["Discount"]] = relationship(
        secondary=product_discount_association_table,
        back_populates="products",
        lazy="selectin",
    )
    characteristics: Mapped[list["ProductCharacteristic"]]   = relationship(
        back_populates="product",
        lazy="selectin",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )