from pydantic import model_validator, BaseModel, PositiveFloat, PositiveInt
from datetime import datetime


class DiscountBaseSchema(BaseModel):
    percent: PositiveFloat
    start_date: datetime
    end_date: datetime
    description: str | None = None
    is_active: bool

    @model_validator(mode='after')
    def validate_dates(self) -> 'DiscountBaseSchema':
        if self.end_date <= self.start_date:
            raise ValueError('end_date must be after start_date')
        return self


class DiscountDTO(DiscountBaseSchema):
    id: PositiveInt
