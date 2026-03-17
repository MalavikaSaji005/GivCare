import { useState } from "react";

function NewRequest() {

  const [name, setName] = useState("");
  const [hospital, setHospital] = useState("");
  const [date, setDate] = useState("");
  const [urgency, setUrgency] = useState("");

  const submitRequest = (e) => {
    e.preventDefault();
    alert("Care Companion request submitted!");
  };

  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        maxWidth: "600px"
      }}
    >

      <h2
        style={{
          color: "#00563B",
          marginBottom: "25px",
          fontWeight: "bold"
        }}
      >
        Request a Care Companion
      </h2>

      <form onSubmit={submitRequest}>

        <input
          placeholder="Elderly Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Hospital / Place"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          style={inputStyle}
        />

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />

        <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Urgency</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button type="submit" style={buttonStyle}>
          Submit Request
        </button>

      </form>
    </div>
  );
}

/* 🔥 Reusable Styles */
const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  marginBottom: "15px",
  fontSize: "14px",
  outline: "none"
};

const buttonStyle = {
  background: "#00563B",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
  marginTop: "10px"
};

export default NewRequest;