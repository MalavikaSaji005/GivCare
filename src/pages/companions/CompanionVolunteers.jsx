function CompanionVolunteers() {
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
        Available Care Volunteers
      </h2>

      <div style={{ marginTop: "20px" }}>

        <div style={cardBox}>
          <strong>Rahul</strong>
          <p style={subText}>First Aid Certified</p>
        </div>

        <div style={cardBox}>
          <strong>Meera</strong>
          <p style={subText}>Nursing Student</p>
        </div>

        <div style={cardBox}>
          <strong>Arjun</strong>
          <p style={subText}>Community Volunteer</p>
        </div>

      </div>

    </div>
  );
}

/* ✅ Styles */
const headingStyle = {
  color: "#00563B",
  marginBottom: "20px",
  fontWeight: "bold"
};

const cardBox = {
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

/* ✅ IMPORTANT */
export default CompanionVolunteers;