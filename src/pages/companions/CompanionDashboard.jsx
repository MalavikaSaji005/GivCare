function CompanionDashboard() {
  return (
    <div>

      <h2>Care Companion Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        <div style={card}>
          <h3>4</h3>
          <p>Active Requests</p>
        </div>

        <div style={card}>
          <h3>10</h3>
          <p>Total Volunteers</p>
        </div>

        <div style={card}>
          <h3>2</h3>
          <p>Upcoming Visits</p>
        </div>

      </div>

    </div>
  );
}

const card = {
  background: "#f5f7fb",
  padding: "20px",
  borderRadius: "10px",
  width: "160px",
  textAlign: "center"
};

export default CompanionDashboard;