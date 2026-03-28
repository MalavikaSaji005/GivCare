import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { db, auth } from "../../firebase";
import { ref, onValue } from "firebase/database";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function MyActivity() {

  const [value, setValue] = useState(new Date());
  const [myRequests, setMyRequests] = useState([]);
  const [selectedDayTasks, setSelectedDayTasks] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    const r = ref(db, "supportRequests");

    onValue(r, (snapshot) => {
      const data = snapshot.val() || {};

      const list = Object.entries(data)
        .map(([id, val]) => ({ id, ...val }))
        .filter(item => item.userId === user.uid);

      setMyRequests(list);
    });

  }, []);

  // 🔥 when date changes
  const handleDateChange = (date) => {
    setValue(date);

    const selected = myRequests.filter((req) => {
      const reqDate = new Date(req.createdAt).toDateString();
      return reqDate === date.toDateString();
    });

    setSelectedDayTasks(selected);
  };

  // 🔥 highlight days with activity
  const tileContent = ({ date }) => {
    const hasActivity = myRequests.some((req) => {
      const reqDate = new Date(req.createdAt).toDateString();
      return reqDate === date.toDateString();
    });

    return hasActivity ? (
      <div style={{
        height: "6px",
        width: "6px",
        background: "#00563B",
        borderRadius: "50%",
        margin: "auto",
        marginTop: "2px"
      }} />
    ) : null;
  };

  return (
    <DashboardLayout>

      <h2 style={{ marginBottom: "20px" }}>My Activity</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

        {/* 📅 Calendar */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
        }}>
          <Calendar
            onChange={handleDateChange}
            value={value}
            tileContent={tileContent}
          />
        </div>

        {/* 📋 Selected Day Tasks */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
        }}>
          <h3>📋 Tasks on {value.toDateString()}</h3>

          {selectedDayTasks.length === 0 ? (
            <p style={{ opacity: 0.6 }}>No activity on this day</p>
          ) : (
            selectedDayTasks.map((task) => (
              <div key={task.id} style={{ marginTop: "10px" }}>
                <p><b>{task.title}</b></p>
                <p>Status: {task.status}</p>
              </div>
            ))
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}