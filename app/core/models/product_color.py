from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base
from .mixins import IntIdPkMixin

if TYPE_CHECKING:
    from .product_image import ProductImage
    from .product import Product

class ProductColor(Base, IntIdPkMixin):
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"))
    name: Mapped[str]
    stock: Mapped[int]
    color_code: Mapped[str]

    product: Mapped["Product"] = relationship(back_populates="colors")
    images: Mapped[list["ProductImage"]] = relationship(
        back_populates="color",
        lazy="selectin",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )