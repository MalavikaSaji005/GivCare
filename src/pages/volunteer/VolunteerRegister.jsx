import { useState } from "react";

function VolunteerRegister() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Volunteer Registered!");
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
        Volunteer Registration
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Skills (Teaching, Medical etc)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Register
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

export default VolunteerRegister;