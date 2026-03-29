import Navbar from "./UserNavbar";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db, auth } from "../firebase";
import UserSidebar from "./UserSidebar";
import { useLocation } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [role, setRole] = useState(null);
  const [supportOpen, setSupportOpen] = useState(false);

  const location = useLocation();

  // FETCH ROLE
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = ref(db, `users/${user.uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setRole(data.role);
    });
  }, []);

  // AUTO OPEN SUPPORT
  useEffect(() => {
    if (location.pathname.startsWith("/support")) {
      setSupportOpen(true);
    }
  }, [location.pathname]);

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    background: isActive ? "#E6F4EF" : "transparent",
    padding: "10px 12px",
    borderRadius: "8px",
    display: "block",
    transition: "all 0.2s ease"
  });

  return (
    <div className="h-screen overflow-hidden bg-[#F8FAF9]">

      {/* NAVBAR (FIXED) */}
      <div className="h-[70px] fixed top-0 left-0 right-0 z-50">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* BODY */}
      <div className="flex pt-[70px] h-full">

        {/* SIDEBAR (FIXED) */}
        {sidebarOpen && (
          <div className="w-[240px] fixed top-[70px] bottom-0 left-0 z-40">
            {/* pass role for future (important) */}
            <UserSidebar
              linkStyle={linkStyle}
              supportOpen={supportOpen}
              setSupportOpen={setSupportOpen}
              role={role}   
            />
          </div>
        )}

        {/* CONTENT SCROLL ONLY */}
        <div
          className={`flex-1 overflow-y-auto p-6 ${
            sidebarOpen ? "ml-[240px]" : ""
          }`}
        >
          {children}
        </div>

      </div>
    </div>
  );
}