function ActiveRequests() {
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
        Active Companion Requests
      </h2>

      <div style={{ marginTop: "20px" }}>

        <div style={cardBox}>
          <strong>Mr. Rahman</strong>
          <p style={subText}>Aster Hospital • Tomorrow 10AM</p>
          <span style={assignedStyle}>Volunteer Assigned</span>
        </div>

        <div style={cardBox}>
          <strong>Mrs. Fatima</strong>
          <p style={subText}>City Clinic • Friday</p>
          <span style={searchingStyle}>Searching Volunteer</span>
        </div>

      </div>

    </div>
  );
}

/* ✅ ADD STYLES (IMPORTANT) */
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

const assignedStyle = {
  background: "#d1fae5",
  color: "#065f46",
  padding: "4px 10px",
  borderRadius: "6px",
  fontSize: "12px"
};

const searchingStyle = {
  background: "#fef3c7",
  color: "#92400e",
  padding: "4px 10px",
  borderRadius: "6px",
  fontSize: "12px"
};

/* ✅ VERY IMPORTANT */
export default ActiveRequests;