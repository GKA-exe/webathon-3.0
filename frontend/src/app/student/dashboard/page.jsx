"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Bell, Phone, Clock, User, Calendar, AlertCircle, CreditCard, DollarSign, LogOut } from 'lucide-react';

const StudentDashboard = ({ studentData }) => {
  const [student, setStudent] = useState(studentData || {
    id: '12345',
    name: 'John Doe',
    email: 'john.doe@example.com',
    isFirstLogin: true,
    roomAllocated: null,
    // Added payment details
    payment: {
      status: 'due',
      amount: 15000,
      dueDate: 'April 15, 2025',
      lastPaid: 'January 15, 2025'
    }
  });
  
  const router = useRouter();

  const handleRequestRoom = () => {
    router.push('/student/room-request');
  };

  const handlePayFees = () => {
    router.push('/student/payment');
  };

  const handleVacateRoom = () => {
    // In a real app, this would show a confirmation dialog first
    router.push('/student/vacate-room');
  };

  // Sample announcements data
  const announcements = [
    {
      id: 1,
      title: "Maintenance Work",
      message: "Water supply will be interrupted on Saturday",
      date: "April 5, 2025"
    },
    {
      id: 2,
      title: "Mess Schedule Change",
      message: "New dinner timings: 7:30PM - 9:30PM",
      date: "April 3, 2025"
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: '#e2ded0' }}>
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black">Welcome, {student.name}</h1>
            <p className="text-gray-600">{student.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Room Status Card */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b" style={{ backgroundColor: '#647c90' }}>
              <h2 className="text-xl font-semibold flex items-center text-white">
                <Home size={20} className="mr-2" />
                Room Status
              </h2>
            </div>
            
            <div className="p-6">
              {student.isFirstLogin && !student.roomAllocated ? (
                <div className="text-center py-4">
                  <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <AlertCircle size={40} className="mx-auto mb-4" style={{ color: '#647c90' }} />
                    <p className="text-gray-600 mb-4">
                      Welcome to the Narkam! To get started, please request a room allocation.
                    </p>
                  </div>
                  <button
                    onClick={handleRequestRoom}
                    className="px-6 py-3 text-white rounded-lg font-medium transition-all hover:shadow-lg"
                    style={{ backgroundColor: '#647c90' }}
                  >
                    Request Room Allocation
                  </button>
                </div>
              ) : student.roomAllocated ? (
                <div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-5 mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-500 text-sm">Your Room Number</span>
                        <h3 className="text-3xl font-bold mt-1">{student.roomAllocated}</h3>
                        <p className="text-green-600 mt-1 flex items-center text-sm">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                          Active Allocation
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-full shadow-md">
                        <Home size={32} style={{ color: '#647c90' }} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Room Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-gray-600 mb-1">
                        <Calendar size={16} className="mr-2" />
                        <span className="text-sm">Check-in Date</span>
                      </div>
                      <p className="font-medium">April 1, 2025</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-gray-600 mb-1">
                        <User size={16} className="mr-2" />
                        <span className="text-sm">Roommate</span>
                      </div>
                      <p className="font-medium">Not assigned</p>
                    </div>
                  </div>

                  {/* Payment Status Card */}
                  <div className={`p-5 rounded-xl mb-6 ${
                    student.payment.status === 'paid' ? 'bg-green-50 border border-green-100' : 
                    'bg-amber-50 border border-amber-100'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium flex items-center">
                          <DollarSign size={18} className="mr-2" />
                          Payment Status
                        </h3>
                        
                        {student.payment.status === 'paid' ? (
                          <div>
                            <div className="flex items-center text-green-600 mt-2">
                              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                              <span>Fees Paid</span>
                            </div>
                            <p className="text-gray-600 mt-1 text-sm">
                              Last payment: {student.payment.lastPaid}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center text-amber-600 mt-2">
                              <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                              <span>Payment Due</span>
                            </div>
                            <p className="text-amber-700 font-medium mt-1">
                              ₹{student.payment.amount.toLocaleString()}
                            </p>
                            <p className="text-amber-600 text-sm mt-1">
                              Due by: {student.payment.dueDate}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {student.payment.status === 'due' && (
                        <button
                          onClick={handlePayFees}
                          className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg font-medium hover:bg-amber-200 transition-colors flex items-center"
                        >
                          <CreditCard size={16} className="mr-2" />
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Vacate Room Button */}
                  <button
                    onClick={handleVacateRoom}
                    className="w-full py-3 border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center"
                  >
                    <LogOut size={18} className="mr-2" />
                    Request Room Vacation
                  </button>
                </div>
              ) : (
                <div className="py-6">
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-lg text-amber-800">Room Request Pending</h3>
                        <p className="text-amber-700 mt-2">
                          Your request is currently under review by the hostel administration.
                        </p>
                      </div>
                      <div className="ml-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2" style={{ borderColor: '#647c90' }}></div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-amber-100 flex items-center">
                      <Clock size={16} className="text-amber-600 mr-2" />
                      <span className="text-sm text-amber-600">Submitted on April 2, 2025</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Announcements Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b" style={{ backgroundColor: '#647c90' }}>
                <h2 className="text-xl font-semibold flex items-center text-white">
                  <Bell size={20} className="mr-2" />
                  Announcements
                </h2>
              </div>
              <div className="p-4"> 
                {announcements.length > 0 ? (
                  <div className="divide-y">
                    {announcements.map(announcement => (
                      <div key={announcement.id} className="py-3">
                        <h3 className="font-medium text-black">{announcement.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{announcement.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{announcement.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 py-4 text-center">No new announcements</p>
                )}
                <button 
                  className="w-full mt-4 py-2 text-sm rounded border transition-colors text-center"
                  style={{ color: '#647c90', borderColor: '#647c90' }}
                >
                  View All Announcements
                </button>
              </div>
            </div>
            
            {/* Important Contacts Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b" style={{ backgroundColor: '#647c90' }}>
                <h2 className="text-xl font-semibold flex items-center text-white">
                  <Phone size={20} className="mr-2" />
                  Important Contacts
                </h2>
              </div>
              <div className="p-4">
                <ul className="divide-y">
                  <li className="py-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-black font-bold">Warden</span>
                      <span className="text-gray-600">+91 98765 43210</span>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-black font-bold">Security</span>
                      <span className="text-gray-600">+91 98765 12345</span>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-black font-bold">Hostel Office</span>
                      <span className="text-gray-600">+91 98712 34567</span>
                    </div>
                  </li>
                </ul>
                <button 
                  className="w-full mt-4 py-2 text-sm rounded border transition-colors text-center"
                  style={{ color: '#647c90', borderColor: '#647c90' }}
                >
                  Save Contacts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;