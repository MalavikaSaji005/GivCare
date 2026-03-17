import { useState } from "react";

function VolunteerTasks() {

  const tasks = [
    { id: 1, name: "Teaching Session" },
    { id: 2, name: "Medical Camp" },
    { id: 3, name: "Workshop" }
  ];

  const [applied, setApplied] = useState([]);

  const applyTask = (task) => {
    if (!applied.includes(task.id)) {
      setApplied([...applied, task.id]);
      alert("Applied for " + task.name);
    }
  };

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
        Find Volunteer Opportunities
      </h2>

      <div style={{ marginTop: "20px" }}>

        {tasks.map((task) => (
          <div key={task.id} style={cardStyle}>

            <span style={{ fontWeight: "500" }}>{task.name}</span>

            <button
              onClick={() => applyTask(task)}
              style={
                applied.includes(task.id)
                  ? appliedButton
                  : applyButton
              }
            >
              {applied.includes(task.id) ? "Applied" : "Apply"}
            </button>

          </div>
        ))}

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

const cardStyle = {
  background: "#f9fafb",
  padding: "15px 20px",
  borderRadius: "10px",
  marginBottom: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #eee"
};

const applyButton = {
  background: "#00563B",
  color: "white",
  padding: "6px 14px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const appliedButton = {
  background: "#d1fae5",
  color: "#065f46",
  padding: "6px 14px",
  border: "none",
  borderRadius: "6px",
  cursor: "default"
};

export default VolunteerTasks;