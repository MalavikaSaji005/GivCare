import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo.jpeg";
import { useEffect, useState, useRef } from "react";

export default function UserNavbar({ toggleSidebar }) {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const avatarLetter = user?.email?.charAt(0).toUpperCase();

  return (
    <nav className="w-full bg-white px-12 py-5 flex items-center justify-between shadow-sm">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="text-2xl text-primary hover:opacity-70 transition duration-200"
          >
            ☰
          </button>
        )}

        {/* SAME BRANDING */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 object-contain"
          />
          <h2 className="text-2xl font-bold text-primary tracking-tight">
            GivCare
          </h2>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {user ? (
          <div className="relative" ref={menuRef}>

            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold cursor-pointer hover:opacity-90 transition duration-200"
            >
              {avatarLetter}
            </div>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-200"
                >
                  Profile
                </button>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/donation-history");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-200"
                >
                  My Donations
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition duration-200"
                >
                  Logout
                </button>

              </div>
            )}

          </div>
        ) : (
          <Link to="/register">
            <button className="bg-primary text-white px-5 py-2 rounded-full font-medium shadow-sm hover:shadow-md hover:bg-primaryDark transition duration-200">
              Get Started
            </button>
          </Link>
        )}

      </div>

    </nav>
  );
}