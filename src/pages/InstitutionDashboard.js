import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; 
import { ref, push, onValue, remove, update, get } from "firebase/database";
import DashboardLayout from "../components/DashboardLayout";
import toast from "react-hot-toast";

const InstitutionDashboard = () => {
  // --- STATE VARIABLES ---
  const [needs, setNeeds] = useState([]);
  const [pendingDonations, setPendingDonations] = useState([]); 
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

  // --- 1. FETCH CURRENT NEEDS ---
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

  // --- 2. FETCH PENDING DONATIONS (LIVE NOTIFICATIONS) ---
  // ✅ Now works correctly because BrowseNeeds.jsx saves institutionId in every donation
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const donationsRef = ref(db, 'donations');
    onValue(donationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data)
          .map(key => ({ id: key, ...data[key] }))
          .filter(d => 
            d.institutionId === user.uid && 
            d.status?.toLowerCase() === "pending"
          );
        setPendingDonations(list);
      } else {
        setPendingDonations([]);
      }
    });
  }, []);

  // --- 3. ACKNOWLEDGE RECEIPT ACTION ---
  const handleConfirmReceipt = async (donation) => {
    try {
      // Step A: Update Donation Status to Confirmed/Received
      await update(ref(db, `donations/${donation.id}`), { 
        status: "Received",
        receivedAt: new Date().toISOString()
      });

      // Step B: Increment the 'donated' count in the specific Need Inventory
      if (donation.needId) {
        const needRef = ref(db, `needs/${donation.needId}`);
        const needSnapshot = await get(needRef);
        
        if (needSnapshot.exists()) {
          const currentDonated = Number(needSnapshot.val().donated || 0);
          const addedQty = Number(donation.quantity || 0);
          await update(needRef, { donated: currentDonated + addedQty });
        }
      }
      toast.success(`Acknowledged receipt of ${donation.itemName}!`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update status.");
    }
  };

  // --- 4. MODAL & FORM LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    try {
      if (editId) {
        await update(ref(db, `needs/${editId}`), formData);
        toast.success("Need updated!");
      } else {
        await push(ref(db, 'needs'), {
          ...formData,
          institutionId: user?.uid || "anonymous",   // ✅ This is what BrowseNeeds reads
          institutionName: user?.displayName || "Institution",
          donated: 0,
          createdAt: new Date().toISOString()
        });
        toast.success("New need posted!");
      }
      closeModal();
    } catch (error) {
      toast.error("Error saving data.");
    }
  };

  const openEditModal = (need) => {
    setEditId(need.id);
    setFormData({ item: need.item, qty: need.qty, priority: need.priority || 'Normal', expiry: need.expiry || '', status: need.status || 'Pending' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ item: '', qty: '', priority: 'Normal', expiry: '', status: 'Pending' });
  };

  return (
    <DashboardLayout>
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#00563B]">Institution Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage and track community needs.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-[#00563B] text-white px-6 py-3 rounded-xl font-semibold shadow-md">
          + Post New Need
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm font-medium">Active Needs</p>
          <h2 className="text-3xl font-bold text-[#00563B] mt-2">{needs.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-blue-500">
          <p className="text-gray-500 text-sm font-medium">Pending Confirmations</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">{pendingDonations.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm font-medium">Completed Needs</p>
          <h2 className="text-3xl font-bold text-[#00563B] mt-2">
            {needs.filter(n => Number(n.donated) >= Number(n.qty)).length}
          </h2>
        </div>
      </div>

      {/* --- CONFIRMATION SECTION --- */}
      {pendingDonations.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8 border-l-8 border-blue-600">
          <div className="flex items-center gap-2 mb-4">
            <span className="animate-pulse h-3 w-3 rounded-full bg-blue-600"></span>
            <h2 className="text-lg font-extrabold text-blue-900 uppercase">Confirm Received Donations</h2>
          </div>
          <div className="grid gap-4">
            {pendingDonations.map((d) => (
              <div key={d.id} className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div>
                  <h3 className="font-bold text-gray-800">{d.itemName}</h3>
                  <p className="text-sm text-gray-600">Quantity: <b>{d.quantity}</b> | From: {d.donorName || "Anonymous Donor"}</p>
                </div>
                <button 
                  onClick={() => handleConfirmReceipt(d)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition shadow-sm"
                >
                  Mark as Received
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CURRENT NEEDS INVENTORY */}
      <div className="bg-white rounded-xl shadow-sm border p-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#00563B]">Current Needs Inventory</h2>
          <input 
            type="text" placeholder="Search..." className="border p-2 rounded-lg text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="p-4">Item Name</th>
                <th className="p-4">Goal</th>
                <th className="p-4">Priority</th>
                <th className="p-4 text-blue-600 font-bold">Donated</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {needs.filter(n => n.item.toLowerCase().includes(searchTerm.toLowerCase())).map((need) => (
                <tr key={need.id} className="hover:bg-gray-50">
                  <td className="p-4 font-bold uppercase">{need.item}</td>
                  <td className="p-4">{need.qty}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      need.priority === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {need.priority}
                    </span>
                  </td>
                  <td className="p-4 font-black text-blue-600 text-lg">{need.donated || 0}</td>
                  <td className="p-4">
                    <button onClick={() => openEditModal(need)} className="text-blue-600 mr-4 font-bold">Edit</button>
                    <button onClick={() => remove(ref(db, `needs/${need.id}`))} className="text-red-500 font-bold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL (POST/EDIT) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#00563B] mb-6">{editId ? "Edit Need" : "Post New Need"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                placeholder="Item Name" className="w-full p-3 border rounded-xl"
                value={formData.item} onChange={(e) => setFormData({...formData, item: e.target.value})} required 
              />
              <input 
                type="number" placeholder="Quantity" className="w-full p-3 border rounded-xl"
                value={formData.qty} onChange={(e) => setFormData({...formData, qty: e.target.value})} required 
              />
              <select className="w-full p-3 border rounded-xl" value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={closeModal} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#00563B] text-white rounded-xl font-bold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default InstitutionDashboard;
