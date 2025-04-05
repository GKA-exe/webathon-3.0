"use client";
import React, { useState } from 'react';

const LeaveApplicationSystem = () => {
  // State for managing active panel
  const [activePanel, setActivePanel] = useState('form');
  
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    roomNo: '',
    reason: '',
    startDate: '',
    returnDate: '',
    parentPhoneNumber: ''
  });
  
  // State for leave status
  const [leaveStatus, setLeaveStatus] = useState({
    isSubmitted: false,
    isApproved: false,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to a server
    // For demo purposes, we'll just mark it as submitted
    setLeaveStatus({
      ...leaveStatus,
      isSubmitted: true,
      isApproved: true // Auto-approve for demo purposes
    });
    alert('Leave application submitted successfully!');
    // Automatically switch to the pass panel to show the result
    setActivePanel('pass');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Student Leave Management System</h1>
      </header>

      {/* Navigation Tabs - Now tabs instead of buttons */}
      <div className="bg-gray-200 border-b border-gray-300">
  <div className="flex justify-center max-w-3xl mx-auto">
    <div 
      className={`px-6 py-3 cursor-pointer ${activePanel === 'form' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
      onClick={() => setActivePanel('form')}
    >
      Apply for Leave
    </div>
    <div 
      className={`px-6 py-3 cursor-pointer ${activePanel === 'pass' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500'}`}
      onClick={() => setActivePanel('pass')}
    >
      View Pass
    </div>
  </div>
</div>


      {/* Main Content Area - Centered with reduced width */}
      <div className="p-4 flex-1 flex justify-center">
        {/* Leave Application Form Panel */}
        {activePanel === 'form' && (
          <div className="w-full max-w-xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Room Number</label>
                <input
                  type="text"
                  name="roomNo"
                  value={formData.roomNo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Reason for Leave</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Return Date</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Parent's Phone Number</label>
                <input
                  type="tel"
                  name="parentPhoneNumber"
                  value={formData.parentPhoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
              <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 w-full max-w-xs mx-auto block"
                    >
                    Submit Application
                    </button>
              </div>
            </form>
          </div>
        )}

        {/* Pass Panel */}
        {activePanel === 'pass' && (
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Leave Pass</h2>
            
            {leaveStatus.isSubmitted ? (
              leaveStatus.isApproved ? (
                <div className="border-2 border-green-500 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-green-600">APPROVED</h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Valid Pass
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Student Name</p>
                        <p className="font-medium">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Room Number</p>
                        <p className="font-medium">{formData.roomNo}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Leave Reason</p>
                      <p className="font-medium">{formData.reason}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">From Date</p>
                        <p className="font-medium">{formData.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">To Date</p>
                        <p className="font-medium">{formData.returnDate}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Emergency Contact</p>
                      <p className="font-medium">{formData.parentPhoneNumber}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <p className="text-sm text-gray-500">Approved By</p>
                        <p className="font-medium">Hostel Warden</p>
                      </div>
                      <div className="md:text-right">
                        <p className="text-sm text-gray-500">Approval Date</p>
                        <p className="font-medium">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-red-100 text-red-800 p-4 rounded-lg inline-block mb-4">
                    <p className="font-bold">You have no approved leave</p>
                  </div>
                  <p className="text-gray-600">Your leave application was not approved. Please contact the hostel administration for more details.</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">You haven't submitted a leave application yet. Please go to the "Apply for Leave" section to submit one.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveApplicationSystem;