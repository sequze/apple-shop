"""add product characteristic

Revision ID: 636b5be99fb8
Revises: bc7e0077a1ac
Create Date: 2025-08-12 21:21:33.780749

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "636b5be99fb8"
down_revision: Union[str, Sequence[str], None] = "bc7e0077a1ac"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "productcharacteristics",
        sa.Column("image_url", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("value", sa.String(), nullable=False),
        sa.Column("product_id", sa.Integer(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["product_id"],
            ["products.id"],
            name=op.f("fk_productcharacteristics_product_id_products"),
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_productcharacteristics")),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table("productcharacteristics")
