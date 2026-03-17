function VolunteerDashboard() {
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
        Volunteer Dashboard
      </h2>

      <div style={gridStyle}>

        <div style={cardStyle}>
          <h3 style={numberStyle}>12</h3>
          <p>Total Tasks</p>
        </div>

        <div style={cardStyle}>
          <h3 style={numberStyle}>3</h3>
          <p>Applied</p>
        </div>

        <div style={cardStyle}>
          <h3 style={numberStyle}>1</h3>
          <p>Completed</p>
        </div>

        <div style={cardStyle}>
          <h3 style={numberStyle}>2</h3>
          <p>Upcoming</p>
        </div>

      </div>

    </div>
  );
}

/* 🔥 Styles */
const headingStyle = {
  color: "#00563B",
  marginBottom: "25px",
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
  fontSize: "28px",
  fontWeight: "bold"
};

export default VolunteerDashboard;