import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";

export default function BrowseNeeds() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priority, setPriority] = useState("all");
  const [location, setLocation] = useState("all");

  const [selectedNeed, setSelectedNeed] = useState(null);
  const [donationQty, setDonationQty] = useState("");
  const [error, setError] = useState("");

  const [needs, setNeeds] = useState([
    {
      id: 1,
      institution: "Hope Old Age Home",
      itemName: "Rice",
      category: "Food",
      location: "Kochi",
      quantityRequired: 100,
      quantityFulfilled: 40,
      priority: "urgent"
    },
    {
      id: 2,
      institution: "Bright Orphanage",
      itemName: "School Kits",
      category: "Education",
      location: "Trivandrum",
      quantityRequired: 50,
      quantityFulfilled: 20,
      priority: "normal"
    }
  ]);

  // Filtering Logic
  const filteredNeeds = needs.filter((need) => {

    const matchesLocation =
      location === "all" ||
      need.location.toLowerCase() === location.toLowerCase();

    const matchesSearch =
      need.itemName.toLowerCase().includes(search.toLowerCase()) ||
      need.institution.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ||
      need.category.toLowerCase() === category.toLowerCase();

    const matchesPriority =
      priority === "all" ||
      need.priority === priority;

    return matchesSearch && matchesCategory && matchesPriority && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-6">
        Donate to a Need
      </h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search by item name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 border rounded-lg"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border rounded-lg"
          >
            <option value="all">All Categories</option>
            <option value="food">Food</option>
            <option value="education">Education</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-3 border rounded-lg"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="normal">Normal</option>
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-3 border rounded-lg"
          >
            <option value="all">All Locations</option>
            <option value="kochi">Kochi</option>
            <option value="trivandrum">Trivandrum</option>
          </select>

        </div>
      </div>

      {/* Need Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        {filteredNeeds.map((need) => {

          const remaining = need.quantityRequired - need.quantityFulfilled;
          const percentage = Math.round((need.quantityFulfilled / need.quantityRequired) * 100);
          const isClosed = need.quantityFulfilled >= need.quantityRequired;

          return (
            <div
              key={need.id}
              className="bg-white p-6 rounded-lg shadow-md border"
            >

              <p className="text-sm text-gray-500 mb-1">
                {need.institution}
              </p>

              <h2 className="text-xl font-semibold mb-2">
                {need.itemName}
              </h2>

              <p>Required: {need.quantityRequired}</p>
              <p>Fulfilled: {need.quantityFulfilled}</p>
              <p>Remaining: {remaining}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-300 h-4 rounded-full my-3">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Priority Badge */}
              <span
                className={`px-3 py-1 text-sm rounded-full ${isClosed
                    ? "bg-gray-200 text-gray-600"
                    : need.priority === "urgent"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
              >
                {isClosed
                  ? "✔ Fulfilled"
                  : need.priority === "urgent"
                    ? "🔴 Urgent"
                    : "🟢 Normal"}
              </span>

              {/* Donate Button */}
              <button
                disabled={isClosed}
                onClick={() => {
                  setSelectedNeed(need);
                  setDonationQty("");
                  setError("");
                }}
                className={`mt-4 w-full py-2 rounded-lg ${isClosed
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
              >
                {isClosed ? "Closed" : "Donate"}
              </button>

            </div>
          );
        })}

      </div>

      {/* Donation Modal */}
      {selectedNeed && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-96">

            <h2 className="text-xl font-bold mb-4">
              Donate to {selectedNeed.itemName}
            </h2>

            <p className="mb-2">
              Remaining: {selectedNeed.quantityRequired - selectedNeed.quantityFulfilled}
            </p>

            <input
              type="number"
              placeholder="Enter quantity"
              value={donationQty}
              onChange={(e) => setDonationQty(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            {error && (
              <p className="text-red-500 text-sm mb-2">{error}</p>
            )}

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setSelectedNeed(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {

                  const remaining =
                    selectedNeed.quantityRequired -
                    selectedNeed.quantityFulfilled;

                  if (donationQty <= 0) {
                    setError("Enter valid quantity");
                    return;
                  }

                  if (donationQty > remaining) {
                    setError("Cannot donate more than remaining quantity");
                    return;
                  }

                  // Update progress bar
                  const updatedNeeds = needs.map((n) => {
                    if (n.id === selectedNeed.id) {
                      return {
                        ...n,
                        quantityFulfilled:
                          n.quantityFulfilled + Number(donationQty)
                      };
                    }
                    return n;
                  });

                  setNeeds(updatedNeeds);

                  // Save donation to Firebase
                  const newDonation = {
                    institution: selectedNeed.institution,
                    itemName: selectedNeed.itemName,
                    quantity: Number(donationQty),
                    date: new Date().toLocaleString(),
                    status: "Pending"
                  };

                  push(ref(db, "donations"), newDonation);

                  setSelectedNeed(null);

                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Confirm
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}