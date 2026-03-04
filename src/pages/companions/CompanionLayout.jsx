import { Link, Outlet } from "react-router-dom";

function CompanionLayout() {
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
          <p><Link to="/companion/dashboard">Dashboard</Link></p>
          <p><Link to="/companion/new">New Request</Link></p>
          <p><Link to="/companion/active">Active Requests</Link></p>
          <p><Link to="/companion/history">History</Link></p>
          <p><Link to="/companion/volunteers">Volunteers</Link></p>
        </nav>

      </div>

      {/* Page Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </div>

    </div>
  );
}

export default CompanionLayout;