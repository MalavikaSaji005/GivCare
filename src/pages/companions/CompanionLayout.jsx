import { NavLink, Outlet } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function CompanionLayout() {

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

        {/* INNER SIDEBAR (Companion specific) */}
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
            Companion
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            <NavLink to="/companion/dashboard" style={linkStyle}>
              📊 Dashboard
            </NavLink>

            <NavLink to="/companion/new" style={linkStyle}>
              ➕ New Request
            </NavLink>

            <NavLink to="/companion/active" style={linkStyle}>
              📌 Active Requests
            </NavLink>

            <NavLink to="/companion/history" style={linkStyle}>
              📜 History
            </NavLink>

            <NavLink to="/companion/volunteers" style={linkStyle}>
              🤝 Volunteers
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

export default CompanionLayout;