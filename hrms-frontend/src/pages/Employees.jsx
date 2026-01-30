import { useState, useEffect } from "react";
import api from "../services/api.js";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
      setError("");
    } catch {
      setError("Failed to load employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/employees", form);
      setForm({ employeeId: "", fullName: "", email: "", department: "" });
      fetchEmployees();
    } catch (error) {
      alert(error.response?.data?.detail || "Error creating employee");
    }
  };

  const deleteEmployee = async (id) => {
    if (!confirm("Delete this employee?")) return;
    await api.delete(`/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Employee Management</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow mb-6"
      >
        <input
          className="p-2 border rounded"
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          required
        />
        <button className="col-span-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700 ">
          Add Employee
        </button>
      </form>

      {/* States */}
      <ErrorMessage message={error} />

      {loading && <Loading text="Loading employees..." />}

      {!loading && employees.length === 0 && !error && (
        <p className="text-gray-500">No employees found.</p>
      )}

      {/* List */}
      <div className="space-y-3">
        {employees.map((emp) => (
          <div
            key={emp.employeeId}
            className="flex justify-between items-center border rounded p-4 bg-white shadow-sm"
          >
            <div>
              <p className="font-semibold">
                {emp.fullName} ({emp.employeeId})
              </p>
              <p className="text-sm text-gray-600">
                {emp.email} · {emp.department}
              </p>
            </div>

            <button
              onClick={() => deleteEmployee(emp.employeeId)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
