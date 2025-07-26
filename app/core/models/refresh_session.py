from sqlalchemy.sql.schema import ForeignKey

from .base import Base
from .mixins import IntIdPkMixin, CreatedAtMixin
from sqlalchemy.orm import Mapped, mapped_column


class RefreshSession(CreatedAtMixin, IntIdPkMixin, Base):
    refresh_token: Mapped[str]
    expires_in: Mapped[int]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
