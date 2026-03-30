import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { ref, push, onValue, remove, update, get } from "firebase/database";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import toast from "react-hot-toast";

const InstitutionDashboard = () => {

  const [searchParams] = useSearchParams();
  const activeView = searchParams.get("view") === "confirmations" ? "confirmations" : "dashboard";

  const [needs, setNeeds] = useState([]);
  const [pendingDonations, setPendingDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    item: '',
    qty: '',
    category: 'food',
    priority: 'Normal',
    expiry: '',
    status: 'Pending'
  });

  // --- FETCH NEEDS — only this institution's needs ---
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const needsRef = ref(db, 'needs');
    onValue(needsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data)
          .map(key => ({ id: key, ...data[key] }))
          .filter(need => need.institutionId === user.uid); // ✅ only this institution's needs
        setNeeds(list.reverse());
      } else {
        setNeeds([]);
      }
    });
  }, []);

  // --- FETCH PENDING DONATIONS ---
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

  // --- CONFIRM RECEIPT ---
  const handleConfirmReceipt = async (donation) => {
    try {
      await update(ref(db, `donations/${donation.id}`), {
        status: "Received",
        receivedAt: new Date().toISOString(),
      });
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

  // --- MODAL & FORM ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user?.uid) {
      toast.error("Please login before posting a need");
      return;
    }

    const userSnap = await get(ref(db, `users/${user.uid}`));

    if (!userSnap.exists() || !userSnap.val().institutionName) {
      toast.error("Please setup your profile before posting a need");
      setSaving(false);
      return;
    }

    const institutionName = userSnap.val().institutionName;

    try {
      if (editId) {
        await update(ref(db, `needs/${editId}`), formData);
        toast.success("Need updated!");
      } else {
        await push(ref(db, 'needs'), {
          ...formData,
          institutionId: user?.uid || "anonymous",
          institutionName: institutionName,
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
    setFormData({
      item: need.item,
      qty: need.qty,
      category: need.category || 'food',
      priority: need.priority || 'Normal',
      expiry: need.expiry || '',
      status: need.status || 'Pending'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ item: '', qty: '', category: 'food', priority: 'Normal', expiry: '', status: 'Pending' });
  };

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#00563B] space-y-6 mt-4">Institution Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage and track community needs.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#00563B] text-white px-6 py-3 rounded-xl font-semibold shadow-md"
        >
          + Post New Need
        </button>
      </div>

      {/* ══════════════════ VIEW 1: DASHBOARD ══════════════════ */}
      {activeView === "dashboard" && (
        <>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <p className="text-gray-500 text-sm font-medium">Active Needs</p>
              <h2 className="text-3xl font-bold text-[#00563B] mt-2">{needs.length}</h2>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-primary">
              <p className="text-gray-500 text-sm font-medium">Pending Confirmations</p>
              <h2 className="text-3xl font-bold text-primary mt-2">{pendingDonations.length}</h2>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <p className="text-gray-500 text-sm font-medium">Completed Needs</p>
              <h2 className="text-3xl font-bold text-[#00563B] mt-2">
                {needs.filter(n => Number(n.donated) >= Number(n.qty)).length}
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#00563B]">Current Needs Inventory</h2>
              <input
                type="text"
                placeholder="Search..."
                className="border p-2 rounded-lg text-sm"
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
                    <th className="p-4 text-primary font-bold">Donated</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {needs
                    .filter(n => n.item.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((need) => (
                      <tr key={need.id} className="hover:bg-gray-50">
                        <td className="p-4 font-bold uppercase">{need.item}</td>
                        <td className="p-4">{need.qty}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${need.priority === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
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
        </>
      )}

      {/* ══════════════════ VIEW 2: PENDING CONFIRMATIONS ══════════════════ */}
      {activeView === "confirmations" && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="animate-pulse h-3 w-3 rounded-full bg-blue-600"></span>
            <h2 className="text-lg font-extrabold text-blue-900 uppercase">
              Pending Donation Requests
            </h2>
          </div>

          {pendingDonations.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-lg font-medium">No pending donations right now.</p>
              <p className="text-sm mt-1">When donors submit a donation, it will appear here.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {pendingDonations.map((d) => (
                <div key={d.id} className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">{d.itemName}</h3>
                    <p className="text-sm text-gray-600 mt-1">Quantity: <b>{d.quantity}</b></p>
                    <p className="text-sm text-gray-600">From: <b>{d.donorName || "Anonymous Donor"}</b></p>
                    <p className="text-xs text-gray-400 mt-1">{d.date}</p>
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
          )}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#00563B] mb-6">
              {editId ? "Edit Need" : "Post New Need"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Item Name"
                className="w-full p-3 border rounded-xl"
                value={formData.item}
                onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                className="w-full p-3 border rounded-xl"
                value={formData.qty}
                onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
                required
              />
              <select
                className="w-full p-3 border rounded-xl"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="food">Food</option>
                <option value="education">Education</option>
                <option value="clothing">Clothing</option>
              </select>
              <select
                className="w-full p-3 border rounded-xl"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
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
