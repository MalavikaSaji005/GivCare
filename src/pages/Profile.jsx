import { auth } from "../firebase";
import DashboardLayout from "../components/DashboardLayout";

export default function Profile() {

  const user = auth.currentUser;

  return (
    <DashboardLayout>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>

        {/* TITLE */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#00563B",
            marginBottom: "20px"
          }}
        >
          My Profile
        </h1>

        {/* PROFILE CARD */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            marginBottom: "20px"
          }}
        >

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

            {/* Avatar */}
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "#00563B",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold"
              }}
            >
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div>
              <h2 style={{ margin: 0 }}>{user?.email}</h2>
              <p style={{ color: "#666", fontSize: "14px" }}>
                Logged in user
              </p>
            </div>

          </div>

        </div>

        {/* DETAILS */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
          }}
        >

          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>User ID:</strong> {user?.uid}</p>

        </div>

      </div>

    </DashboardLayout>
  );
}