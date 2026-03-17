function CompanionHistory() {
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
        Past Companion Visits
      </h2>

      <div style={{ marginTop: "20px" }}>

        <div style={cardBox}>
          <strong>Mr. Joseph</strong>
          <p style={subText}>Medical Checkup</p>
          <span style={completedStyle}>Completed</span>
        </div>

        <div style={cardBox}>
          <strong>Mrs. Sara</strong>
          <p style={subText}>Eye Hospital</p>
          <span style={completedStyle}>Completed</span>
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

const completedStyle = {
  background: "#d1fae5",
  color: "#065f46",
  padding: "4px 10px",
  borderRadius: "6px",
  fontSize: "12px"
};

/* ✅ IMPORTANT */
export default CompanionHistory;