// PendingComplaintsTable.jsx
'use client'
import React, { useState } from "react";

const PendingComplaintsTable = () => {
  // Dummy data for complaints
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Internet not working in my room",
      roomNumber: "201",
      category: "Network",
      status: "Pending",
    },
    {
      id: 2,
      title: "Leaking faucet in bathroom",
      roomNumber: "104",
      category: "Plumbing",
      status: "Pending",
    },
    {
      id: 3,
      title: "No hot water available",
      roomNumber: "312",
      category: "Utilities",
      status: "Pending",
    },
    {
      id: 4,
      title: "Request to change mess menu",
      roomNumber: "156",
      category: "Mess Menu",
      status: "Pending",
    },
    {
      id: 5,
      title: "Broken chair in my room",
      roomNumber: "224",
      category: "Furniture",
      status: "Pending",
    },
  ]);

  // Function to handle status change
  const handleStatusChange = (id, newStatus) => {
    // Update local state
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, status: newStatus } : complaint
      )
    );

    // API call placeholder
    console.log(`Status updated for complaint #${id} to ${newStatus}`);
    // Actual API call would be something like:
    // fetch('/api/complaints/update-status', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ id, status: newStatus })
    // })
  };

  // Function to get badge color based on category
  const getBadgeColor = (category) => {
    const colors = {
      Network: "bg-blue-200 text-blue-800",
      Plumbing: "bg-green-200 text-green-800",
      Utilities: "bg-yellow-200 text-yellow-800",
      "Mess Menu": "bg-purple-200 text-purple-800",
      Furniture: "bg-pink-200 text-pink-800",
    };
    return colors[category] || "bg-gray-200 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-primary text-white font-medium" style={{ backgroundColor: "#647c90" }}>
        <h2 className="text-xl">Pending Complaints</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead style={{ backgroundColor: "#e2ded0" }}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complaints.map((complaint) => (
              <tr key={complaint.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium" style={{ color: "#4e4f50" }}>
                    {complaint.title}
                  </div>
                  <div className="text-sm text-gray-400">Room {complaint.roomNumber}</div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeColor(
                      complaint.category
                    )}`}
                  >
                    {complaint.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <select
                    className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ borderColor: "#a0bcd1", color: "#4e4f50" }}
                    value={complaint.status}
                    onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingComplaintsTable;
