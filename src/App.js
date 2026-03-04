import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* Main Pages */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import BrowseNeeds from "./pages/BrowseNeeds";

/* Volunteer Module */
import VolunteerLayout from "./pages/volunteer/VolunteerLayout";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import VolunteerRegister from "./pages/volunteer/VolunteerRegister";
import VolunteerTasks from "./pages/volunteer/VolunteerTasks";
import VolunteerMyTasks from "./pages/volunteer/VolunteerMyTasks";
import VolunteerSchedule from "./pages/volunteer/VolunteerSchedule";

/* Care Companion Module */
import CompanionLayout from "./pages/companions/CompanionLayout";
import CompanionDashboard from "./pages/companions/CompanionDashboard";
import NewRequest from "./pages/companions/NewRequest";
import ActiveRequests from "./pages/companions/ActiveRequests";
import CompanionHistory from "./pages/companions/CompanionHistory";
import CompanionVolunteers from "./pages/companions/CompanionVolunteers";

function App() {
  return (
    <Router>
      <Routes>

        {/* Main Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/institution" element={<InstitutionDashboard />} />
        <Route path="/browse" element={<BrowseNeeds />} />

        {/* Volunteer Module */}
        <Route path="/volunteer" element={<VolunteerLayout />}>

          <Route index element={<Navigate to="dashboard" />} />

          <Route path="dashboard" element={<VolunteerDashboard />} />
          <Route path="register" element={<VolunteerRegister />} />
          <Route path="tasks" element={<VolunteerTasks />} />
          <Route path="mytasks" element={<VolunteerMyTasks />} />
          <Route path="schedule" element={<VolunteerSchedule />} />

        </Route>

        {/* Care Companion Module */}
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