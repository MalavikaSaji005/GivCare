import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

/* Main Pages */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrowseNeeds from "./pages/BrowseNeeds";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import DonationHistory from "./pages/DonationHistory";
import DashboardHome from "./pages/DashboardHome";

/* Volunteer Module */
import VolunteerLayout from "./pages/volunteer/VolunteerLayout";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import VolunteerRegister from "./pages/volunteer/VolunteerRegister";
import VolunteerTasks from "./pages/volunteer/VolunteerTasks";
import VolunteerMyTasks from "./pages/volunteer/VolunteerMyTasks";
import VolunteerSchedule from "./pages/volunteer/VolunteerSchedule";

/* Companion Module */
import CompanionLayout from "./pages/companions/CompanionLayout";
import CompanionDashboard from "./pages/companions/CompanionDashboard";
import NewRequest from "./pages/companions/NewRequest";
import ActiveRequests from "./pages/companions/ActiveRequests";
import CompanionHistory from "./pages/companions/CompanionHistory";
import CompanionVolunteers from "./pages/companions/CompanionVolunteers";

function App() {

  const [donations, setDonations] = useState([]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#333",
            borderRadius: "8px",
            padding: "10px 14px"
          }
        }}
      />

      <Router>

        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardHome />
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

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
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

          {/* VOLUNTEER */}
          <Route
            path="/volunteer"
            element={
              <ProtectedRoute>
                <VolunteerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<VolunteerDashboard />} />
            <Route path="register" element={<VolunteerRegister />} />
            <Route path="tasks" element={<VolunteerTasks />} />
            <Route path="mytasks" element={<VolunteerMyTasks />} />
            <Route path="schedule" element={<VolunteerSchedule />} />
          </Route>

          {/* COMPANION */}
          <Route
            path="/companion"
            element={
              <ProtectedRoute>
                <CompanionLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<CompanionDashboard />} />
            <Route path="new" element={<NewRequest />} />
            <Route path="active" element={<ActiveRequests />} />
            <Route path="history" element={<CompanionHistory />} />
            <Route path="volunteers" element={<CompanionVolunteers />} />
          </Route>

        </Routes>

      </Router>
    </>
  );
}

export default App;