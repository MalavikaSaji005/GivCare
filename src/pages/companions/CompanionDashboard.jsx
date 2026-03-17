function CompanionDashboard() {
  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >

      <h2 style={headingStyle}>
        Care Companion Dashboard
      </h2>

      <div style={gridStyle}>

        <div style={cardStyle}>
          <h3 style={numberStyle}>4</h3>
          <p>Active Requests</p>
        </div>

        <div style={cardStyle}>
          <h3 style={numberStyle}>10</h3>
          <p>Total Volunteers</p>
        </div>

        <div style={cardStyle}>
          <h3 style={numberStyle}>2</h3>
          <p>Upcoming Visits</p>
        </div>

      </div>

    </div>
  );
}

/* ✅ ADD THESE STYLES */
const headingStyle = {
  color: "#00563B",
  marginBottom: "20px",
  fontWeight: "bold"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  background: "#f9fafb",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  border: "1px solid #eee"
};

const numberStyle = {
  color: "#00563B",
  fontSize: "26px",
  fontWeight: "bold"
};

/* ✅ IMPORTANT */
export default CompanionDashboard;