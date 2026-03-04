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
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          background: "#ffffff",
          borderBottom: "1px solid #e5e5e5"
        }}
      >
        <h2 style={{ color: "#00563B", margin: 0 }}>GivCare</h2>

        <div>
          <a href="/" style={{ margin: "10px", textDecoration: "none", color: "#333" }}>Home</a>
          <a href="/" style={{ margin: "10px", textDecoration: "none", color: "#333" }}>About</a>
          <a href="/" style={{ margin: "10px", textDecoration: "none", color: "#333" }}>Services</a>
          <a href="/login" style={{ margin: "10px", textDecoration: "none", color: "#00563B", fontWeight: "bold" }}>
            Login
          </a>
        </div>
      </nav>


      {/* HERO SECTION */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "80px 60px"
        }}
      >

        {/* TEXT SECTION */}
        <div style={{ maxWidth: "500px" }}>

          <h1
            style={{
              fontSize: "42px",
              marginBottom: "20px",
              color: "#00563B"
            }}
          >
            A Verified Community <br /> Support Platform
          </h1>

          <p
            style={{
              marginBottom: "30px",
              color: "#555",
              fontSize: "18px"
            }}
          >
            Donate • Volunteer • Help Elderly
          </p>

          <button
            style={{
              padding: "12px 25px",
              marginRight: "15px",
              background: "#00563B",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Get Started
          </button>

          <button
            style={{
              padding: "12px 25px",
              border: "1px solid #00563B",
              borderRadius: "6px",
              cursor: "pointer",
              background: "white",
              color: "#00563B",
              fontWeight: "bold"
            }}
          >
            Learn More
          </button>

        </div>


        {/* IMAGE PLACEHOLDER */}
        <div
          style={{
            width: "320px",
            height: "220px",
            background: "#e8f3ef",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#00563B",
            fontWeight: "bold"
          }}
        >
          Image
        </div>

      </div>

    </div>
  );
}