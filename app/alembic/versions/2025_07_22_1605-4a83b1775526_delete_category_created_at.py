"""delete category created_at

Revision ID: 4a83b1775526
Revises: 9888326c68ca
Create Date: 2025-07-22 16:05:25.585460

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "4a83b1775526"
down_revision: Union[str, Sequence[str], None] = "9888326c68ca"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_column("categories", "created_at")


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column(
        "categories",
        sa.Column(
            "created_at",
            postgresql.TIMESTAMP(),
            autoincrement=False,
            nullable=False,
        ),
    )
