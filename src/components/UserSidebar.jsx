import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  HandHeart,
  PlusCircle,
  Activity,
  Building2,
  Bell
} from "lucide-react";

export default function UserSidebar({
  linkStyle,
  supportOpen,
  setSupportOpen,
  role
}) {

  const navigate = useNavigate();
  const location = useLocation();

  const isInstitutionRoute = location.pathname === "/institution";

  const isHomeActive =
    isInstitutionRoute && location.search === "";

  // ✅ FIXED HERE
  const isConfirmationsActive =
    location.pathname === "/institution/dashboard" &&
    location.search.includes("view=confirmations");

  // ✅ FIXED HERE
  const isInstitutionDashboardActive =
    location.pathname === "/institution/dashboard" &&
    !location.search.includes("view=confirmations");

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
      display: "flex",
      alignItems: "center",
      gap: "10px",
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

        {/* ================= INSTITUTION ================= */}
        {role === "institution" && (
          <>
            <div
              style={instLinkStyle(isHomeActive)}
              onClick={() => navigate("/institution")}
            >
              {linkInner(isHomeActive, <Home size={18} />, "Home")}
            </div>

            <div
              style={instLinkStyle(isInstitutionDashboardActive)}
              onClick={() => navigate("/institution/dashboard")}
            >
              {linkInner(isInstitutionDashboardActive, <Building2 size={18} />, "Institution Needs")}
            </div>

            <div
              style={instLinkStyle(isConfirmationsActive)}
              onClick={() => navigate("/institution/dashboard?view=confirmations")}
            >
              {linkInner(isConfirmationsActive, <Bell size={18} />, "Donation Requests")}
            </div>

            {/* SUPPORT HUB */}
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

        {/* ================= DONOR ================= */}
        {role !== "institution" && (
          <>
            <NavLink to="/dashboard" style={linkStyle}>
              {({ isActive }) => linkInner(isActive, <Home size={18} />, "Home")}
            </NavLink>

            <NavLink to="/browse" style={linkStyle}>
              {({ isActive }) => linkInner(isActive, <BarChart3 size={18} />, "Browse Needs")}
            </NavLink>

            <NavLink to="/donation-history" style={linkStyle}>
              {({ isActive }) => linkInner(isActive, <Activity size={18} />, "Donation History")}
            </NavLink>

            {/* SUPPORT HUB */}
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