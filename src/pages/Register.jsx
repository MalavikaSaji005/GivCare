import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setLoading(true);

    try {

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await set(ref(db, "users/" + user.uid), {
        email: email,
        role: role
      });

      alert("Registered Successfully!");

      if (role === "donor") {
        navigate("/dashboard");
      } else {
        navigate("/institution");
      }

    } catch (error) {

      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("⚠ This email is already registered. Please login instead.");
      }

      else if (error.code === "auth/invalid-email") {
        setErrorMsg("⚠ Please enter a valid email address.");
      }

      else if (error.code === "auth/weak-password") {
        setErrorMsg("⚠ Password should be at least 6 characters.");
      }

      else {
        setErrorMsg("⚠ Something went wrong. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f7f4"
      }}
    >

      <form
        onSubmit={handleRegister}
        style={{
          background: "white",
          padding: "40px",
          width: "340px",
          borderRadius: "10px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
            textAlign: "center",
            color: "#00563B"
          }}
        >
          Create Account
        </h2>

        {errorMsg && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
              marginBottom: "12px",
              textAlign: "center"
            }}
          >
            {errorMsg}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc",
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
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "6px"
          }}
        />

        <select
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "6px"
          }}
        >
          <option value="donor">Donor</option>
          <option value="institution">Institution</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: loading ? "#7da79a" : "#00563B",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p
          style={{
            marginTop: "18px",
            textAlign: "center",
            fontSize: "14px"
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#00563B",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}