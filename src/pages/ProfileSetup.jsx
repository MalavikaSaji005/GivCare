import { useState } from "react";
import { ref, update } from "firebase/database";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProfileSetup({ role }) {

  const navigate = useNavigate();
  const user = auth.currentUser;
  const [saving, setSaving] = useState(false);

  const [donorForm, setDonorForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [institutionForm, setInstitutionForm] = useState({
    institutionName: "",
    headName: "",
    address: "",
    pincode: "",
  });

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    try {
      if (role === "institution") {
        if (!institutionForm.institutionName || !institutionForm.headName || !institutionForm.address || !institutionForm.pincode) {
          toast.error("Please fill in all fields");
          setSaving(false);
          return;
        }
        await update(ref(db, `users/${user.uid}`), {
          ...institutionForm,
          role: "institution",
          email: user.email,
          updatedAt: new Date().toISOString(),
        });
        toast.success("Profile saved!");
        navigate("/institution");
      } else {
        if (!donorForm.name || !donorForm.phone || !donorForm.address || !donorForm.pincode) {
          toast.error("Please fill in all fields");
          setSaving(false);
          return;
        }
        await update(ref(db, `users/${user.uid}`), {
          ...donorForm,
          role: "donor",
          email: user.email,
          updatedAt: new Date().toISOString(),
        });
        toast.success("Profile saved!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save profile.");
    }

    setSaving(false);
  };

  const handleSkip = () => {
    if (role === "institution") navigate("/institution");
    else navigate("/dashboard");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f0f7f4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px"
    }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: "#00563B", color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px", fontWeight: "bold", margin: "0 auto 16px"
          }}>
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <h1 style={{ color: "#00563B", fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            Complete your profile
          </h1>
          <p style={{ color: "#888", fontSize: "14px", marginTop: "8px" }}>
            {role === "institution"
              ? "Tell us about your institution"
              : "Tell us a bit about yourself"}
          </p>
          <span style={{
            display: "inline-block", marginTop: "8px",
            padding: "2px 14px", borderRadius: "20px",
            fontSize: "12px", fontWeight: "bold", textTransform: "uppercase",
            background: role === "institution" ? "#dbeafe" : "#dcfce7",
            color: role === "institution" ? "#1d4ed8" : "#15803d",
          }}>
            {role}
          </span>
        </div>

        {/* Form Card */}
        <div style={{
          background: "white", padding: "30px",
          borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}>

          {/* Email read-only */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Email</label>
            <input
              type="text"
              value={user?.email || ""}
              disabled
              style={{ ...inputStyle, background: "#f5f5f5", color: "#aaa", cursor: "not-allowed" }}
            />
          </div>

          {/* DONOR FIELDS */}
          {role === "donor" && (
            <>
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={donorForm.name}
                  onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={donorForm.phone}
                  onChange={(e) => setDonorForm({ ...donorForm, phone: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Address</label>
                <textarea
                  placeholder="Enter your address"
                  value={donorForm.address}
                  onChange={(e) => setDonorForm({ ...donorForm, address: e.target.value })}
                  rows={3}
                  style={{ ...inputStyle, resize: "none", height: "auto" }}
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Pincode</label>
                <input
                  type="text"
                  placeholder="Enter your pincode"
                  value={donorForm.pincode}
                  onChange={(e) => setDonorForm({ ...donorForm, pincode: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </>
          )}

          {/* INSTITUTION FIELDS */}
          {role === "institution" && (
            <>
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Institution Name</label>
                <input
                  type="text"
                  placeholder="Enter institution name"
                  value={institutionForm.institutionName}
                  onChange={(e) => setInstitutionForm({ ...institutionForm, institutionName: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Head of Institution</label>
                <input
                  type="text"
                  placeholder="Enter head's full name"
                  value={institutionForm.headName}
                  onChange={(e) => setInstitutionForm({ ...institutionForm, headName: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Address</label>
                <textarea
                  placeholder="Enter institution address"
                  value={institutionForm.address}
                  onChange={(e) => setInstitutionForm({ ...institutionForm, address: e.target.value })}
                  rows={3}
                  style={{ ...inputStyle, resize: "none", height: "auto" }}
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Pincode</label>
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={institutionForm.pincode}
                  onChange={(e) => setInstitutionForm({ ...institutionForm, pincode: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </>
          )}

          {/* Buttons */}
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              width: "100%", padding: "12px",
              background: saving ? "#7da79a" : "#00563B",
              color: "white", border: "none", borderRadius: "6px",
              cursor: saving ? "not-allowed" : "pointer",
              fontWeight: "bold", fontSize: "16px", marginBottom: "10px"
            }}
          >
            {saving ? "Saving..." : "Save & Continue"}
          </button>

          <button
            onClick={handleSkip}
            style={{
              width: "100%", padding: "10px",
              background: "transparent", color: "#888",
              border: "1px solid #ddd", borderRadius: "6px",
              cursor: "pointer", fontSize: "14px"
            }}
          >
            Skip for now
          </button>

        </div>

      </div>
    </div>
  );
}

const labelStyle = {
  display: "block", fontSize: "13px",
  fontWeight: "600", color: "#555", marginBottom: "6px"
};

const inputStyle = {
  width: "100%", padding: "10px",
  border: "1px solid #ccc", borderRadius: "6px",
  fontSize: "14px", boxSizing: "border-box"
};
