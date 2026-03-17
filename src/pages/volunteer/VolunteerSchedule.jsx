function VolunteerSchedule() {
  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        maxWidth: "700px"
      }}
    >

      <h2 style={headingStyle}>
        Volunteer Schedule
      </h2>

      <div style={{ marginTop: "20px" }}>

        <div style={scheduleCard}>
          <div>
            <strong>Teaching Session</strong>
            <p style={subText}>Kochi • 22 March • 10AM</p>
          </div>
        </div>

        <div style={scheduleCard}>
          <div>
            <strong>Medical Camp</strong>
            <p style={subText}>Aluva • 25 March • 9AM</p>
          </div>
        </div>

      </div>

    </div>
  );
}

/* 🔥 Styles */
const headingStyle = {
  color: "#00563B",
  marginBottom: "20px",
  fontWeight: "bold"
};

const scheduleCard = {
  background: "#f9fafb",
  padding: "15px 20px",
  borderRadius: "10px",
  marginBottom: "12px",
  border: "1px solid #eee"
};

const subText = {
  fontSize: "13px",
  color: "#666",
  marginTop: "5px"
};

export default VolunteerSchedule;