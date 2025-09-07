FROM python:3.13

RUN pip install --upgrade pip wheel "poetry"

COPY pyproject.toml poetry.lock ./

RUN poetry config virtualenvs.create false

RUN poetry install --no-root

COPY . .

WORKDIR /app

CMD ["python", "main.py"]