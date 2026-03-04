import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

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
        navigate("/browse");
      } else {
        navigate("/institution");
      }

    } catch (error) {
      alert(error.message);
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
          style={{
            width: "100%",
            padding: "12px",
            background: "#00563B",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Register
        </button>

        <p
          style={{
            marginTop: "18px",
            textAlign: "center",
            fontSize: "14px"
          }}
        >
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              color: "#00563B",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Login
          </a>
        </p>

      </form>

    </div>
  );
}