import { NavLink, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db, auth } from "../firebase";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [role, setRole] = useState(null);
  const [supportOpen, setSupportOpen] = useState(false);

  const location = useLocation();

  // FETCH USER ROLE
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = ref(db, `users/${user.uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setRole(data.role);
    });
  }, []);

  // AUTO OPEN SUPPORT HUB
  useEffect(() => {
    if (location.pathname.startsWith("/support")) {
      setSupportOpen(true);
    }
  }, [location.pathname]);

  // NORMAL LINK STYLE
  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "white" : "#333",
    background: isActive ? "#00563B" : "transparent",
    padding: "10px 12px",
    borderRadius: "6px",
    display: "block",
    fontWeight: "500"
  });

  return (
    <div style={{ background: "#F0F7F4", minHeight: "100vh" }}>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div style={{ display: "flex" }}>
        
        {/* SIDEBAR */}
        {sidebarOpen && (
          <div
            style={{
              width: "240px",
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

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              
              {/* MAIN LINKS */}
              <NavLink to="/dashboard" style={linkStyle}>
                🏠 Dashboard Home
              </NavLink>

              <NavLink to="/browse" style={linkStyle}>
                📦 Browse Needs
              </NavLink>

              <NavLink to="/donation-history" style={linkStyle}>
                📊 Donation History
              </NavLink>

              {/* 🔥 SUPPORT HUB */}
              <div>
                <div
                  onClick={() => setSupportOpen(!supportOpen)}
                  style={{
                    cursor: "pointer",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    color: "#333",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <span>🤝 Support Hub</span>
                  <span>{supportOpen ? "▲" : "▼"}</span>
                </div>

                {/* DROPDOWN */}
                {supportOpen && (
                  <div
                    style={{
                      marginLeft: "12px",
                      marginTop: "8px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px"
                    }}
                  >
                    <NavLink to="/support" end style={linkStyle}>
                      📊 Dashboard
                    </NavLink>

                    <NavLink to="/support/request" style={linkStyle}>
                      ➕ Request Help
                    </NavLink>

                    <NavLink to="/support/offer" style={linkStyle}>
                      🤝 Offer Help
                    </NavLink>

                    <NavLink to="/support/activity" style={linkStyle}>
                      📌 My Activity
                    </NavLink>
                  </div>
                )}
              </div>

              {/* PROFILE */}
              <NavLink to="/profile" style={linkStyle}>
                👤 Profile
              </NavLink>
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, padding: "35px" }}>
          {children}
        </div>

      </div>
    </div>
  );
}