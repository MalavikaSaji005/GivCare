import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

export default function InstitutionProfile() {

  const { institutionId } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch institution profile
  useEffect(() => {
    const userRef = ref(db, `users/${institutionId}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.role === "institution") {
        setProfile(data);
      }
      setLoading(false);
    });
  }, [institutionId]);

  // Fetch this institution's needs
  useEffect(() => {
    const needsRef = ref(db, "needs");
    onValue(needsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data)
          .map(key => ({ id: key, ...data[key] }))
          .filter(need => need.institutionId === institutionId);
        setNeeds(list);
      } else {
        setNeeds([]);
      }
    });
  }, [institutionId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: "center", marginTop: "80px", color: "#888" }}>
          Loading institution profile...
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: "center", marginTop: "80px", color: "#888" }}>
          Institution not found.
        </div>
      </DashboardLayout>
    );
  }

  const completedNeeds = needs.filter(n => Number(n.donated) >= Number(n.qty));
  const activeNeeds = needs.filter(n => Number(n.donated) < Number(n.qty));

  return (
    <DashboardLayout>

      <div style={{ maxWidth: "700px", margin: "0 auto" }}>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none", border: "none", color: "#00563B",
            cursor: "pointer", fontSize: "14px", fontWeight: "bold",
            marginBottom: "20px", padding: 0
          }}
        >
          ← Back
        </button>

        {/* Profile Header Card */}
        <div style={{
          background: "white", padding: "30px",
          borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          marginBottom: "20px", display: "flex", alignItems: "center", gap: "24px"
        }}>
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%",
            background: "#00563B", color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "32px", fontWeight: "bold", flexShrink: 0
          }}>
            {profile.institutionName?.charAt(0).toUpperCase() || "I"}
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "#00563B" }}>
              {profile.institutionName || "Institution"}
            </h1>
            <span style={{
              display: "inline-block", marginTop: "6px",
              padding: "2px 12px", borderRadius: "20px",
              fontSize: "12px", fontWeight: "bold", textTransform: "uppercase",
              background: "#dbeafe", color: "#1d4ed8"
            }}>
              Institution
            </span>
          </div>
        </div>

        {/* Details Card */}
        <div style={{
          background: "white", padding: "28px",
          borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          marginBottom: "20px"
        }}>
          <h2 style={{ color: "#00563B", fontSize: "16px", fontWeight: "bold", marginBottom: "20px" }}>
            Institution Details
          </h2>

          <div style={detailRow}>
            <span style={detailLabel}>Institution Name</span>
            <span style={detailValue}>{profile.institutionName || "—"}</span>
          </div>
          <div style={detailRow}>
            <span style={detailLabel}>Head of Institution</span>
            <span style={detailValue}>{profile.headName || "—"}</span>
          </div>
          <div style={detailRow}>
            <span style={detailLabel}>Address</span>
            <span style={detailValue}>{profile.address || "—"}</span>
          </div>
          <div style={{ ...detailRow, borderBottom: "none" }}>
            <span style={detailLabel}>Pincode</span>
            <span style={detailValue}>{profile.pincode || "—"}</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "14px", marginBottom: "20px"
        }}>
          <div style={statCard}>
            <p style={{ color: "#666", fontSize: "13px", margin: "0 0 8px" }}>Total Needs</p>
            <h2 style={{ margin: 0, color: "#00563B", fontSize: "26px" }}>{needs.length}</h2>
          </div>
          <div style={statCard}>
            <p style={{ color: "#666", fontSize: "13px", margin: "0 0 8px" }}>Active Needs</p>
            <h2 style={{ margin: 0, color: "#2563eb", fontSize: "26px" }}>{activeNeeds.length}</h2>
          </div>
          <div style={statCard}>
            <p style={{ color: "#666", fontSize: "13px", margin: "0 0 8px" }}>Completed</p>
            <h2 style={{ margin: 0, color: "#16a34a", fontSize: "26px" }}>{completedNeeds.length}</h2>
          </div>
        </div>

        {/* Active Needs */}
        {activeNeeds.length > 0 && (
          <div style={{
            background: "white", padding: "24px",
            borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
          }}>
            <h2 style={{ color: "#00563B", fontSize: "16px", fontWeight: "bold", marginBottom: "16px" }}>
              Current Needs
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {activeNeeds.map(need => {
                const pct = Math.min(100, Math.round((Number(need.donated) / Number(need.qty)) * 100));
                return (
                  <div key={need.id} style={{
                    border: "1px solid #e5e7eb", borderRadius: "8px", padding: "14px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "14px" }}>
                        {need.item}
                      </span>
                      <span style={{
                        padding: "2px 10px", borderRadius: "20px", fontSize: "11px",
                        fontWeight: "bold", textTransform: "uppercase",
                        background: need.priority === "Urgent" ? "#fee2e2" : "#dcfce7",
                        color: need.priority === "Urgent" ? "#dc2626" : "#16a34a"
                      }}>
                        {need.priority}
                      </span>
                    </div>
                    <p style={{ color: "#888", fontSize: "13px", margin: "0 0 8px" }}>
                      {need.donated || 0} / {need.qty} donated
                    </p>
                    <div style={{ background: "#e5e7eb", borderRadius: "4px", height: "6px" }}>
                      <div style={{
                        background: "#00563B", height: "6px",
                        borderRadius: "4px", width: `${pct}%`
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

const detailRow = {
  display: "flex", justifyContent: "space-between",
  padding: "12px 0", borderBottom: "1px solid #f0f0f0"
};
const detailLabel = {
  fontSize: "13px", color: "#888", fontWeight: "600"
};
const detailValue = {
  fontSize: "14px", color: "#333", textAlign: "right", maxWidth: "60%"
};
const statCard = {
  background: "#f9fafb", padding: "20px",
  borderRadius: "10px", textAlign: "center",
  border: "1px solid #e5e7eb"
};
