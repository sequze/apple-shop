"""delete useful columns from RefreshSession

Revision ID: 6bdddfaf7da7
Revises: 11f05f3fa105
Create Date: 2025-07-28 17:16:45.063764

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "6bdddfaf7da7"
down_revision: Union[str, Sequence[str], None] = "11f05f3fa105"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_column("refreshsessions", "expires_in")
    op.drop_column("refreshsessions", "created_at")


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column(
        "refreshsessions",
        sa.Column(
            "created_at",
            postgresql.TIMESTAMP(),
            autoincrement=False,
            nullable=False,
        ),
    )
    op.add_column(
        "refreshsessions",
        sa.Column(
            "expires_in", sa.INTEGER(), autoincrement=False, nullable=False
        ),
    )
