import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { ref, push, onValue, remove, update } from "firebase/database";

const InstitutionDashboard = () => {
  const [needs, setNeeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null); // Track which item we are editing
  
  const [formData, setFormData] = useState({
    item: '',
    qty: '',
    priority: 'Normal',
    expiry: '',
    status: 'Pending'
  });

  // Fetch Data
  useEffect(() => {
    const needsRef = ref(db, 'needs');
    onValue(needsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const today = new Date().toISOString().split('T')[0];
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setNeeds(list.reverse());
      } else {
        setNeeds([]);
      }
    });
  }, []);

  // Handle Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // UPDATE EXISTING POST
        const itemRef = ref(db, `needs/${editId}`);
        await update(itemRef, formData);
        alert("Updated successfully!");
      } else {
        // CREATE NEW POST
        const needsRef = ref(db, 'needs');
        await push(needsRef, {
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

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await remove(ref(db, `needs/${id}`));
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  // Open Modal for Edit
  const openEditModal = (need) => {
    setEditId(need.id);
    setFormData({
      item: need.item,
      qty: need.qty,
      priority: need.priority,
      expiry: need.expiry,
      status: need.status
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
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <div className="flex-1 p-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Institution Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage and track community needs.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all">+ Post New Need</button>
        </div>

        {/* METRICS (Same as before) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 uppercase">Funding Needs</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">12</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 uppercase">Donations</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">28</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-500 uppercase">Volunteers</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">05</h3>
            </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-gray-800">Current Needs</h2>
            <input 
                type="text" 
                placeholder="Search..." 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none w-full md:w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase font-bold tracking-wider">
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Qty</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Expiry</th>
                  <th className="px-6 py-4">Donated</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredNeeds.map((need) => (
                  <tr key={need.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">{need.item}</td>
                    <td className="px-6 py-4 text-gray-600">{need.qty}</td>
                    <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${need.priority === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{need.priority}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{need.expiry}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{need.donated || "0"}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button onClick={() => openEditModal(need)} className="text-blue-600 hover:text-blue-800 font-bold text-sm">Edit</button>
                      <button onClick={() => handleDelete(need.id)} className="text-red-500 hover:text-red-700 font-bold text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL (Handles both Add and Edit) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{editId ? "Edit Post" : "Post New Need"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Item Name" value={formData.item} className="w-full p-3 bg-gray-50 border rounded-xl outline-none" required
                onChange={(e) => setFormData({...formData, item: e.target.value})} />
              <input type="text" placeholder="Quantity" value={formData.qty} className="w-full p-3 bg-gray-50 border rounded-xl outline-none" required
                onChange={(e) => setFormData({...formData, qty: e.target.value})} />
              <select value={formData.priority} className="w-full p-3 bg-gray-50 border rounded-xl outline-none"
                onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                <option value="Normal">Normal Priority</option>
                <option value="Urgent">Urgent Priority</option>
              </select>
              <input type="date" value={formData.expiry} className="w-full p-3 bg-gray-50 border rounded-xl outline-none" required
                onChange={(e) => setFormData({...formData, expiry: e.target.value})} />
              
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg">
                  {editId ? "Save Changes" : "Post Now"}
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