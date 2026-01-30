import { useState } from "react";
import api from "../services/api.js";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const Attendance = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAttendance = async () => {
    if (!employeeId) {
      setError("Please enter an Employee ID");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await api.get(`/attendance/${employeeId}`);
      setRecords(res.data);
    } catch {
      setError("Employee not found or no attendance records available.");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (status) => {
    if (!employeeId) {
      setError("Please enter an Employee ID");
      return;
    }

    setLoading(true);
    setError("");

    const today = new Date().toISOString().split("T")[0];

    try {
      await api.post("/attendance/", {
        employeeId,
        date: today,
        status,
      });

      // Refresh attendance list only if success
      await fetchAttendance();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Attendance Management</h2>

      {/* Error State */}
      <ErrorMessage message={error} />

      <div className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={fetchAttendance}
            className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700"
          >
            View Attendance
          </button>

          <button
            onClick={() => markAttendance("Present")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            Present
          </button>

          <button
            onClick={() => markAttendance("Absent")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Absent
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && <Loading text="Processing attendance..." />}

      {/* Empty State */}
      {!loading && records.length === 0 && !error && (
        <p className="text-gray-500 text-center">
          No attendance records to display.
        </p>
      )}

      <ul className="space-y-2">
        {records.map((r, i) => (
          <li
            key={i}
            className="border rounded p-3 bg-white shadow-sm flex justify-between"
          >
            <span>{r.date}</span>
            <span
              className={
                r.status === "Present"
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              {r.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attendance;
