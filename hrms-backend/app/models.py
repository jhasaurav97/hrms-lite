from app.database import get_db

def get_employee_collection():
    db = get_db()
    return db["employees"]

def get_attendance_collection():
    db = get_db()
    return db["attendance"]
