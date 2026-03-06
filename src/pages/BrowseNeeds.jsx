import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function BrowseNeeds({ donations, setDonations }) {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  filteredNeeds.sort((a, b) => {
    if (a.priority === "urgent" && b.priority !== "urgent") return -1;
    if (a.priority !== "urgent" && b.priority === "urgent") return 1;
    return 0;
  });
  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}

      <div className="w-64 bg-white shadow-md p-6">

        <h2 className="text-xl font-bold mb-6">GivCare</h2>

        <ul className="space-y-4 text-gray-600">

          <li className="cursor-pointer">Dashboard</li>

          <li className="bg-blue-100 text-blue-600 px-3 py-2 rounded">
            Browse Needs
          </li>

          <li className="cursor-pointer">My Donations</li>

          <li className="cursor-pointer">History</li>

          <li className="cursor-pointer">Payment</li>

        </ul>

      </div>


      {/* MAIN CONTENT */}

      <div className="flex-1 p-8">

        <h1 className="text-2xl font-bold mb-6">
          Donate to a Need
        </h1>


        {/* FILTERS */}

        <div className="bg-white p-4 rounded-xl shadow-md mb-6">

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Search / Filters"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 p-2 border rounded"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="all">Category</option>
              <option value="food">Food</option>
              <option value="education">Education</option>
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="all">Location</option>
              <option value="kochi">Kochi</option>
              <option value="trivandrum">Trivandrum</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="all">Priority</option>
              <option value="urgent">Urgent</option>
              <option value="normal">Normal</option>
            </select>

          </div>

        </div>


        {/* NEED LIST */}

        <div className="bg-white rounded-xl shadow-md p-5 space-y-4">

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
                className={`flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition
${need.priority === "urgent" ? "border-red-400 bg-red-50" : ""}
`}
              >

                {/* LEFT SIDE */}

                <div className="flex items-center gap-4 w-full">

                  <div className="w-12 h-12 bg-gray-200 rounded-md"></div>

                  <div className="flex-1">

                    <h3 className="font-semibold">
                      {need.itemName} - Qty: {need.quantityRequired}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {need.institution}
                    </p>
                    <p className="text-sm text-gray-600">
                      Required: {need.quantityRequired}
                    </p>

                    <p className="text-sm text-gray-600">
                      Fulfilled: {need.quantityFulfilled}
                    </p>

                    <p className="text-sm text-gray-600">
                      Remaining: {remaining}
                    </p>

                    {/* PROGRESS BAR */}

                    <div className="w-full bg-gray-200 h-2 rounded mt-2">

                      <div
                        className="bg-green-500 h-2 rounded"
                        style={{ width: `${percentage}%` }}
                      ></div>

                    </div>

                  </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="flex items-center gap-3">

                  <button
                    disabled={isClosed}
                    onClick={() => {
                      setSelectedNeed(need);
                      setDonationQty("");
                      setError("");
                    }}
                    className={`px-4 py-1 rounded text-white text-sm
${isClosed
                        ? "bg-gray-400"
                        : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                    {isClosed ? "Closed" : "Donate"}
                  </button>

                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    📍
                  </div>

                </div>

              </div>

            );

          })}

        </div>


        {/* DONATION MODAL */}

        {selectedNeed && (

          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

            <div className="bg-white p-6 rounded-lg w-96">

              <h2 className="text-xl font-bold mb-4">
                Donate to {selectedNeed.itemName}
              </h2>

              <p className="mb-2">
                Remaining:
                {selectedNeed.quantityRequired - selectedNeed.quantityFulfilled}
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
                  disabled={loading}

                  onClick={async () => {

                    if (loading) return;

                    setLoading(true);

                    const remaining =
                      selectedNeed.quantityRequired -
                      selectedNeed.quantityFulfilled;

                    if (donationQty <= 0) {
                      toast.error("Enter a valid quantity");
                      return;
                    }

                    if (donationQty > remaining) {
                      toast.error("Cannot donate more than remaining quantity");
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

                    const newDonation = {
                      institution: selectedNeed.institution,
                      itemName: selectedNeed.itemName,
                      quantity: Number(donationQty),
                      date: new Date().toLocaleString(),
                      status: "Pending"
                    };

                    push(ref(db, "donations"), newDonation);

                    toast.success("Donation submitted successfully!");

                    setSelectedNeed(null);
                    setLoading(false);
                    navigate("/donation-history");

                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {loading ? "Processing..." : "Confirm"}
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}