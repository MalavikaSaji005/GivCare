import { ref, onValue, update } from "firebase/database";
import { db, auth } from "../firebase";
import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function DonationHistory({ donations, setDonations }) {

  const navigate = useNavigate();
  const [selectedDonation, setSelectedDonation] = useState(null);

  const handleConfirm = async (id) => {
    try {
      await update(ref(db, `donations/${id}`), {
        donorConfirmed: true
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    const user = auth.currentUser;

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
          .filter((donation) => donation.userId === user.uid);

        setDonations(donationList);

      } else {
        setDonations([]);
      }

    });

  }, [setDonations, navigate]);

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6 text-[#00563B]">
        Donation History
      </h1>

      {donations.length === 0 ? (
        <p className="text-gray-500">No donations yet.</p>
      ) : (

        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">

          {donations.map((donation) => (

            <div
              key={donation.id}
              className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition"
            >

              {/* LEFT */}
              <div className="flex items-center gap-4 w-full">

                <div className="w-12 h-12 bg-gray-200 rounded-md"></div>

                <div className="flex-1">
                  <p className="text-xs text-gray-400">
                    ID: {donation.id}
                  </p>

                  <h3 className="font-semibold text-lg">
                    {donation.itemName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {donation.institution}
                  </p>

                  <p className="text-sm text-gray-600">
                    Qty: {donation.quantity} |{" "}
                    {new Date(donation.date).toLocaleString("en-IN")}
                  </p>
                </div>

              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">

                {!donation.donorConfirmed && (
                  <>
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                      Pending
                    </span>

                    <button
                      onClick={() => handleConfirm(donation.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Confirm
                    </button>
                  </>
                )}

                {donation.donorConfirmed && !donation.institutionConfirmed && (
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                    Waiting for Institution
                  </span>
                )}

                {donation.institutionConfirmed && (
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    Completed
                  </span>
                )}

                <button
                  onClick={() => setSelectedDonation(donation)}
                  className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
                >
                  View
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* MODAL */}
      {selectedDonation && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-96">

            <h2 className="text-xl font-bold mb-4">
              Donation Details
            </h2>

            <p>ID: {selectedDonation.id}</p>
            <p><strong>Item:</strong> {selectedDonation.itemName}</p>
            <p><strong>Institution:</strong> {selectedDonation.institution}</p>
            <p><strong>Quantity:</strong> {selectedDonation.quantity}</p>

            <div className="mt-2">
              <strong>Status:</strong>{" "}

              {!selectedDonation.donorConfirmed && "Pending"}
              {selectedDonation.donorConfirmed && !selectedDonation.institutionConfirmed && "Waiting for Institution"}
              {selectedDonation.institutionConfirmed && "Completed"}

            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedDonation(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Close
              </button>
            </div>

          </div>

        </div>

      )}

    </DashboardLayout>

  );
}