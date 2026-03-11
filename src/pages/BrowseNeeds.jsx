import { useState } from "react";
import { ref, push } from "firebase/database";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

export default function BrowseNeeds() {

  const navigate = useNavigate();

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
    },
    {
      id: 3,
      institution: "Grace Children Home",
      itemName: "Milk Packets",
      category: "Food",
      location: "Kollam",
      quantityRequired: 80,
      quantityFulfilled: 20,
      priority: "urgent"
    },
    {
      id: 4,
      institution: "Sunrise Elder Care",
      itemName: "Blankets",
      category: "Clothing",
      location: "Kochi",
      quantityRequired: 40,
      quantityFulfilled: 10,
      priority: "normal"
    }
  ]);

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

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPriority &&
      matchesLocation
    );
  });

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold text-[#00563B] mb-6">
        Donate to a Need
      </h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search item or institution..."
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
            <option value="clothing">Clothing</option>
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
            <option value="kollam">Kollam</option>
          </select>

        </div>
      </div>

      {/* Need Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {filteredNeeds.map((need) => {

          const remaining =
            need.quantityRequired - need.quantityFulfilled;

          const percentage = Math.round(
            (need.quantityFulfilled / need.quantityRequired) * 100
          );

          const isClosed =
            need.quantityFulfilled >= need.quantityRequired;

          return (
            <div
              key={need.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border"
            >

              <p className="text-sm text-gray-500">
                {need.institution}
              </p>

              <h2 className="text-xl font-semibold mb-3">
                {need.itemName}
              </h2>

              <p className="text-sm">Required: {need.quantityRequired}</p>
              <p className="text-sm">Fulfilled: {need.quantityFulfilled}</p>
              <p className="text-sm mb-2">Remaining: {remaining}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-3 rounded-full my-3">
                <div
                  className="bg-[#00563B] h-3 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Priority Badge */}
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  isClosed
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

                  const user = auth.currentUser;

                  if (!user) {
                    if (window.confirm("You must login to donate. Go to login page?")) {
                      navigate("/login");
                    }
                    return;
                  }

                  setSelectedNeed(need);
                  setDonationQty("");
                  setError("");

                }}
                className={`mt-4 w-full py-2 rounded-lg ${
                  isClosed
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#00563B] hover:bg-[#00442E] text-white"
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

          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

            <h2 className="text-xl font-bold text-[#00563B] mb-4">
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
              <p className="text-red-500 text-sm mb-2">
                {error}
              </p>
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

                  const user = auth.currentUser;

                  const newDonation = {
                    userId: user.uid,
                    institution: selectedNeed.institution,
                    itemName: selectedNeed.itemName,
                    quantity: Number(donationQty),
                    date: new Date().toLocaleString(),
                    status: "Pending"
                  };

                  push(ref(db, "donations"), newDonation);

                  setSelectedNeed(null);

                  navigate("/donation-history");

                }}
                className="px-4 py-2 bg-[#00563B] text-white rounded"
              >
                Confirm
              </button>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}