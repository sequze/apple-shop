"""deleted useful created_at column in CartItem model

Revision ID: dfdd5f65d972
Revises: c23b28ebf473
Create Date: 2025-07-24 13:08:39.642691

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "dfdd5f65d972"
down_revision: Union[str, Sequence[str], None] = "c23b28ebf473"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_column("cartitems", "created_at")


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column(
        "cartitems",
        sa.Column(
            "created_at",
            postgresql.TIMESTAMP(),
            autoincrement=False,
            nullable=False,
        ),
    )
