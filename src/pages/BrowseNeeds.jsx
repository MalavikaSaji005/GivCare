import { useState, useEffect } from "react";
import { ref, push, onValue, update } from "firebase/database";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import toast from "react-hot-toast";

export default function BrowseNeeds() {

  const navigate = useNavigate();

  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priority, setPriority] = useState("all");
  const [location, setLocation] = useState("all");

  const [selectedNeed, setSelectedNeed] = useState(null);
  const [donationQty, setDonationQty] = useState("");
  const [error, setError] = useState("");

  // 🔥 HANDLE DONATE CLICK (LOGIN CHECK)
  const handleDonateClick = (need) => {
    const user = auth.currentUser;

    if (!user) {
      toast.error("Please login to donate");
      navigate("/login");
      return;
    }

    setSelectedNeed(need);
    setDonationQty("");
    setError("");
  };

  // Fetch needs
  useEffect(() => {

    const needsRef = ref(db, "needs");

    onValue(needsRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        const needsList = Object.keys(data).map((key) => {

          const need = data[key];

          return {
            id: key,
            itemName: need.item,
            quantityRequired: parseInt(need.qty),
            quantityFulfilled: parseInt(need.donated || 0),
            institution: need.institutionName || "Institution",
            priority: need.priority ? need.priority.toLowerCase() : "normal",
            location: "kochi",
            category: "food"
          };

        });

        setNeeds(needsList);

      } else {
        setNeeds([]);
      }

    });

  }, []);

  // Filter
  const filteredNeeds = needs.filter((need) => {

    const matchesLocation =
      location === "all" || need.location.toLowerCase() === location;

    const matchesSearch =
      need.itemName.toLowerCase().includes(search.toLowerCase()) ||
      need.institution.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || need.category === category;

    const matchesPriority =
      priority === "all" || need.priority === priority;

    return matchesSearch && matchesCategory && matchesPriority && matchesLocation;

  });

  // Sort urgent first
  filteredNeeds.sort((a, b) => {
    if (a.priority === "urgent" && b.priority !== "urgent") return -1;
    if (a.priority !== "urgent" && b.priority === "urgent") return 1;
    return 0;
  });

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold text-[#00563B] mb-6">
        Donate to a Need
      </h1>

      {/* FILTERS */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-3 border rounded-lg"
          >
            <option value="all">All Locations</option>
            <option value="kochi">Kochi</option>
            <option value="trivandrum">Trivandrum</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-3 border rounded-lg"
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

          const remaining = need.quantityRequired - need.quantityFulfilled;

          const percentage = Math.round(
            (need.quantityFulfilled / need.quantityRequired) * 100
          );

          const isClosed = remaining <= 0;

          return (

            <div
              key={need.id}
              className={`flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition
              ${need.priority === "urgent" ? "border-red-400 bg-red-50" : ""}`}
            >

              <div className="flex-1">

                <h3 className="font-semibold text-lg">
                  {need.itemName}
                </h3>

                <p className="text-sm text-gray-500">
                  {need.institution}
                </p>

                <p className="text-sm">
                  Required: {need.quantityRequired}
                </p>

                <p className="text-sm">
                  Fulfilled: {need.quantityFulfilled}
                </p>

                <p className="text-sm">
                  Remaining: {remaining}
                </p>

                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

              </div>

              <button
                disabled={isClosed}
                onClick={() => handleDonateClick(need)}
                className={`px-4 py-2 rounded text-white
                ${isClosed ? "bg-gray-400" : "bg-[#00563B] hover:bg-[#00442E]"}`}
              >
                {isClosed ? "Closed" : "Donate"}
              </button>

            </div>

          );

        })}

      </div>

      {/* MODAL */}
      {selectedNeed && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-96">

            <h2 className="text-xl font-bold mb-4">
              Donate to {selectedNeed.itemName}
            </h2>

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

                  const user = auth.currentUser;

                  if (!user) {
                    toast.error("Session expired. Please login again.");
                    navigate("/login");
                    setLoading(false);
                    return;
                  }

                  const remaining =
                    selectedNeed.quantityRequired - selectedNeed.quantityFulfilled;

                  if (donationQty <= 0) {
                    toast.error("Enter valid quantity");
                    setLoading(false);
                    return;
                  }

                  if (donationQty > remaining) {
                    toast.error("Cannot exceed remaining quantity");
                    setLoading(false);
                    return;
                  }

                  const newDonation = {
                    userId: user.uid,
                    institution: selectedNeed.institution,
                    itemName: selectedNeed.itemName,
                    quantity: Number(donationQty),
                    date: new Date().toLocaleString(),
                    status: "Pending"
                  };

                  await push(ref(db, "donations"), newDonation);

                  await update(ref(db, `needs/${selectedNeed.id}`), {
                    donated: selectedNeed.quantityFulfilled + Number(donationQty)
                  });

                  toast.success("Donation submitted successfully!");

                  setSelectedNeed(null);
                  setLoading(false);

                  navigate("/donation-history");

                }}
                className="px-4 py-2 bg-[#00563B] text-white rounded"
              >
                {loading ? "Processing..." : "Confirm"}
              </button>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>

  );
}