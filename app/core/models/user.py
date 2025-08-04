from typing import TYPE_CHECKING

from .base import Base
from .mixins import IntIdPkMixin

from .mixins.created_at import CreatedAtMixin

if TYPE_CHECKING:
    from .cart_item import CartItem
    from .order import Order
from sqlalchemy.orm import Mapped, mapped_column, relationship


class User(CreatedAtMixin, IntIdPkMixin, Base):
    email: Mapped[str] = mapped_column(unique=True)
    password_hash: Mapped[str]
    full_name: Mapped[str]
    is_active: Mapped[bool] = mapped_column(default=True)
    is_verified: Mapped[bool] = mapped_column(default=False)
    is_superuser: Mapped[bool] = mapped_column(default=False)
    cart_items: Mapped[list["CartItem"]] = relationship(back_populates="user")
    orders: Mapped[list["Order"]] = relationship(back_populates="user")
    profile_image_url: Mapped[str | None] = mapped_column(nullable=True)
    def __repr__(self):
        return f"User {self.full_name}, id: {self.id} email: {self.email}, created at: {self.created_at}"
