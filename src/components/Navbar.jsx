import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo.jpeg";
import { useEffect, useState } from "react";

export default function Navbar({ toggleSidebar }) {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const avatarLetter = user?.email?.charAt(0).toUpperCase();

  return (
    <nav
      style={{
        height: "70px",
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 50px"
      }}
    >

      {/* LEFT SECTION */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}
      >

        {/* Hamburger Button */}
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            style={{
              fontSize: "26px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#00563B"
            }}
          >
            ☰
          </button>
        )}

        {/* Logo + Title */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none"
          }}
        >
          <img
            src={logo}
            alt="GivCare Logo"
            style={{
              width: "45px",
              height: "45px",
              objectFit: "contain"
            }}
          />

          <h2
            style={{
              color: "#00563B",
              margin: 0,
              fontSize: "28px",
              fontWeight: "bold"
            }}
          >
            GivCare
          </h2>
        </Link>

      </div>

      {/* RIGHT NAVIGATION */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
          position: "relative"
        }}
      >

        <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
          Home
        </Link>

        <Link to="/browse" style={{ textDecoration: "none", color: "#333" }}>
          Browse Needs
        </Link>

        {user && (
          <Link
            to="/donation-history"
            style={{ textDecoration: "none", color: "#333" }}
          >
            Donations
          </Link>
        )}

        {/* USER PROFILE */}
        {user ? (

          <div style={{ position: "relative" }}>

            <div
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#00563B",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              {avatarLetter}
            </div>

            {/* DROPDOWN MENU */}
            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "45px",
                  right: "0",
                  background: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  width: "160px"
                }}
              >

                <Link
                  to="/donation-history"
                  style={{
                    display: "block",
                    padding: "10px",
                    textDecoration: "none",
                    color: "#333"
                  }}
                >
                  My Donations
                </Link>

                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px" 
                  }}
                >
                  Logout   ➜]
                </button>

              </div>
            )}

          </div>

        ) : (

          <Link
            to="/login"
            style={{
              padding: "8px 16px",
              background: "#00563B",
              color: "white",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Login
          </Link>

        )}

      </div>

    </nav>
  );
}