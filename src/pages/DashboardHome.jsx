import DashboardLayout from "../components/DashboardLayout";

export default function DashboardHome() {

  const cardStyle = {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer"
  };

  const hoverIn = (e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.12)";
  };

  const hoverOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
  };

  return (
    <DashboardLayout>

      {/* Page Title */}
      <h1
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          color: "#00563B",
          marginBottom: "8px"
        }}
      >
        Dashboard
      </h1>

      <p style={{ color: "#666", marginBottom: "30px" }}>
        Overview of platform activity
      </p>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >

        {/* Card 1 */}
        <div style={cardStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
          <p style={{ color: "#666", marginBottom: "10px" }}>
            📦 Total Donations
          </p>

          <h2 style={{ color: "#00563B", fontSize: "30px" }}>
            142
          </h2>
        </div>

        {/* Card 2 */}
        <div style={cardStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
          <p style={{ color: "#666", marginBottom: "10px" }}>
            🤝 Active Volunteers
          </p>

          <h2 style={{ color: "#00563B", fontSize: "30px" }}>
            58
          </h2>
        </div>

        {/* Card 3 */}
        <div style={cardStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
          <p style={{ color: "#666", marginBottom: "10px" }}>
            ⏳ Pending Needs
          </p>

          <h2 style={{ color: "#00563B", fontSize: "30px" }}>
            12
          </h2>
        </div>

        {/* Card 4 */}
        <div style={cardStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
          <p style={{ color: "#666", marginBottom: "10px" }}>
            🏢 Partner Institutions
          </p>

          <h2 style={{ color: "#00563B", fontSize: "30px" }}>
            23
          </h2>
        </div>

      </div>

    </DashboardLayout>
  );
}