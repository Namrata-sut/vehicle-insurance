from fastapi import FastAPI
from config.database_connection import engine, Base
from src.routers.users_router import router
from src.routers import vehical_router, insurance_docs_router, vehical_insurance_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(router)
app.include_router(vehical_router.router)
app.include_router(vehical_insurance_router.router)
app.include_router(insurance_docs_router.router)


