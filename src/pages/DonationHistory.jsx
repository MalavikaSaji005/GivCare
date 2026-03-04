import { ref, onValue, update } from "firebase/database";
import { db } from "../firebase";
import { useEffect } from "react";

export default function DonationHistory({ donations, setDonations }) {

    useEffect(() => {
        const donationRef = ref(db, "donations");

        onValue(donationRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const donationList = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key]
                }));

                setDonations(donationList);
            }
        });

    }, [setDonations]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold mb-6">
                Donation History
            </h1>

            {donations.length === 0 ? (
                <p className="text-gray-500">No donations yet.</p>
            ) : (
                <div className="space-y-4">

                    {donations.map((donation) => (
                        <div
                            key={donation.id}
                            className="bg-white p-4 rounded-lg shadow"
                        >

                            <p className="text-xs text-gray-400">
                                ID: {donation.id}
                            </p>

                            <p><strong>Item:</strong> {donation.itemName}</p>
                            <p><strong>Institution:</strong> {donation.institution}</p>
                            <p><strong>Quantity:</strong> {donation.quantity}</p>
                            <p><strong>Date:</strong> {donation.date}</p>

                            <div className="mt-2">
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${donation.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : donation.status === "Confirmed"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {donation.status}
                                </span>
                            </div>

                            {/* Status Control Buttons */}

                            {donation.status === "Pending" && (
                                <button
                                    onClick={() => {
                                        const donationRef = ref(db, `donations/${donation.id}`);

                                        update(donationRef, {
                                            status: "Confirmed"
                                        });
                                    }}
                                    className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
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
                                    className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm"
                                >
                                    Mark as Completed
                                </button>
                            )}

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}