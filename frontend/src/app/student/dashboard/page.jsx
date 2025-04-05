"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Bell,
  Phone,
  Clock,
  User,
  Calendar,
  AlertCircle,
  CreditCard,
  DollarSign,
  LogOut,
} from "lucide-react";

const StudentDashboard = ({ studentData }) => {
  const [student, setStudent] = useState(
    studentData || {
      id: "12345",
      name: "John Doe",
      email: "john.doe@example.com",
      isFirstLogin: false,
      roomAllocated: "B-205",
      payment: {
        status: "due",
        amount: 5000,
        dueDate: "April 15, 2025",
        lastPaid: "January 15, 2025",
      },
    }
  );

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showVacateModal, setShowVacateModal] = useState(false);

  const handleRequestRoom = () => {
    router.push("/student/room-request");
  };

  const handlePayFees = () => {
    router.push("https://pages.razorpay.com/pl_QFWot3sVQj6YzD/view");
  };

  const handleVacateRoomClick = () => {
    setShowVacateModal(true);
  };

  const handleVacateRoomConfirm = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/vacate-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: student.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit vacation request");
      }

      const result = await response.json();
      
      setStudent(prev => ({
        ...prev,
        roomAllocated: false,
        payment: result.updatedPayment || prev.payment
      }));

      setShowVacateModal(false);
      alert("Vacation request submitted successfully!");
    } catch (error) {
      console.error("Vacation request error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVacateRoomCancel = () => {
    setShowVacateModal(false);
  };

  const announcements = [
    {
      id: 1,
      title: "Maintenance Work",
      message: "Water supply will be interrupted on Saturday",
      date: "April 5, 2025",
    },
    {
      id: 2,
      title: "Mess Schedule Change",
      message: "New dinner timings: 7:30PM - 9:30PM",
      date: "April 3, 2025",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: "#e2ded0" }}>
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black">
              Welcome, {student.name}
            </h1>
            <p className="text-gray-600">{student.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Room Status Card */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b" style={{ backgroundColor: "#647c90" }}>
              <h2 className="text-xl font-semibold flex items-center text-white">
                <Home size={20} className="mr-2" />
                Room Status
              </h2>
            </div>

            <div className="p-6">
              {student.isFirstLogin && !student.roomAllocated ? (
                <div className="text-center py-4">
                  <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <AlertCircle size={40} className="mx-auto mb-4" style={{ color: "#647c90" }} />
                    <p className="text-gray-600 mb-4">
                      Welcome to the Narkam! To get started, please request a room allocation.
                    </p>
                  </div>
                  <button
                    onClick={handleRequestRoom}
                    className="px-6 py-3 text-white rounded-lg font-medium transition-all hover:shadow-lg"
                    style={{ backgroundColor: "#647c90", cursor: "pointer" }}
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
                        <h3 className="text-3xl font-bold mt-1 text-black">{student.roomAllocated}</h3>
                        <p className="text-green-600 mt-1 flex items-center text-sm">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                          Active Allocation
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-full shadow-md">
                        <Home size={32} style={{ color: "#647c90" }} />
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
                      <p className="font-medium text-black">April 1, 2025</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-gray-600 mb-1">
                        <User size={16} className="mr-2" />
                        <span className="text-sm">Roommate</span>
                      </div>
                      <p className="font-medium text-black">Not assigned</p>
                    </div>
                  </div>

                  {/* Payment Status Card */}
                  <div
                    className={`p-5 rounded-xl mb-6 ${
                      student.payment.status === "paid"
                        ? "bg-green-50 border border-green-100"
                        : "bg-amber-50 border border-amber-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium flex items-center">
                          <DollarSign size={18} className="mr-2" />
                          Payment Status
                        </h3>

                        {student.payment.status === "paid" ? (
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

                      {student.payment.status === "due" && (
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
                    onClick={handleVacateRoomClick}
                    disabled={isLoading}
                    className={`w-full py-3 border ${
                      isLoading 
                        ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                        : "border-red-200 hover:bg-red-50"
                    } text-red-600 rounded-lg font-medium transition-colors flex items-center justify-center`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <LogOut size={18} className="mr-2" />
                        Request Room Vacation
                      </>
                    )}
                  </button>

                  {/* Error Display */}
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                      {error}
                    </div>
                  )}
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
                        <div
                          className="animate-spin rounded-full h-10 w-10 border-b-2"
                          style={{ borderColor: "#647c90" }}
                        ></div>
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
              <div className="p-4 border-b" style={{ backgroundColor: "#647c90" }}>
                <h2 className="text-xl font-semibold flex items-center text-white">
                  <Bell size={20} className="mr-2" />
                  Announcements
                </h2>
              </div>
              <div className="p-4">
                {announcements.length > 0 ? (
                  <div className="divide-y">
                    {announcements.map((announcement) => (
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
                  style={{ color: "#647c90", borderColor: "#647c90", cursor: "pointer" }}
                >
                  <Link href="/student/notifications">View All Announcements</Link>
                </button>
              </div>
            </div>

            {/* Important Contacts Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b" style={{ backgroundColor: "#647c90" }}>
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
                  style={{ color: "#647c90", borderColor: "#647c90" }}
                >
                  Save Contacts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vacation Confirmation Modal */}
      {showVacateModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full border border-gray-200 shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-black">Confirm Room Vacation</h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to submit a room vacation request? This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleVacateRoomCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleVacateRoomConfirm}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg text-white ${
                  isLoading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isLoading ? "Submitting..." : "Confirm Vacation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;