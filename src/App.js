import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProfileSetup from "./pages/ProfileSetup";
import InstitutionProfile from "./pages/InstitutionProfile";
import BrowseNeeds from "./pages/BrowseNeeds";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import DonationHistory from "./pages/DonationHistory";
import UserHome from "./pages/UserHome";
import InstitutionHome from "./pages/InstitutionHome";

/* Support Hub */
import SupportDashboard from "./pages/support/SupportDashboard";
import RequestSupport from "./pages/support/RequestSupport";
import OfferSupport from "./pages/support/OfferSupport";
import MyActivity from "./pages/support/MyActivity";

// Wrapper
function ProfileSetupWrapper() {
  const location = useLocation();
  const role = location.state?.role || "donor";
  return <ProfileSetup role={role} />;
}

function App() {

  const [donations, setDonations] = useState([]);

  return (
    <>
      <Toaster position="top-right" />

      <Router>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Profile setup */}
          <Route
            path="/profile-setup"
            element={
              <ProtectedRoute>
                <ProfileSetupWrapper />
              </ProtectedRoute>
            }
          />

          {/* Institution public profile */}
          <Route
            path="/institution-profile/:institutionId"
            element={
              <ProtectedRoute>
                <InstitutionProfile />
              </ProtectedRoute>
            }
          />

          {/* USER HOME */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserHome />
              </ProtectedRoute>
            }
          />

          {/* INSTITUTION HOME */}
          <Route
            path="/institution"
            element={
              <ProtectedRoute>
                <InstitutionHome />
              </ProtectedRoute>
            }
          />

          {/* INSTITUTION DASHBOARD (ACTUAL WORK PAGE) */}
          <Route
            path="/institution/dashboard"
            element={
              <ProtectedRoute>
                <InstitutionDashboard />
              </ProtectedRoute>
            }
          />

          {/* BROWSE */}
          <Route
            path="/browse"
            element={
              <BrowseNeeds
                donations={donations}
                setDonations={setDonations}
              />
            }
          />

          {/* DONATION HISTORY */}
          <Route
            path="/donation-history"
            element={
              <ProtectedRoute>
                <DonationHistory
                  donations={donations}
                  setDonations={setDonations}
                />
              </ProtectedRoute>
            }
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* SUPPORT HUB */}
          <Route path="/support" element={<ProtectedRoute><SupportDashboard /></ProtectedRoute>} />
          <Route path="/support/request" element={<ProtectedRoute><RequestSupport /></ProtectedRoute>} />
          <Route path="/support/offer" element={<ProtectedRoute><OfferSupport /></ProtectedRoute>} />
          <Route path="/support/activity" element={<ProtectedRoute><MyActivity /></ProtectedRoute>} />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;