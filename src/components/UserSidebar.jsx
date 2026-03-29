import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  BarChart3,
  HandHeart,
  PlusCircle,
  Activity
} from "lucide-react";

export default function UserSidebar({ linkStyle, supportOpen, setSupportOpen }) {
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
        
        {/* DASHBOARD */}
        <NavLink to="/dashboard" style={linkStyle}>
          {({ isActive }) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: isActive ? "#00563B" : "#374151",
                fontWeight: isActive ? "600" : "500",
                position: "relative"
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: "-20px",
                    width: "4px",
                    height: "100%",
                    background: "#00563B",
                    borderRadius: "4px"
                  }}
                />
              )}
              <Home size={18} />
              Home
            </div>
          )}
        </NavLink>

        {/* BROWSE */}
        <NavLink to="/browse" style={linkStyle}>
          {({ isActive }) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: isActive ? "#00563B" : "#374151",
                fontWeight: isActive ? "600" : "500",
                position: "relative"
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: "-20px",
                    width: "4px",
                    height: "100%",
                    background: "#00563B",
                    borderRadius: "4px"
                  }}
                />
              )}
              <Package size={18} />
              Browse Needs
            </div>
          )}
        </NavLink>

        {/* DONATION HISTORY */}
        <NavLink to="/donation-history" style={linkStyle}>
          {({ isActive }) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: isActive ? "#00563B" : "#374151",
                fontWeight: isActive ? "600" : "500",
                position: "relative"
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: "-20px",
                    width: "4px",
                    height: "100%",
                    background: "#00563B",
                    borderRadius: "4px"
                  }}
                />
              )}
              <BarChart3 size={18} />
              Donation History
            </div>
          )}
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
            <div
              style={{
                marginLeft: "15px",
                marginTop: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}
            >
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

      </div>
    </div>
  );
}