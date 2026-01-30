from fastapi import APIRouter, HTTPException, status

from app.models import (
    get_attendance_collection,
    get_employee_collection
)
from app.schemas import AttendanceCreate, AttendanceResponse

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/", status_code=status.HTTP_201_CREATED)
def mark_attendance(attendance: AttendanceCreate):
    employee_collection = get_employee_collection()
    attendance_collection = get_attendance_collection()

    employee = employee_collection.find_one(
        {"employeeId": attendance.employeeId}
    )

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    existing_attendance = attendance_collection.find_one({
        "employeeId": attendance.employeeId,
        "date": attendance.date
    })

    if existing_attendance:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Attendance already marked for this date"
        )

    attendance_doc = {
        "employeeId": attendance.employeeId,
        "date": attendance.date,
        "status": attendance.status
    }

    attendance_collection.insert_one(attendance_doc)

    return {"message": "Attendance marked successfully"}


@router.get("/{employeeId}", response_model=list[AttendanceResponse])
def get_attendance(employeeId: str):
    employee_collection = get_employee_collection()
    attendance_collection = get_attendance_collection()

    employee = employee_collection.find_one(
        {"employeeId": employeeId}
    )

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    records = list(
        attendance_collection.find(
            {"employeeId": employeeId},
            {"_id": 0}
        )
    )

    return records
