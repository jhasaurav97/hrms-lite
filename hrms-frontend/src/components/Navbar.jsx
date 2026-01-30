import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">HRMS Lite</h1>

      <div className="space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-semibold underline" : "hover:text-slate-300"
          }
        >
          Employees
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            isActive ? "font-semibold underline" : "hover:text-slate-300"
          }
        >
          Attendance
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
