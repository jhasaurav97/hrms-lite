from fastapi import FastAPI
from app.database import get_db
from app.routes.employees import router as employee_router
from app.routes.attendance import router as attendance_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="HRMS Lite API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee_router)
app.include_router(attendance_router)

@app.get("/")
def root():
    return {"message": "HRMS Lite Backend is running"}
