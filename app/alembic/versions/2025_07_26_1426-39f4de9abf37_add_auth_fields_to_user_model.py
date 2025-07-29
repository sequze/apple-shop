"""add auth fields to user model

Revision ID: 39f4de9abf37
Revises: c65e29889cf7
Create Date: 2025-07-26 14:26:11.591494

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "39f4de9abf37"
down_revision: Union[str, Sequence[str], None] = "c65e29889cf7"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        "users", sa.Column("is_active", sa.Boolean(), nullable=False)
    )
    op.add_column(
        "users", sa.Column("is_verified", sa.Boolean(), nullable=False)
    )
    op.add_column(
        "users", sa.Column("is_superuser", sa.Boolean(), nullable=False)
    )
    op.drop_column("users", "role")


def downgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "role",
            postgresql.ENUM("customer", "admin", name="userrole"),
            autoincrement=False,
            nullable=False,
        ),
    )
    op.drop_column("users", "is_superuser")
    op.drop_column("users", "is_verified")
    op.drop_column("users", "is_active")
