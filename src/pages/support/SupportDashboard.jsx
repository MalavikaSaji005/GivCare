import { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { db, auth } from "../../firebase";
import DashboardLayout from "../../components/DashboardLayout"; // ✅ IMPORTANT

export default function SupportDashboard() {
  const [requests, setRequests] = useState([]);
  const [offers, setOffers] = useState([]);
  const [view, setView] = useState("requests");
  const [activeContact, setActiveContact] = useState(null);

  const user = auth.currentUser;

  /* FETCH REQUESTS */
  useEffect(() => {
    const reqRef = ref(db, "supportRequests");

    onValue(reqRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setRequests(list);
    });
  }, []);

  /* FETCH OFFERS */
  useEffect(() => {
    const offerRef = ref(db, "supportOffers");

    onValue(offerRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setOffers(list);
    });
  }, []);

  /* ACCEPT REQUEST */
  const handleAccept = async (req) => {
    if (!user) return;

    if (req.acceptedUsers && req.acceptedUsers[user.uid]) {
      alert("Already accepted");
      return;
    }

    if (req.deadline && new Date(req.deadline) < new Date()) {
      alert("Request expired");
      return;
    }

    if ((req.acceptedCount || 0) >= req.peopleNeeded) {
      alert("All slots filled");
      return;
    }

    const updates = {};
    updates[`supportRequests/${req.id}/acceptedUsers/${user.uid}`] = true;
    updates[`supportRequests/${req.id}/acceptedCount`] =
      (req.acceptedCount || 0) + 1;

    await update(ref(db), updates);
  };

  return (
    <DashboardLayout> {/* ✅ THIS FIXES FULL SCREEN */}

      <div>
        <h2 style={{ marginBottom: "20px" }}>Support Hub Dashboard</h2>

        {/* STATS */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "25px" }}>
          <StatCard label="📌 Total Requests" value={requests.length} />
          <StatCard
            label="🤝 Accepted"
            value={requests.reduce(
              (sum, r) => sum + (r.acceptedCount || 0),
              0
            )}
          />
          <StatCard label="✅ Completed" value={0} />
        </div>

        {/* FILTER */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button onClick={() => setView("requests")} style={tabStyle(view === "requests")}>
            📋 Requests
          </button>

          <button onClick={() => setView("helpers")} style={tabStyle(view === "helpers")}>
            🤝 Available Helpers
          </button>
        </div>

        {/* ================= REQUESTS ================= */}
        {view === "requests" && (
          <div>
            {requests.length === 0 ? (
              <p>No requests available</p>
            ) : (
              requests.map((req) => {
                const accepted = req.acceptedCount || 0;
                const isAccepted =
                  req.acceptedUsers && req.acceptedUsers[user?.uid];

                const isExpired =
                  req.deadline && new Date(req.deadline) < new Date();

                const progress =
                  req.peopleNeeded > 0
                    ? (accepted / req.peopleNeeded) * 100
                    : 0;

                return (
                  <div key={req.id} style={cardStyle}>
                    <h3>{req.title}</h3>
                    <p>{req.description}</p>

                    <p>
                      <b>{req.type}</b> • {req.location}
                    </p>

                    <p>
                      👥 Needed: {req.peopleNeeded} | Accepted: {accepted}
                    </p>

                    <p>
                      ⏰ Till:{" "}
                      {req.deadline && !isNaN(new Date(req.deadline))
                        ? new Date(req.deadline).toLocaleString()
                        : "No deadline"}
                    </p>

                    {/* PROGRESS */}
                    <div style={progressBg}>
                      <div
                        style={{
                          ...progressFill,
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                    {/* BUTTON */}
                    <button
                      disabled={
                        isAccepted ||
                        isExpired ||
                        accepted >= req.peopleNeeded
                      }
                      onClick={() => handleAccept(req)}
                      style={{
                        ...buttonStyle,
                        background:
                          isAccepted || isExpired
                            ? "#ccc"
                            : "#00563B",
                      }}
                    >
                      {isAccepted
                        ? "Already Accepted"
                        : isExpired
                        ? "Expired"
                        : accepted >= req.peopleNeeded
                        ? "Full"
                        : "Accept"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ================= HELPERS ================= */}
        {view === "helpers" && (
          <div>
            {offers.length === 0 ? (
              <p>No helpers available</p>
            ) : (
              offers.map((offer) => (
                <div key={offer.id} style={cardStyle}>
                  <h3>{offer.type}</h3>

                  <p><b>Skills:</b> {offer.skills}</p>
                  <p><b>Availability:</b> {offer.availability}</p>
                  <p><b>Location:</b> {offer.location}</p>

                  {/* CONTACT BUTTON */}
                  <button
                    onClick={() =>
                      setActiveContact(
                        activeContact === offer.id ? null : offer.id
                      )
                    }
                    style={buttonStyle}
                  >
                    📞 Contact Helper
                  </button>

                  {/* CONTACT DETAILS */}
                  {activeContact === offer.id && (
                    <div style={contactBox}>
                      <p>📧 {offer.email || "Not provided"}</p>
                      <p>📱 {offer.phone || "Not provided"}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

      </div>

    </DashboardLayout>
  );
}

/* COMPONENT */
function StatCard({ label, value }) {
  return (
    <div style={statCard}>
      <h2 style={{ color: "#00563B" }}>{value}</h2>
      <p>{label}</p>
    </div>
  );
}

/* STYLES */
const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "15px",
};

const buttonStyle = {
  marginTop: "10px",
  padding: "10px 14px",
  borderRadius: "6px",
  border: "none",
  background: "#00563B",
  color: "white",
  cursor: "pointer",
};

const tabStyle = (active) => ({
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: active ? "#00563B" : "#e5e7eb",
  color: active ? "white" : "#333",
  fontWeight: "600",
});

const statCard = {
  flex: 1,
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
};

const progressBg = {
  height: "8px",
  background: "#e5e7eb",
  borderRadius: "10px",
  margin: "10px 0",
};

const progressFill = {
  height: "8px",
  background: "#22c55e",
  borderRadius: "10px",
};

const contactBox = {
  marginTop: "10px",
  background: "#f3f4f6",
  padding: "10px",
  borderRadius: "8px",
};