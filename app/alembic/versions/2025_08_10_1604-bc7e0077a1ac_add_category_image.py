"""add category image

Revision ID: bc7e0077a1ac
Revises: 42458f46e8b8
Create Date: 2025-08-10 16:04:11.249890

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "bc7e0077a1ac"
down_revision: Union[str, Sequence[str], None] = "42458f46e8b8"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        "categories", sa.Column("image_url", sa.String(), nullable=True)
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("categories", "image_url")
