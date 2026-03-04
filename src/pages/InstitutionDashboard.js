import React, { useState } from 'react';

const InstitutionDashboard = () => {
  // 1. State to control the Pop-up (Modal)
  const [showModal, setShowModal] = useState(false);

  // 2. State for the Form Inputs
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");

  // 3. State for the list of Needs (starts with your sample data)
  const [needs, setNeeds] = useState([
    { id: 1, item: "Rice", qty: "50kg", status: "Pending", color: "text-orange-500" },
    { id: 2, item: "Medicine", qty: "30", status: "Fulfilled", color: "text-green-500" },
    { id: 3, item: "Blankets", qty: "10", status: "Update", color: "text-blue-500" },
  ]);

  // 4. Function to handle saving the new need
  const handleSaveNeed = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      item: item,
      qty: qty,
      status: "Pending",
      color: "text-orange-500"
    };
    setNeeds([newEntry, ...needs]); // Adds new need to the top of the list
    setShowModal(false); // Closes the pop-up
    setItem(""); // Clears input
    setQty("");  // Clears input
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans relative">

      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 text-2xl font-bold text-blue-600">GivCare</div>
        <nav className="flex-1 px-4 space-y-2 text-gray-600">
          <div className="flex items-center p-3 bg-blue-50 text-blue-600 rounded-lg font-medium cursor-pointer">
            <span className="mr-3">📊</span> Dashboard
          </div>
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"><span className="mr-3">👤</span> Profile</div>
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"><span className="mr-3">✉️</span> Post Needs</div>
        </nav>
        <div className="p-6 text-red-500 font-medium cursor-pointer border-t"><span>🚪</span> Logout</div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Institution Dashboard</h1>
          <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white shadow-sm"></div>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-sm font-semibold">Pending Needs</p>
            <p className="text-3xl font-bold text-blue-600">{needs.filter(n => n.status === "Pending").length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-sm font-semibold">Fulfilled</p>
            <p className="text-3xl font-bold text-green-600">28</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-sm font-semibold">Volunteers</p>
            <p className="text-3xl font-bold text-purple-600">05</p>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Current Needs</h2>
            {/* CLICKING THIS NOW OPENS THE MODAL */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md"
            >
              + Post New
            </button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Item</th>
                <th className="px-6 py-4 font-semibold">Qty</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {needs.map((need) => (
                <tr key={need.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-800 font-medium">{need.item}</td>
                  <td className="px-6 py-4 text-gray-600">{need.qty}</td>
                  <td className={`px-6 py-4 font-bold ${need.color}`}>{need.status}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-blue-600 hover:underline text-sm font-bold">Donate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- POST NEED MODAL (The Pop-up Form) --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a New Need</h2>
            <form onSubmit={handleSaveNeed} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Item Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Rice, Medicine"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Quantity</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. 50kg, 20 packs"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  required
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg"
                >
                  Post Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionDashboard;