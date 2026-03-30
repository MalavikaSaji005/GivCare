import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Package,
  BarChart3,
  HandHeart,
  PlusCircle,
  Activity,
  Building2,
  Bell,

  User
} from "lucide-react";

export default function UserSidebar({
  linkStyle,
  supportOpen,
  setSupportOpen,
  role,
  institutionDashboardActive,
  confirmationsActive
}) {

  const navigate = useNavigate();

  // Style for institution links that use manual active state
  const instLinkStyle = (isActive) => ({
    textDecoration: "none",
    background: isActive ? "#E6F4EF" : "transparent",
    padding: "10px 12px",
    borderRadius: "8px",
    display: "block",
    transition: "all 0.2s ease",
    cursor: "pointer"
  });

  const activeBar = {
    position: "absolute",
    left: "-20px",
    width: "4px",
    height: "100%",
    background: "#00563B",
    borderRadius: "4px"
  };

  const linkInner = (isActive, icon, label) => (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      color: isActive ? "#00563B" : "#374151",
      fontWeight: isActive ? "600" : "500",
      position: "relative"
    }}>
      {isActive && <div style={activeBar} />}
      {icon}
      {label}
    </div>
  );

  return (
    <div
      style={{
        width: "240px",
        background: "white",
        borderRight: "1px solid #e5e7eb",
        padding: "20px",
        minHeight: "calc(100vh - 80px)"
      }}
    >
      <h3
        style={{
          marginBottom: "20px",
          color: "#00563B",
          fontWeight: "bold",
          fontSize: "18px"
        }}
      >
        Dashboard
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

        {/* ══════════════════════════════════════ */}
        {/* ✅ INSTITUTION SIDEBAR                */}
        {/* ══════════════════════════════════════ */}
        {role === "institution" && (
          <>
            {/* Dashboard Home */}
            <NavLink to="/dashboard" style={linkStyle}>
              {({ isActive }) => linkInner(isActive, <Home size={18} />, "Dashboard Home")}
            </NavLink>

            {/* Institution Dashboard - manual active */}
            <div
              style={instLinkStyle(institutionDashboardActive)}
              onClick={() => navigate("/institution")}
            >
              {linkInner(institutionDashboardActive, <Building2 size={18} />, "Institution Dashboard")}
            </div>

            {/* Pending Confirmations - manual active */}
            <div
              style={instLinkStyle(confirmationsActive)}
              onClick={() => navigate("/institution?view=confirmations")}
            >
              {linkInner(confirmationsActive, <Bell size={18} />, "Pending Confirmations")}
            </div>
            {/* SUPPORT HUB (ADD THIS) */}
            <div>
              <div
                onClick={() => setSupportOpen(!supportOpen)}
                style={{
                  cursor: "pointer",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  color: "#374151",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <HandHeart size={18} />
                  Support Hub
                </span>
                <span>{supportOpen ? "▲" : "▼"}</span>
              </div>

              {supportOpen && (
                <div style={{
                  marginLeft: "15px",
                  marginTop: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}>

                  <NavLink to="/support" end style={linkStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <BarChart3 size={16} />
                      Dashboard
                    </div>
                  </NavLink>

                  <NavLink to="/support/request" style={linkStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <PlusCircle size={16} />
                      Request Help
                    </div>
                  </NavLink>

                  <NavLink to="/support/offer" style={linkStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <HandHeart size={16} />
                      Offer Help
                    </div>
                  </NavLink>

                  <NavLink to="/support/activity" style={linkStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Activity size={16} />
                      My Activity
                    </div>
                  </NavLink>

                </div>
              )}
            </div>

            {/* Profile */}
            <NavLink to="/profile" style={linkStyle}>
              {({ isActive }) => linkInner(isActive, <User size={18} />, "Profile")}
            </NavLink>
          </>
        )}

        {/* ══════════════════════════════════════ */}
        {/* DONOR SIDEBAR — completely unchanged  */}
        {/* ══════════════════════════════════════ */}
        {role !== "institution" && (
          <>
            {/* DASHBOARD */}
            <NavLink to="/dashboard" style={linkStyle}>
              {({ isActive }) => (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: isActive ? "#00563B" : "#374151", fontWeight: isActive ? "600" : "500", position: "relative" }}>
                  {isActive && <div style={activeBar} />}
                  <Home size={18} />
                  Home
                </div>
              )}
            </NavLink>

            {/* BROWSE */}
            <NavLink to="/browse" style={linkStyle}>
              {({ isActive }) => (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: isActive ? "#00563B" : "#374151", fontWeight: isActive ? "600" : "500", position: "relative" }}>
                  {isActive && <div style={activeBar} />}
                  <Package size={18} />
                  Browse Needs
                </div>
              )}
            </NavLink>

            {/* DONATION HISTORY */}
            <NavLink to="/donation-history" style={linkStyle}>
              {({ isActive }) => (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: isActive ? "#00563B" : "#374151", fontWeight: isActive ? "600" : "500", position: "relative" }}>
                  {isActive && <div style={activeBar} />}
                  <BarChart3 size={18} />
                  Donation History
                </div>
              )}
            </NavLink>

            {/* SUPPORT HUB */}
            <div>
              <div
                onClick={() => setSupportOpen(!supportOpen)}
                style={{ cursor: "pointer", padding: "10px 12px", borderRadius: "8px", fontWeight: "600", color: "#374151", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <HandHeart size={18} />
                  Support Hub
                </span>
                <span>{supportOpen ? "▲" : "▼"}</span>
              </div>

              {supportOpen && (
                <div style={{ marginLeft: "15px", marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <NavLink to="/support" end style={linkStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <BarChart3 size={16} />
                      Dashboard
                    </div>
                  </NavLink>

                  <NavLink to="/support/request" style={linkStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <PlusCircle size={16} />
                      Request Help
                    </div>
                  </NavLink>

                  <NavLink to="/support/offer" style={linkStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <HandHeart size={16} />
                      Offer Help
                    </div>
                  </NavLink>

                  <NavLink to="/support/activity" style={linkStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Activity size={16} />
                      My Activity
                    </div>
                  </NavLink>
                </div>
              )}
            </div>

          </>
        )}

      </div>
    </div>
  );
}
