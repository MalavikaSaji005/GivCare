import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { ref, push, onValue, remove, update } from "firebase/database";

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

  // Load data from Firebase
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
    <div className="flex min-h-screen bg-gray-100 font-sans">
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
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Institution Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage and track community needs.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md">+ Post New Need</button>
        </div>

        {/* METRICS */}
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
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Current Needs</h2>
            <input 
              type="text" 
              placeholder="Search..." 
              className="p-2 border rounded-lg text-sm outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
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
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${need.priority === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {need.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{need.expiry}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{need.donated || "0"}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button onClick={() => openEditModal(need)} className="text-blue-600 font-bold text-sm">Edit</button>
                      <button onClick={() => handleDelete(need.id)} className="text-red-500 font-bold text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{editId ? "Edit Need" : "Post New Need"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" placeholder="Item Name" className="w-full p-3 border rounded-xl"
                value={formData.item} onChange={(e) => setFormData({...formData, item: e.target.value})} required
              />
              <input 
                type="text" placeholder="Quantity" className="w-full p-3 border rounded-xl"
                value={formData.qty} onChange={(e) => setFormData({...formData, qty: e.target.value})} required
              />
              <select 
                className="w-full p-3 border rounded-xl" value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="Normal">Normal Priority</option>
                <option value="Urgent">Urgent Priority</option>
              </select>
              <input 
                type="date" className="w-full p-3 border rounded-xl"
                value={formData.expiry} onChange={(e) => setFormData({...formData, expiry: e.target.value})} required
              />
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={closeModal} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">Post Now</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionDashboard;