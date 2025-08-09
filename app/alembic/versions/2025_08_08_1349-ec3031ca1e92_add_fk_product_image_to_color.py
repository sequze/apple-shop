"""add fk product_image to color

Revision ID: ec3031ca1e92
Revises: 2d888d070a37
Create Date: 2025-08-08 13:49:33.130510

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "ec3031ca1e92"
down_revision: Union[str, Sequence[str], None] = "2d888d070a37"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        "productimages", sa.Column("color_id", sa.Integer(), nullable=False)
    )
    op.create_foreign_key(
        op.f("fk_productimages_color_id_productcolors"),
        "productimages",
        "productcolors",
        ["color_id"],
        ["id"],
        ondelete="CASCADE",
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(
        op.f("fk_productimages_color_id_productcolors"),
        "productimages",
        type_="foreignkey",
    )
    op.drop_column("productimages", "color_id")
