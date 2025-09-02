from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy import insert, select, delete, inspect


class SQlAlchemyRepository:
    model = None

    @classmethod
    async def create(cls, session: AsyncSession, data: dict):
        mapper = inspect(cls.model)
        data_to_create = {}
        for key, value in data.items():
            if key in mapper.columns:
                data_to_create[key] = value
        stmt = insert(cls.model).values(**data_to_create).returning(cls.model)
        result = await session.execute(stmt)
        return result.scalar()

    @classmethod
    async def get_all(cls, session: AsyncSession):
        res = await session.scalars(select(cls.model))
        return [user for user in res]

    @classmethod
    async def get_by_filters(cls, session: AsyncSession, filters: dict, one: bool = True):
        stmt = select(cls.model).filter_by(**filters)
        res = await session.execute(stmt)
        if one:
            return res.scalar_one_or_none()
        return res.scalars().all()

    @classmethod
    async def delete_by_id(cls, session: AsyncSession, entity_id: int):
        res = await session.execute(
            delete(cls.model)
            .where(cls.model.id == entity_id).returning(cls.model))
        return res.scalar()

    @classmethod
    async def delete(cls, session: AsyncSession, entity):
        await session.delete(entity)

    @classmethod
    async def update(
            cls,
            session: AsyncSession,
            data: dict,
            object_to_update):
        mapper = inspect(cls.model)
        for key, value in data.items():
            if key in mapper.attrs:
                setattr(object_to_update, key, value)

    @classmethod
    async def get_by_id(cls, session: AsyncSession, id: int):
        return await session.get(cls.model, id)