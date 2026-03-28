import { useState } from "react";
import { ref, set } from "firebase/database";
import { db, auth } from "../../firebase";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/DashboardLayout"; // ✅ ADD

export default function OfferHelp() {
  const [type, setType] = useState("Volunteer");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!skills || !availability || !location) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await set(ref(db, `supportOffers/${user.uid}`), {
        type,
        skills,
        availability,
        location,
        email,
        phone,
        userId: user.uid,
        createdAt: new Date().toISOString()
      });

      toast.success("Offer submitted successfully!");

      setSkills("");
      setAvailability("");
      setLocation("");
      setEmail("");
      setPhone("");

    } catch (error) {
      console.error(error);
      toast.error("Error submitting offer");
    }
  };

  return (
    <DashboardLayout> {/* ✅ WRAP HERE */}

      <h2 style={{ marginBottom: "20px" }}>Offer Help</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          maxWidth: "700px"
        }}
      >

        <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle}>
          <option value="Volunteer">Volunteer</option>
          <option value="Companion">Companion</option>
        </select>

        <input
          type="text"
          placeholder="Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Submit
        </button>

      </form>

    </DashboardLayout>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #d1d5db"
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "#00563B",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};