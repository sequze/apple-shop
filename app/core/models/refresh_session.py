from sqlalchemy.sql.schema import ForeignKey

from .base import Base
from .mixins import IntIdPkMixin, CreatedAtMixin
from sqlalchemy.orm import Mapped, mapped_column


class RefreshSession(IntIdPkMixin, Base):
    refresh_token: Mapped[str] = mapped_column(unique=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
