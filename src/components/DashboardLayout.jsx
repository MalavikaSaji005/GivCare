
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";

export default function DashboardLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "white" : "#333",
    background: isActive ? "#00563B" : "transparent",
    padding: "8px 10px",
    borderRadius: "6px"
  });

  return (
    <div style={{ background: "#F0F7F4", minHeight: "100vh" }}>

      {/* Navbar with toggle */}
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div style={{ display: "flex" }}>

        {/* Sidebar */}
        {sidebarOpen && (
          <div
            style={{
              width: "230px",
              background: "white",
              borderRight: "1px solid #e5e7eb",
              padding: "25px"
            }}
          >

            <h3
              style={{
                marginBottom: "25px",
                color: "#00563B",
                fontWeight: "bold"
              }}
            >
              Dashboard
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
              }}
            >

              <NavLink to="/dashboard" style={linkStyle}>
                🏠 Dashboard Home
              </NavLink>

              <NavLink to="/browse" style={linkStyle}>
                📦 Browse Needs
              </NavLink>

              <NavLink to="/donation-history" style={linkStyle}>
                📊 Donation History
              </NavLink>

              <NavLink to="/profile" style={linkStyle}>
                👤 Profile
              </NavLink>

              {/* ✅ NEW MODULE LINKS */}
              <NavLink to="/volunteer/dashboard" style={linkStyle}>
                🤝 Volunteers
              </NavLink>

              <NavLink to="/companion/dashboard" style={linkStyle}>
                ❤️ Companions
              </NavLink>

            </div>

          </div>
        )}

        {/* Page Content */}
        <div
          style={{
            flex: 1,
            padding: "35px"
          }}
        >
          {children}
        </div>

      </div>

    </div>
  );
}