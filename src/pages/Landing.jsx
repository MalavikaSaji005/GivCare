import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import hero from "../assets/hero.png";

export default function Landing() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#f0f7f4",
        minHeight: "100vh"
      }}
    >

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "90px 70px"
        }}
      >

        {/* TEXT */}
        <div style={{ maxWidth: "520px" }}>

          <h1
            style={{
              fontSize: "46px",
              marginBottom: "20px",
              color: "#00563B",
              lineHeight: "1.2"
            }}
          >
            A Verified Community <br /> Support Platform
          </h1>

          <p
            style={{
              marginBottom: "35px",
              color: "#555",
              fontSize: "18px"
            }}
          >
            Donate • Volunteer • Support Communities
          </p>

          <Link to="/register">
            <button
              style={{
                padding: "13px 28px",
                marginRight: "15px",
                background: "#00563B",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "15px"
              }}
            >
              Get Started
            </button>
          </Link>

          <Link to="/browse">
            <button
              style={{
                padding: "13px 28px",
                border: "1px solid #00563B",
                borderRadius: "8px",
                cursor: "pointer",
                background: "white",
                color: "#00563B",
                fontWeight: "bold",
                fontSize: "15px"
              }}
            >
              Browse Needs
            </button>
          </Link>

        </div>

        {/* HERO IMAGE */}
        <div
          style={{
            width: "360px",
            height: "260px",
            background: "#e8f3ef",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            padding: "20px"
          }}
        >
          <img
            src={hero}
            alt="Community Support"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain"
            }}
          />
        </div>

      </div>


      {/* FEATURES SECTION */}
      <div
        style={{
          padding: "60px 80px"
        }}
      >

        <h2
          style={{
            textAlign: "center",
            color: "#00563B",
            marginBottom: "45px",
            fontSize: "28px"
          }}
        >
          What You Can Do
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "28px"
          }}
        >

          <div
            style={{
              background: "white",
              padding: "28px",
              borderRadius: "12px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              transition: "0.25s"
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Donate Essentials</h3>
            <p style={{ color: "#555" }}>
              Help orphanages and care homes by donating food, clothes,
              medicines, and other necessities.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "28px",
              borderRadius: "12px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              transition: "0.25s"
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Volunteer</h3>
            <p style={{ color: "#555" }}>
              Offer your time and skills to support education,
              mentorship, and community programs.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "28px",
              borderRadius: "12px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              transition: "0.25s"
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Companion Support</h3>
            <p style={{ color: "#555" }}>
              Provide trusted companions for elderly people who need
              assistance during hospital visits.
            </p>
          </div>

        </div>

      </div>


      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "22px",
          background: "white",
          borderTop: "1px solid #e5e7eb"
        }}
      >
        <p style={{ color: "#666" }}>
          © 2026 GivCare – Community Support Platform
        </p>
      </footer>


      {/* CUSTOMER SUPPORT BUTTON */}
      <button
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          background: "#00563B",
          color: "white",
          border: "none",
          padding: "12px 18px",
          borderRadius: "30px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}
      >
        🎧
      </button>

    </div>
  );
}