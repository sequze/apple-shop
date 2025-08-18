from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base
from .mixins import IntIdPkMixin

if TYPE_CHECKING:
    from .product import Product


class ProductCharacteristic(IntIdPkMixin, Base):
    image_url: Mapped[str | None] = mapped_column(nullable=True)
    name: Mapped[str]
    value: Mapped[str]
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"))
    product: Mapped["Product"] = relationship(back_populates="characteristics")