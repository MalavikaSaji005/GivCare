import { ref, onValue, update } from "firebase/database";
import { db, auth } from "../firebase";
import { useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function DonationHistory({ donations, setDonations }) {

  const navigate = useNavigate();

  useEffect(() => {

    const user = auth.currentUser;

    // If not logged in, redirect
    if (!user) {
      navigate("/login");
      return;
    }

    const donationRef = ref(db, "donations");

    onValue(donationRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        const donationList = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key]
          }))
          // ⭐ Show only this user's donations
          .filter((donation) => donation.userId === user.uid);

        setDonations(donationList);

      } else {
        setDonations([]);
      }

    });

  }, [setDonations, navigate]);

  return (

    <DashboardLayout>

      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#00563B",
          marginBottom: "25px"
        }}
      >
        Donation History
      </h1>

      {donations.length === 0 ? (
        <p style={{ color: "#666" }}>No donations yet.</p>
      ) : (
        <div className="space-y-4">

          {donations.map((donation) => (

            <div
              key={donation.id}
              className="bg-white p-5 rounded-lg shadow"
            >

              <p className="text-xs text-gray-400 mb-1">
                ID: {donation.id}
              </p>

              <p><strong>Item:</strong> {donation.itemName}</p>
              <p><strong>Institution:</strong> {donation.institution}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <p><strong>Date:</strong> {donation.date}</p>

              <div className="mt-2">
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    donation.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : donation.status === "Confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {donation.status}
                </span>
              </div>

              {/* Status Buttons */}

              {donation.status === "Pending" && (
                <button
                  onClick={() => {
                    const donationRef = ref(db, `donations/${donation.id}`);

                    update(donationRef, {
                      status: "Confirmed"
                    });
                  }}
                  className="mt-3 px-4 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  Mark as Confirmed
                </button>
              )}

              {donation.status === "Confirmed" && (
                <button
                  onClick={() => {
                    const donationRef = ref(db, `donations/${donation.id}`);

                    update(donationRef, {
                      status: "Completed"
                    });
                  }}
                  className="mt-3 px-4 py-1 bg-green-600 text-white rounded text-sm"
                >
                  Mark as Completed
                </button>
              )}

            </div>

          ))}

        </div>
      )}

    </DashboardLayout>

  );
}