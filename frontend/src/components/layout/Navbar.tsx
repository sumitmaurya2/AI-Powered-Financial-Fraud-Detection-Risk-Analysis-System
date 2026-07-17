import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-cyan-400">
          🛡️ FraudShield AI
        </Link>

        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/predict"
            className={({ isActive }) =>
              isActive ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"
            }
          >
            Predict
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"
            }
          >
            History
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;