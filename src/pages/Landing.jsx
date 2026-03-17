import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

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
          padding: "90px 100px"
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
            <button style={primaryBtn}>Get Started</button>
          </Link>

          <Link to="/browse">
            <button style={secondaryBtn}>Browse Needs</button>
          </Link>

        </div>

        {/* 🔥 IMAGE DEPTH SECTION */}
        <div style={imageGrid}>

          <img src={hero1} alt="left" style={backImage} />

          {/* CENTER IMAGE WITH GLOW */}
          <div style={centerWrapper}>
            <div style={glowStyle}></div>
            <img src={hero2} alt="main" style={frontImage} />
          </div>

          <img src={hero3} alt="right" style={backImage} />

        </div>

      </div>


      {/* FEATURES */}
      <div style={{ padding: "60px 80px" }}>

        <h2 style={sectionTitle}>What You Can Do</h2>

        <div style={featuresGrid}>

          <div style={featureCard}>
            <h3>Donate Essentials</h3>
            <p>Help communities with essential items.</p>
          </div>

          <div style={featureCard}>
            <h3>Volunteer</h3>
            <p>Contribute your time and skills.</p>
          </div>

          <div style={featureCard}>
            <h3>Companion Support</h3>
            <p>Support elderly with care assistance.</p>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer style={footer}>
        © 2026 GivCare – Community Support Platform
      </footer>

    </div>
  );
}


/* 🔥 STYLES */

const imageGrid = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0px"
};

const backImage = {
  width: "200px",
  height: "370px",
  objectFit: "cover",
  borderRadius: "12px",
  transform: "scale(0.92) translateY(8px)", // 🔥 depth positioning
  opacity: 0.9,
  boxShadow: "0 12px 30px rgba(0,0,0,0.18)" // 🔥 improved shadow
};

const frontImage = {
  width: "270px",
  height: "470px",
  objectFit: "cover",
  borderRadius: "14px",
  boxShadow: "0 25px 60px rgba(0,0,0,0.25)", // 🔥 strongest shadow
  transform: "translateY(-12px)",
  position: "relative",
  zIndex: 2
};

const centerWrapper = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const glowStyle = {
  position: "absolute",
  width: "300px",
  height: "500px",
  background: "rgba(0, 86, 59, 0.08)",
  filter: "blur(50px)",
  borderRadius: "20px",
  zIndex: 1
};

const primaryBtn = {
  padding: "13px 28px",
  marginRight: "15px",
  background: "#00563B",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

const secondaryBtn = {
  padding: "13px 28px",
  border: "1px solid #00563B",
  borderRadius: "8px",
  background: "white",
  color: "#00563B",
  fontWeight: "bold",
  cursor: "pointer"
};

const sectionTitle = {
  textAlign: "center",
  color: "#00563B",
  marginBottom: "45px",
  fontSize: "28px"
};

const featuresGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "28px"
};

const featureCard = {
  background: "white",
  padding: "28px",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
};

const footer = {
  textAlign: "center",
  padding: "20px",
  background: "white",
  marginTop: "40px"
};