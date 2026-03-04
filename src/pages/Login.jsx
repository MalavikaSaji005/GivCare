import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const snapshot = await get(ref(db, "users/" + user.uid));

      if (snapshot.exists()) {

        const role = snapshot.val().role;

        if (role === "donor") {
          navigate("/browse");
        } else {
          navigate("/institution");
        }

      }

    } catch (error) {
      alert(error.message);
    }
  };

  return (

    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f0f7f4"
    }}>

      <form
        onSubmit={handleLogin}
        style={{
          background: "#ffffff",
          padding: "40px",
          width: "340px",
          borderRadius: "12px",
          boxShadow: "0 6px 25px rgba(0,0,0,0.08)"
        }}
      >

        <h2 style={{
          marginBottom: "25px",
          textAlign: "center",
          color: "#00563B"
        }}>
          Login to GivCare
        </h2>

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "6px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "6px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#00563B",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        <p style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "14px"
        }}>
          Don't have an account?{" "}
          <a
            href="/register"
            style={{
              color: "#00563B",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Register
          </a>
        </p>

      </form>

    </div>
  );
}