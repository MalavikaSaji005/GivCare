import { useState, useEffect } from "react";
import { ref, onValue, update } from "firebase/database";
import { db, auth } from "../firebase";
import DashboardLayout from "../components/DashboardLayout";
import toast from "react-hot-toast";

export default function Profile() {

  const user = auth.currentUser;
  const [donationCount, setDonationCount] = useState(0);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Donor fields
  const [donorForm, setDonorForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  // Institution fields
  const [institutionForm, setInstitutionForm] = useState({
    institutionName: "",
    headName: "",
    address: "",
    pincode: "",
  });

  const hoverIn = (e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.12)";
  };

  const hoverOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
  };

  // Fetch role and existing profile data from Firebase
  useEffect(() => {
    if (!user) return;

    const userRef = ref(db, `users/${user.uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRole(data.role || "donor");

        if (data.role === "institution") {
          setInstitutionForm({
            institutionName: data.institutionName || "",
            headName: data.headName || "",
            address: data.address || "",
            pincode: data.pincode || "",
          });
        } else {
          setDonorForm({
            name: data.name || "",
            phone: data.phone || "",
            address: data.address || "",
            pincode: data.pincode || "",
          });
        }
      } else {
        setRole("donor");
      }
      setLoading(false);
    });
  }, [user]);
  useEffect(() => {
    const donationsRef = ref(db, "donations");

    onValue(donationsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const myDonations = Object.values(data).filter(
          (d) => d.userId === user?.uid
        );

        setDonationCount(myDonations.length);
      } else {
        setDonationCount(0);
      }
    });
  }, [user]);
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
      }
      toast.success("Profile saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save profile.");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: "center", marginTop: "80px", color: "#888" }}>
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>

        {/* TITLE */}
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#00563B", marginBottom: "6px" }}>
          My Profile
        </h1>
        <p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>
          {role === "institution" ? "Institution account settings" : "Donor account settings"}
        </p>

        {/* PROFILE CARD - Avatar + Email */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "20px"
        }}>
          <div style={{
            width: "70px", height: "70px", borderRadius: "50%",
            background: "#00563B", color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "26px", fontWeight: "bold", flexShrink: 0
          }}>
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "16px" }}>{user?.email}</h2>
            <span style={{
              display: "inline-block",
              marginTop: "6px",
              padding: "2px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
              background: role === "institution" ? "#dbeafe" : "#dcfce7",
              color: role === "institution" ? "#1d4ed8" : "#15803d",
            }}>
              {role}
            </span>
          </div>
        </div>

        {/* FORM CARD */}
        <div style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
        }}>

          {/* Email - read only */}
          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>Email</label>
            <input
              type="text"
              value={user?.email || ""}
              disabled
              style={{ ...inputStyle, background: "#f5f5f5", color: "#aaa", cursor: "not-allowed" }}
            />
          </div>

          {/* ── DONOR FIELDS ── */}
          {role === "donor" && (
            <>
              <div style={{ marginBottom: "18px" }}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={donorForm.name}
                  onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={donorForm.phone}
                  onChange={(e) => setDonorForm({ ...donorForm, phone: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
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

          {/* ── INSTITUTION FIELDS ── */}
          {role === "institution" && (
            <>
              <div style={{ marginBottom: "18px" }}>
                <label style={labelStyle}>Institution Name</label>
                <input
                  type="text"
                  placeholder="Enter institution name"
                  value={institutionForm.institutionName}
                  onChange={(e) => setInstitutionForm({ ...institutionForm, institutionName: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={labelStyle}>Head of Institution</label>
                <input
                  type="text"
                  placeholder="Enter head's full name"
                  value={institutionForm.headName}
                  onChange={(e) => setInstitutionForm({ ...institutionForm, headName: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
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

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              width: "100%",
              padding: "12px",
              background: saving ? "#7da79a" : "#00563B",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: saving ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>

        </div>

      </div>

      {/* ── STATS SECTION ── */}
      <div style={{
        marginTop: "30px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "15px"
      }}>

        <div style={statCard} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
          <p style={{ color: "#666", marginBottom: "10px" }}>
            📦 Total Donations
          </p>
          <h2>{donationCount}</h2>
        </div>

        <div style={statCard} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
          <p style={{ color: "#666", marginBottom: "10px" }}>
            🤝 Active Volunteers
          </p>
          <h2>1</h2>
        </div>

        <div style={statCard} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
          <p style={{ color: "#666", marginBottom: "10px" }}>
            🏢 Partner Institutions
          </p>
          <h2>3</h2>
        </div>

      </div>


    </DashboardLayout>
  );
}

// Shared styles matching your existing Register.jsx style
const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  color: "#555",
  marginBottom: "6px"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "14px",
  boxSizing: "border-box"
};

const statCard = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  cursor: "pointer",
  textAlign: "center"
};
