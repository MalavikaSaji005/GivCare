import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import BrowseNeeds from "./pages/BrowseNeeds";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/institution" element={<InstitutionDashboard />} />
        <Route path="/browse" element={<BrowseNeeds />} />
      </Routes>
    </Router>
  );
}

export default App;