import { Link, Outlet } from "react-router-dom";

function VolunteerLayout() {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#f4f6fb",
        padding: "20px"
      }}>
        <h3>GivCare</h3>

        <nav style={{ marginTop: "30px" }}>
          <p><Link to="/volunteer/dashboard">Dashboard</Link></p>
          <p><Link to="/volunteer/register">Register</Link></p>
          <p><Link to="/volunteer/tasks">Available Tasks</Link></p>
          <p><Link to="/volunteer/mytasks">My Tasks</Link></p>
          <p><Link to="/volunteer/schedule">Schedule</Link></p>
        </nav>
      </div>

      {/* Page Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </div>

    </div>
  );
}

export default VolunteerLayout;