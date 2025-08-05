"""update order model



Revision ID: 766f757bb3cb
Revises: c944124861bb
Create Date: 2025-08-05 10:27:32.834216

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "766f757bb3cb"
down_revision: Union[str, Sequence[str], None] = "c944124861bb"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

payment_enum = sa.Enum("card", "cash", name="paymentmethod")

def upgrade() -> None:
    payment_enum.create(op.get_bind())
    """Upgrade schema."""
    op.add_column(
        "orders", sa.Column("first_name", sa.String(), nullable=False)
    )
    op.add_column(
        "orders", sa.Column("last_name", sa.String(), nullable=False)
    )
    op.add_column(
        "orders", sa.Column("phone_number", sa.String(), nullable=False)
    )
    op.add_column("orders", sa.Column("email", sa.String(), nullable=False))
    op.add_column("orders", sa.Column("city", sa.String(), nullable=False))
    op.add_column(
        "orders", sa.Column("address_line", sa.String(), nullable=False)
    )
    op.add_column("orders", sa.Column("region", sa.String(), nullable=False))
    op.add_column(
        "orders",
        sa.Column(
            "payment_method",
            payment_enum,
            nullable=False,
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""
    payment_enum.drop(op.get_bind())
    op.drop_column("orders", "payment_method")
    op.drop_column("orders", "region")
    op.drop_column("orders", "address_line")
    op.drop_column("orders", "city")
    op.drop_column("orders", "email")
    op.drop_column("orders", "phone_number")
    op.drop_column("orders", "last_name")
    op.drop_column("orders", "first_name")
