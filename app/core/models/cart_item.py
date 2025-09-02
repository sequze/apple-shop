from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy.sql.schema import UniqueConstraint

from .base import Base
from .mixins import IntIdPkMixin

if TYPE_CHECKING:
    from .user import User
    from .product import Product
    from .product_color import ProductColor


class CartItem(IntIdPkMixin, Base):
    quantity: Mapped[int]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"))
    color_id: Mapped[int] = mapped_column(ForeignKey("productcolors.id", ondelete="SET NULL"), nullable=True)
    user: Mapped["User"] = relationship(back_populates="cart_items")
    product: Mapped["Product"] = relationship(lazy="selectin", passive_deletes=True)
    color: Mapped["ProductColor"] = relationship(lazy="selectin", passive_deletes=True)
    __table_args__ = (
        UniqueConstraint("user_id", "product_id"),
    )
