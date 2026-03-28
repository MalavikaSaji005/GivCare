import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BrowseNeeds from "./pages/BrowseNeeds";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import DonationHistory from "./pages/DonationHistory";
import DashboardHome from "./pages/DashboardHome";

/* Support Hub */
import SupportDashboard from "./pages/support/SupportDashboard";
import RequestSupport from "./pages/support/RequestSupport";
import OfferSupport from "./pages/support/OfferSupport";
import MyActivity from "./pages/support/MyActivity";

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

          {/* PROTECTED */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/browse"
            element={
              <BrowseNeeds
                donations={donations}
                setDonations={setDonations}
              />
            }
          />

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

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/institution"
            element={
              <ProtectedRoute>
                <InstitutionDashboard />
              </ProtectedRoute>
            }
          />

          {/* SUPPORT HUB */}

          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <SupportDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/support/request"
            element={
              <ProtectedRoute>
                <RequestSupport />
              </ProtectedRoute>
            }
          />

          <Route
            path="/support/offer"
            element={
              <ProtectedRoute>
                <OfferSupport />
              </ProtectedRoute>
            }
          />

          <Route
            path="/support/activity"
            element={
              <ProtectedRoute>
                <MyActivity />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;