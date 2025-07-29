"""Refresh session model

Revision ID: 11f05f3fa105
Revises: 39f4de9abf37
Create Date: 2025-07-26 15:58:10.214985

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "11f05f3fa105"
down_revision: Union[str, Sequence[str], None] = "39f4de9abf37"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "refreshsessions",
        sa.Column("refresh_token", sa.String(), nullable=False),
        sa.Column("expires_in", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
            name=op.f("fk_refreshsessions_user_id_users"),
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_refreshsessions")),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table("refreshsessions")
