import { ref, onValue, update } from "firebase/database";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export default function DonationHistory({ donations, setDonations }) {

    const [selectedDonation, setSelectedDonation] = useState(null);

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
            } else {
                setDonations([]);
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

                <div className="bg-white rounded-xl shadow-md p-6 space-y-4">

                    {donations.map((donation) => (

                        <div
                            key={donation.id}
                            className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition"
                        >

                            {/* LEFT SIDE */}
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
                                        Qty: {donation.quantity} | {donation.date}
                                    </p>

                                </div>

                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex items-center gap-3">

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

                                {donation.status === "Pending" && (
                                    <button
                                        onClick={() => {
                                            const donationRef = ref(db, `donations/${donation.id}`);

                                            update(donationRef, {
                                                status: "Confirmed"
                                            });
                                        }}
                                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                                    >
                                        Confirm
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
                                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                                    >
                                        Complete
                                    </button>
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

            {/* VIEW DETAILS MODAL */}

            {selectedDonation && (

                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

                    <div className="bg-white p-6 rounded-lg w-96">

                        <h2 className="text-xl font-bold mb-4">
                            Donation Details
                        </h2>

                        <p className="text-sm text-gray-500 mb-1">
                            ID: {selectedDonation.id}
                        </p>

                        <p><strong>Item:</strong> {selectedDonation.itemName}</p>
                        <p><strong>Institution:</strong> {selectedDonation.institution}</p>
                        <p><strong>Quantity:</strong> {selectedDonation.quantity}</p>
                        <p><strong>Date:</strong> {selectedDonation.date}</p>

                        <div className="mt-2">
                            <strong>Status:</strong>{" "}
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${selectedDonation.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : selectedDonation.status === "Confirmed"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-green-100 text-green-700"
                                    }`}
                            >
                                {selectedDonation.status}
                            </span>
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

        </div>
    );
}