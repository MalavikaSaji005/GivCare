import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { db, auth } from "../../firebase";
import { ref, push } from "firebase/database";

export default function RequestHelp() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Volunteer");
  const [location, setLocation] = useState("");
  const [peopleNeeded, setPeopleNeeded] = useState("");
  const [deadline, setDeadline] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Login required");
      return;
    }

    if (!title || !description || !location || !peopleNeeded) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await push(ref(db, "supportRequests"), {
        title,
        description,
        type,
        location,
        peopleNeeded: Number(peopleNeeded),
        acceptedCount: 0,
        acceptedUsers: {},
        deadline: deadline || null, // ✅ FIXED
        status: "open",
        userId: user.uid,
        createdAt: Date.now()
      });

      alert("Request submitted successfully!");

      // RESET FORM
      setTitle("");
      setDescription("");
      setLocation("");
      setPeopleNeeded("");
      setDeadline("");

    } catch (error) {
      console.error(error);
      alert("Error submitting request");
    }
  };

  return (
    <DashboardLayout>

      <h2 style={{ marginBottom: "20px" }}>Request Help</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
        }}
      >

        {/* TITLE */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={inputStyle}
        />

        {/* TYPE */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={inputStyle}
        >
          <option value="Volunteer">Volunteer</option>
          <option value="Companion">Companion</option>
        </select>

        {/* LOCATION */}
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />

        {/* PEOPLE NEEDED */}
        <input
          type="number"
          placeholder="Number of people needed"
          value={peopleNeeded}
          onChange={(e) => setPeopleNeeded(e.target.value)}
          style={inputStyle}
        />

        {/* 🔥 EXPIRY TIME (UPDATED UI) */}
        <div style={{ marginBottom: "15px" }}>
          <label style={labelStyle}>
            ⏰ Accept until (Expiry Time)
          </label>

          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{ ...inputStyle, marginBottom: "5px" }}
          />

          <p style={{ fontSize: "12px", color: "#6b7280" }}>
            After this time, no one can accept the request
          </p>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#00563B",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Submit Request
        </button>

      </form>

    </DashboardLayout>
  );
}