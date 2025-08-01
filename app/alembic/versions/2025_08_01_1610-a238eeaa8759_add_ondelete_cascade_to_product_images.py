"""add ondelete CASCADE to product_images

Revision ID: a238eeaa8759
Revises: 6bdddfaf7da7
Create Date: 2025-08-01 16:10:15.744149

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "a238eeaa8759"
down_revision: Union[str, Sequence[str], None] = "6bdddfaf7da7"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_constraint(
        op.f("fk_productimages_product_id_products"),
        "productimages",
        type_="foreignkey",
    )
    op.create_foreign_key(
        op.f("fk_productimages_product_id_products"),
        "productimages",
        "products",
        ["product_id"],
        ["id"],
        ondelete="CASCADE",
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(
        op.f("fk_productimages_product_id_products"),
        "productimages",
        type_="foreignkey",
    )
    op.create_foreign_key(
        op.f("fk_productimages_product_id_products"),
        "productimages",
        "products",
        ["product_id"],
        ["id"],
    )