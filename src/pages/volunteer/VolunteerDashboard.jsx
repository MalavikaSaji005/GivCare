function VolunteerDashboard() {
  return (
    <div>
      <h2>Volunteer Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        <div style={card}>
          <h3>12</h3>
          <p>Total Tasks</p>
        </div>

        <div style={card}>
          <h3>3</h3>
          <p>Applied</p>
        </div>

        <div style={card}>
          <h3>1</h3>
          <p>Completed</p>
        </div>

        <div style={card}>
          <h3>2</h3>
          <p>Upcoming</p>
        </div>

      </div>
    </div>
  );
}

const card = {
  background: "#f5f7fb",
  padding: "20px",
  borderRadius: "10px",
  width: "150px",
  textAlign: "center"
};

export default VolunteerDashboard;