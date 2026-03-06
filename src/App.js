import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

/* Main Pages */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrowseNeeds from "./pages/BrowseNeeds";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import DonationHistory from "./pages/DonationHistory";

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
    <Router>
      <Toaster position="top-right" />

      <Routes>

        {/* MAIN PAGES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/institution" element={<InstitutionDashboard />} />

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
            <DonationHistory
              donations={donations}
              setDonations={setDonations}
            />
          }
        />

        {/* VOLUNTEER MODULE */}
        <Route path="/volunteer" element={<VolunteerLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<VolunteerDashboard />} />
          <Route path="register" element={<VolunteerRegister />} />
          <Route path="tasks" element={<VolunteerTasks />} />
          <Route path="mytasks" element={<VolunteerMyTasks />} />
          <Route path="schedule" element={<VolunteerSchedule />} />
        </Route>

        {/* COMPANION MODULE */}
        <Route path="/companion" element={<CompanionLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<CompanionDashboard />} />
          <Route path="new" element={<NewRequest />} />
          <Route path="active" element={<ActiveRequests />} />
          <Route path="history" element={<CompanionHistory />} />
          <Route path="volunteers" element={<CompanionVolunteers />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;