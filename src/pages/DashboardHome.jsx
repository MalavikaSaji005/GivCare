import DashboardLayout from "../components/DashboardLayout";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

import {
  HeartHandshake,
  ClipboardList,
  Users,
  UserCheck,
  Heart,
  HelpCircle,
  Banknote,
  CheckCircle
} from "lucide-react";

export default function DashboardHome() {

  const [needs, setNeeds] = useState([]);
  const [supportRequests, setSupportRequests] = useState([]);

  useEffect(() => {
    const needsRef = ref(db, "needs");

    onValue(needsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setNeeds(list.reverse());
      } else {
        setNeeds([]);
      }
    });
  }, []);

  useEffect(() => {
    const refReq = ref(db, "supportRequests");

    onValue(refReq, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setSupportRequests(list.reverse());
      } else {
        setSupportRequests([]);
      }
    });
  }, []);

  return (
    <DashboardLayout>

      <div className="bg-[#F8FAF9] min-h-screen p-6 space-y-14">

        {/* HERO */}
        <div className="bg-[#EEF2F1] rounded-3xl px-10 py-12 flex justify-between items-center">

          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-tight">
              Make a <span className="text-primary">Difference</span><br />
              Today
            </h1>

            <p className="text-gray-600 mt-4">
              Join a global community of donors, volunteers, and companions dedicated to helping those in need. Every small action creates a ripple of hope.
            </p>

            <Link to="/browse">
              <button className="mt-6 bg-primary text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition">
                Explore Needs
              </button>
            </Link>
          </div>

          <div className="bg-white w-72 h-48 rounded-2xl flex items-center justify-center shadow-lg">
            <img src={logo} className="w-36" alt="logo"/>
          </div>

        </div>

        {/* STATS */}
        <div className="flex justify-between items-center">

          <div className="flex gap-10">
            <Stat icon={<HeartHandshake size={26} />} label="Total Donations" value="$124k" />
            <Stat icon={<ClipboardList size={26} />} label="Active Requests" value="156" />
            <Stat icon={<Users size={26} />} label="Volunteers" value="2.4k" />
            <Stat icon={<UserCheck size={26} />} label="People Helped" value="5k+" />
          </div>

          <div className="flex flex-col gap-5 ml-10">

            <button className="bg-[#F59E0B] text-white px-12 py-3 rounded-xl flex items-center gap-2 shadow-md hover:opacity-90 transition">
              <Heart size={18}/> Donate Now
            </button>

            <button className="bg-[#475569] text-white px-12 py-3 rounded-xl flex items-center gap-2 shadow-md hover:opacity-90 transition">
              <HelpCircle size={18}/> Request Help
            </button>

          </div>

        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-20">

          {/* LEFT */}
          <div className="space-y-14">

            {/* RECENT NEEDS */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Recent Needs
                </h2>

                <Link to="/browse">
                  <span className="group text-green-700 text-sm flex items-center gap-1 cursor-pointer hover:translate-x-1 transition">
                    View All Needs
                    <span className="text-lg group-hover:translate-x-1 transition">
                      ›
                    </span>
                  </span>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {needs.slice(0, 2).map((n) => {
                  const required = parseInt(n.qty || 0);
                  const fulfilled = parseInt(n.donated || 0);
                  const percent = required ? (fulfilled / required) * 100 : 0;

                  return (
                    <div
                      key={n.id}
                      className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition"
                    >
                      <h3 className="font-semibold text-lg">{n.item}</h3>

                      <p className="text-sm text-gray-500">
                        {n.institutionName}
                      </p>

                      <div className="mt-3">
                        <div className="bg-gray-200 h-2 rounded-full">
                          <div
                            className="bg-green-700 h-2 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <p className="text-xs mt-1 text-gray-500">
                          {Math.round(percent)}% fulfilled
                        </p>
                      </div>

                      <button className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg hover:opacity-90 transition">
                        Help Now
                      </button>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* SUPPORT REQUESTS */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Support Requests
                </h2>

                <Link to="/support">
                  <span className="group text-green-700 text-sm flex items-center gap-1 cursor-pointer hover:translate-x-1 transition">
                    View More
                    <span className="text-lg group-hover:translate-x-1 transition">
                      ›
                    </span>
                  </span>
                </Link>
              </div>

              <div className="space-y-4">

                {supportRequests.slice(0, 2).map((req) => (
                  <div
                    key={req.id}
                    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="font-medium text-lg">{req.title}</h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {req.description}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      {req.location}
                    </p>
                  </div>
                ))}

              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="lg:ml-6">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">
              Community Pulse
            </h2>

            <div className="bg-[#EEF2F1] p-4 rounded-2xl space-y-4">

              <PulseItem
                icon={<Banknote size={16} className="text-green-700"/>}
                bg="bg-green-100"
                title="Anonymous donated ₹500"
                subtitle="to Educational Supplies Fund"
                time="2 minutes ago"
              />

              <PulseItem
                icon={<Users size={16} className="text-yellow-600"/>}
                bg="bg-yellow-100"
                title="Sarah joined"
                subtitle="as a Volunteer Companion"
                time="10 minutes ago"
              />

              <PulseItem
                icon={<CheckCircle size={16} className="text-blue-600"/>}
                bg="bg-blue-100"
                title="Need Fulfilled"
                subtitle="Home Repair for David is complete"
                time="1 hour ago"
              />

            </div>
          </div>

        </div>

        {/* FLOAT BUTTON */}
        <button className="fixed bottom-6 right-6 bg-green-700 text-white w-14 h-14 rounded-full text-2xl shadow-lg hover:scale-105 transition">
          +
        </button>

      </div>
    </DashboardLayout>
  );
}

/* STAT */
function Stat({ icon, label, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl w-[190px] shadow-md flex flex-col items-center text-center">
      <div className="text-primary mb-3">{icon}</div>
      <h2 className="text-xl font-bold">{value}</h2>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

/* COMMUNITY ITEM */
function PulseItem({ icon, bg, title, subtitle, time }) {
  return (
    <div className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm">
      <div className={`${bg} p-2 rounded-full`}>
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}