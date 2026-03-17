function VolunteerMyTasks() {
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
        My Tasks
      </h2>

      <div style={{ marginTop: "20px" }}>

        <div style={taskCard}>
          <span>Teaching Session</span>
          <span style={pendingStyle}>Pending</span>
        </div>

        <div style={taskCard}>
          <span>Medical Camp</span>
          <span style={approvedStyle}>Approved</span>
        </div>

      </div>

    </div>
  );
}

/* 🔥 Styles */
const headingStyle = {
  color: "#00563B",
  marginBottom: "10px",
  fontWeight: "bold"
};

const taskCard = {
  background: "#f9fafb",
  padding: "15px 20px",
  borderRadius: "10px",
  marginBottom: "12px",
  display: "flex",
  justifyContent: "space-between",
  border: "1px solid #eee"
};

const pendingStyle = {
  background: "#fef3c7",
  color: "#92400e",
  padding: "4px 10px",
  borderRadius: "6px",
  fontSize: "12px"
};

const approvedStyle = {
  background: "#d1fae5",
  color: "#065f46",
  padding: "4px 10px",
  borderRadius: "6px",
  fontSize: "12px"
};

export default VolunteerMyTasks;