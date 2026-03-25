import { NavLink, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db, auth } from "../firebase";

export default function DashboardLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [role, setRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const userRef = ref(db, `users/${user.uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setRole(data.role);
    });
     
  }, []);

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "white" : "#333",
    background: isActive ? "#00563B" : "transparent",
    padding: "8px 10px",
    borderRadius: "6px"
  });

  const institutionDashboardActive =
    location.pathname === "/institution" && !location.search;

  const confirmationsActive =
    location.pathname === "/institution" && location.search === "?view=confirmations";

  const customStyle = (isActive) => ({
    textDecoration: "none",
    color: isActive ? "white" : "#333",
    background: isActive ? "#00563B" : "transparent",
    padding: "8px 10px",
    borderRadius: "6px"
  });

  return (
    <div style={{ background: "#F0F7F4", minHeight: "100vh" }}>

      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div style={{ display: "flex" }}>

        {sidebarOpen && (
          <div
            style={{
              width: "230px",
              background: "white",
              borderRight: "1px solid #e5e7eb",
              padding: "25px"
            }}
          >
            <h3 style={{ marginBottom: "25px", color: "#00563B", fontWeight: "bold" }}>
              Dashboard
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

              {role === "institution" ? (
                <>
                  <NavLink to="/dashboard" style={linkStyle}>
                    🏠 Dashboard Home
                  </NavLink>

                  <NavLink to="/institution" style={customStyle(institutionDashboardActive)}>
                    🏢 Institution Dashboard
                  </NavLink>

                  <NavLink to="/institution?view=confirmations" style={customStyle(confirmationsActive)}>
                    🔔 Pending Confirmations
                  </NavLink>

                  <NavLink to="/volunteer/dashboard" style={linkStyle}>
                    🤝 Volunteers
                  </NavLink>

                  <NavLink to="/companion/dashboard" style={linkStyle}>
                    ❤️ Companions
                  </NavLink>

                  <NavLink to="/profile" style={linkStyle}>
                    👤 Profile
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/dashboard" style={linkStyle}>
                    🏠 Dashboard Home
                  </NavLink>

                  <NavLink to="/browse" style={linkStyle}>
                    📦 Browse Needs
                  </NavLink>

                  <NavLink to="/donation-history" style={linkStyle}>
                    📊 Donation History
                  </NavLink>

                  <NavLink to="/volunteer/dashboard" style={linkStyle}>
                    🤝 Volunteers
                  </NavLink>

                  <NavLink to="/companion/dashboard" style={linkStyle}>
                    ❤️ Companions
                  </NavLink>

                  <NavLink to="/profile" style={linkStyle}>
                    👤 Profile
                  </NavLink>
                </>
              )}

            </div>
          </div>
        )}

        <div style={{ flex: 1, padding: "35px" }}>
          {children}
        </div>

      </div>

    </div>
  );
}
