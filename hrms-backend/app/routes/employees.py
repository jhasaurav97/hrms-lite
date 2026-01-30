from fastapi import APIRouter, HTTPException, status
from datetime import datetime

from app.models import get_employee_collection
from app.schemas import EmployeeCreate, EmployeeResponse

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_employee(employee: EmployeeCreate):
    employee_collection = get_employee_collection()

    existing_employee = employee_collection.find_one(
        {"employeeId": employee.employeeId}
    )

    if existing_employee:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Employee with this ID already exists"
        )

    new_employee = {
        "employeeId": employee.employeeId,
        "fullName": employee.fullName,
        "email": employee.email,
        "department": employee.department,
        "createdAt": datetime.utcnow()
    }

    employee_collection.insert_one(new_employee)

    return {"message": "Employee created successfully"}


@router.get("/", response_model=list[EmployeeResponse])
def get_employees():
    employee_collection = get_employee_collection()

    employees = list(employee_collection.find({}, {"_id": 0}))
    return employees


@router.delete("/{employeeId}")
def delete_employee(employeeId: str):
    employee_collection = get_employee_collection()

    result = employee_collection.delete_one(
        {"employeeId": employeeId}
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    return {"message": "Employee deleted successfully"}
