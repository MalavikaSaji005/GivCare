import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import BrowseNeeds from "./pages/BrowseNeeds";
import DonationHistory from "./pages/DonationHistory";
import { useState } from "react";
function App() {
  const [donations, setDonations] = useState([]);
  return (

    <Router>
      <Routes>
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
      </Routes>
    </Router>
  );
}

export default App;