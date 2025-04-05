// HomePassesTable.jsx
'use client'
import React, { useState } from "react";

const HomePassesTable = () => {
  // Dummy data for home passes
  const [homePasses, setHomePasses] = useState([
    {
      id: 'abhijeetmukund@gmail.com',
      name: "Abhijeet Mukund",
      roomNumber: "101",
      parentPhone: "+91 9845012345",
      returnDate: "2025-04-10",
      status: "Pending",
    },
    {
      id: 'sarahsmith@gmailcom',
      name: "Sarah Smith",
      roomNumber: "203",
      parentPhone: "+91 8734567890",
      returnDate: "2025-04-12",
      status: "Pending",
    },
    {
      id: 'rahulkumar@gmailcom',
      name: "Rahul Kumar",
      roomNumber: "315",
      parentPhone: "+91 7612345678",
      returnDate: "2025-04-15",
      status: "Pending",
    },
    {
      id: 'priyapatel@gmailcom',
      name: "Priya Patel",
      roomNumber: "122",
      parentPhone: "+91 9998887776",
      returnDate: "2025-04-08",
      status: "Pending",
    },
  ]);

  // Function to handle approval
  const handleApprove = (id) => {
    // Update local state
    setHomePasses(
      homePasses.map((pass) => (pass.id === id ? { ...pass, status: "Approved" } : pass))
    );

    // API call placeholder
    console.log(`Home pass #${id} approved`);
    // Actual API call would be something like:
    // fetch('/api/home-passes/approve', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ id })
    // })
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
      <div className="p-4 font-medium text-white" style={{ backgroundColor: "#647c90" }}>
        <h2 className="text-xl">Home Passes</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead style={{ backgroundColor: "#e2ded0" }}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Parent's Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Return Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {homePasses.map((pass) => (
              <tr key={pass.id} className="hover:bg-gray-50">
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                  style={{ color: "#4e4f50" }}
                >
                  {pass.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: "#4e4f50" }}>
                  {pass.roomNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: "#4e4f50" }}>
                  {pass.parentPhone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: "#4e4f50" }}>
                  {formatDate(pass.returnDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {pass.status === "Approved" ? (
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-md">
                      Approved
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApprove(pass.id)}
                      className="px-4 py-2 font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{ backgroundColor: "#a0bcd1" }}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePassesTable;
