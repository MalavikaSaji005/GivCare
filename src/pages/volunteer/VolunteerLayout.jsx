import { NavLink, Outlet } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function VolunteerLayout() {

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "white" : "#333",
    background: isActive ? "#00563B" : "transparent",
    padding: "8px 10px",
    borderRadius: "6px",
    display: "block"
  });

  return (
    <DashboardLayout>

      <div style={{ display: "flex" }}>

        {/* INNER SIDEBAR (Volunteer specific) */}
        <div
          style={{
            width: "220px",
            background: "white",
            borderRight: "1px solid #e5e7eb",
            padding: "20px"
          }}
        >
          <h3
            style={{
              marginBottom: "25px",
              color: "#00563B",
              fontWeight: "bold"
            }}
          >
            Volunteer
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            <NavLink to="/volunteer/dashboard" style={linkStyle}>
              📊 Dashboard
            </NavLink>

            <NavLink to="/volunteer/register" style={linkStyle}>
              📝 Register
            </NavLink>

            <NavLink to="/volunteer/tasks" style={linkStyle}>
              📦 Available Tasks
            </NavLink>

            <NavLink to="/volunteer/mytasks" style={linkStyle}>
              📌 My Tasks
            </NavLink>

            <NavLink to="/volunteer/schedule" style={linkStyle}>
              📅 Schedule
            </NavLink>

          </div>
        </div>

        {/* PAGE CONTENT */}
        <div style={{ flex: 1, padding: "30px" }}>
          <Outlet />
        </div>

      </div>

    </DashboardLayout>
  );
}

export default VolunteerLayout;