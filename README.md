# HRMS Lite

HRMS Lite is a lightweight, web-based Human Resource Management System built as part of a full-stack coding assignment.  
It simulates a basic internal HR tool that allows an admin to manage employee records and track daily attendance using a clean and professional interface.

The focus of this project is on **core functionality, stability, and production readiness**, rather than excessive features.

---

## 🚀 Live Application

- **Frontend URL:** https://hrms-lite-eight-psi.vercel.app/
- **Backend API URL:** https://hrms-backend-e9wt.onrender.com/

---

## 📌 Features

### Employee Management
- Add a new employee with:
  - Employee ID (unique)
  - Full Name
  - Email Address (validated)
  - Department
- View all employees
- Delete an employee
- Duplicate employee ID handling with proper error messages

### Attendance Management
- Mark daily attendance for an employee:
  - Date
  - Status (Present / Absent)
- Prevent duplicate attendance for the same employee on the same date
- View attendance records per employee

### UI & UX
- Clean, professional admin-style interface
- Reusable UI components
- Clear UI states:
  - Loading
  - Empty state
  - Error state
- Responsive layout

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Python
- FastAPI
- RESTful APIs
- Server-side validation

### Database
- MongoDB Atlas (NoSQL)

### Deployment
- **Frontend:** Vercel
- **Backend:** Render


---

## ▶️ Running the Project Locally

### Backend Setup

```bash
cd hrms-backend
python -m venv venv
source venv/Scripts/activate   # Windows (Git Bash)
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```
---

## Running the Project Locally

### Backend Setup

```bash
cd hrms-backend
python -m venv venv
source venv/Scripts/activate   # Windows (Git Bash)
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

---

### Backend runs at:

```
http://127.0.0.1:8000
Frontend Setup
cd hrms-frontend
npm install
npm run dev
```

## Frontend runs at:

```
http://localhost:5173
Create a .env file in hrms-frontend:
VITE_API_BASE_URL=http://127.0.0.1:8000
```

---

## Environment Variables

- Backend (Render)
- MONGO_URI
- DB_NAME

### Frontend (Vercel)

- VITE_API_BASE_URL
- Environment variables are managed securely and are not committed to version control.

## Validations & Error Handling

- Required field validation
- Email format validation
- Duplicate employee ID prevention
- Duplicate attendance prevention (employee + date)

### Proper HTTP status codes:

- 201 Created
- 404 Not Found
- 409 Conflict
- Meaningful error messages displayed in UI

## Assumptions & Limitations

- Single admin user (no authentication)
- Leave management, payroll, and advanced HR features are out of scope
- Designed as a lightweight internal tool
- CORS is configured openly for assessment purposes

---

## Final Note

- This project was built with a focus on realistic usability, clean architecture, and production readiness, following the assignment scope and time constraints.
- Thank you for reviewing this submission 
