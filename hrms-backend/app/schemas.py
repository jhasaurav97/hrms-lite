from pydantic import BaseModel, EmailStr
from datetime import datetime

class EmployeeCreate(BaseModel):
    employeeId: str
    fullName: str
    email: EmailStr
    department: str

class EmployeeResponse(BaseModel):
    employeeId: str
    fullName: str
    email: str
    department: str
    createdAt: datetime

class AttendanceCreate(BaseModel):
    employeeId: str
    date: str
    status: str

class AttendanceResponse(BaseModel):
    employeeId: str
    date: str
    status: str
    