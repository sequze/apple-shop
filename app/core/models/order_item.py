from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import Numeric, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy.sql.schema import UniqueConstraint

from .base import Base
from .mixins import IntIdPkMixin

if TYPE_CHECKING:
    from .order import Order
    from .product import Product


class OrderItem(IntIdPkMixin, Base):
    quantity: Mapped[int]
    unit_price: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id", ondelete="CASCADE"))
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=True)

    order: Mapped["Order"] = relationship(back_populates="items")
    product: Mapped["Product"] = relationship(lazy="selectin")
    __table_args__ = (
        UniqueConstraint("order_id", "product_id"),
    )
