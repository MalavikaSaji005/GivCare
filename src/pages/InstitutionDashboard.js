import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { ref, push, onValue, remove, update } from "firebase/database";
import DashboardLayout from "../components/DashboardLayout";

const InstitutionDashboard = () => {
  const [needs, setNeeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    item: '',
    qty: '',
    priority: 'Normal',
    expiry: '',
    status: 'Pending'
  });

  useEffect(() => {
    const needsRef = ref(db, 'needs');
    onValue(needsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setNeeds(list.reverse());
      } else {
        setNeeds([]);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await update(ref(db, `needs/${editId}`), formData);
        alert("Updated successfully!");
      } else {
        await push(ref(db, 'needs'), {
          ...formData,
          institutionName: "Hope Old Age Home",
          donated: "0",
          createdAt: new Date().toISOString()
        });
        alert("Posted successfully!");
      }
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await remove(ref(db, `needs/${id}`));
    }
  };

  const openEditModal = (need) => {
    setEditId(need.id);
    setFormData({
      item: need.item,
      qty: need.qty,
      priority: need.priority || 'Normal',
      expiry: need.expiry || '',
      status: need.status || 'Pending'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ item: '', qty: '', priority: 'Normal', expiry: '', status: 'Pending' });
  };

  const filteredNeeds = needs.filter(need => 
    need.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#00563B]">
            Institution Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track community needs.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#00563B] hover:bg-[#00442E] text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Post New Need
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Funding Needs</p>
          <h2 className="text-3xl font-bold text-[#00563B] mt-2">12</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Donations</p>
          <h2 className="text-3xl font-bold text-[#00563B] mt-2">28</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Volunteers</p>
          <h2 className="text-3xl font-bold text-[#00563B] mt-2">05</h2>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border p-5">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#00563B]">
            Current Needs
          </h2>

          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded-lg text-sm outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">

              <tr>
                <th className="p-3">Item</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Expiry</th>
                <th className="p-3">Donated</th>
                <th className="p-3">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredNeeds.map((need) => (

                <tr key={need.id} className="border-t hover:bg-gray-50">

                  <td className="p-3 font-medium">{need.item}</td>
                  <td className="p-3">{need.qty}</td>

                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      need.priority === 'Urgent'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {need.priority}
                    </span>
                  </td>

                  <td className="p-3">{need.expiry}</td>
                  <td className="p-3">{need.donated || "0"}</td>

                  <td className="p-3 flex gap-3">
                    <button onClick={() => openEditModal(need)} className="text-[#00563B] font-semibold text-sm">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(need.id)} className="text-red-500 font-semibold text-sm">
                      Delete
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

            <h2 className="text-xl font-bold text-[#00563B] mb-4">
              {editId ? "Edit Need" : "Post New Need"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Item Name"
                className="w-full p-3 border rounded-xl"
                value={formData.item}
                onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                required
              />

              <input
                type="text"
                placeholder="Quantity"
                className="w-full p-3 border rounded-xl"
                value={formData.qty}
                onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
                required
              />

              <select
                className="w-full p-3 border rounded-xl"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>

              <input
                type="date"
                className="w-full p-3 border rounded-xl"
                value={formData.expiry}
                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                required
              />

              <div className="flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 py-3 bg-gray-200 rounded-xl">
                  Cancel
                </button>

                <button type="submit" className="flex-1 py-3 bg-[#00563B] text-white rounded-xl">
                  Post
                </button>
              </div>

            </form>

          </div>

        </div>
      )}

    </DashboardLayout>
  );
};

export default InstitutionDashboard;