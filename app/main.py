from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import router as api_router
from core.config import settings
from core.models.db_helper import db_helper

from prometheus_config import PrometheusMiddleware, metrics


@asynccontextmanager
async def lifespan(fastapi_app: FastAPI):
    yield
    await db_helper.dispose()


app = FastAPI(
    lifespan=lifespan,
)

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.add_middleware(PrometheusMiddleware, app_name="fastapi")
app.add_route("/metrics", metrics)

app.include_router(
    api_router,
    prefix=settings.api_prefix.prefix,
)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host="0.0.0.0", port=8000)
