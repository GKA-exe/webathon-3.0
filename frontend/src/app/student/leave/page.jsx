"use client";
import React, { useState } from 'react';
import { Home, Calendar, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';

const LeaveApplicationSystem = () => {
  const [activePanel, setActivePanel] = useState('form');
  const [formData, setFormData] = useState({
    name: '',
    roomNo: '',
    reason: '',
    startDate: '',
    returnDate: '',
    parentPhoneNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActivePanel('pass');
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 ">
      <div className="max-w-4xl mx-auto p-4 ">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Leave Management System
          </h1>
          <p className="text-gray-600">
            Apply for hostel leave and track your status
          </p>
        </header>

        {/* Navigation */}
        <div className="bg-white rounded-full p-1 mb-8 shadow-sm">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setActivePanel('form')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activePanel === 'form' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Apply for Leave
            </button>
            <button
              onClick={() => setActivePanel('pass')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activePanel === 'pass' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Leave Pass
            </button>
          </div>
        </div>

        {/* Form Panel */}
        {activePanel === 'form' && (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
              <User size={20} className="text-primary" />
              Leave Application Form
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User size={16} className="text-gray-600" /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                {/* Room Number */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Home size={16} className="text-gray-600" /> Room Number
                  </label>
                  <input
                    type="text"
                    name="roomNo"
                    value={formData.roomNo}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                {/* Leave Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar size={16} className="text-gray-600" /> Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar size={16} className="text-gray-600" /> Return Date
                    </label>
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Parent Contact */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone size={16} className="text-gray-600" /> Parent's Contact
                  </label>
                  <input
                    type="tel"
                    name="parentPhoneNumber"
                    value={formData.parentPhoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  />
                </div>

                {/* Reason */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <AlertCircle size={16} className="text-gray-600" /> Leave Reason
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-primary text-white rounded-lg font-semibold hover:bg-teritary transition-colors"
              >
                Submit Application
              </button>
            </form>
          </div>
        )}

        {/* Pass Panel */}
        {activePanel === 'pass' && (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
              <CheckCircle size={20} className="text-green-600" />
              Leave Pass
            </h2>

            <div className="space-y-6">
              {/* Approval Header */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle size={20} />
                  <span className="font-semibold">Leave Approved</span>
                </div>
              </div>

              {/* Pass Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">Student Name</p>
                    <p className="font-medium text-gray-800">{formData.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">Room Number</p>
                    <p className="font-medium text-gray-800">{formData.roomNo}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Leave Period</p>
                  <p className="font-medium text-gray-800">
                    {formData.startDate} to {formData.returnDate}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Emergency Contact</p>
                  <p className="font-medium text-gray-800">{formData.parentPhoneNumber}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Approved By</p>
                  <p className="font-medium text-gray-800">Hostel Administration</p>
                </div>
              </div>

              {/* Verification Note */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  Present this pass when leaving and returning to the hostel.
                  Keep your parent's contact number accessible for verification.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveApplicationSystem;