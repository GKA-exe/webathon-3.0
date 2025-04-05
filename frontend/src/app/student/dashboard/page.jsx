"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For Next.js 13+ (App Router)
// import { useRouter } from 'next/router'; // For Next.js 12 or older

const StudentDashboard = ({ studentData }) => {
  // In a real app, you would get this from authentication context or API
  const [student, setStudent] = useState(studentData || {
    id: '12345',
    name: 'John Doe',
    email: 'john.doe@example.com',
    isFirstLogin: true, // This should come from your authentication system
    roomAllocated: null // This will be null initially, and contain room number after allocation
  });
  
  const router = useRouter();

  const handleRequestRoom = () => {
    // Navigate to the room request form
    router.push('/student/room-request');
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Student Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {/* Room Status Card */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Room Status</h2>
          
          {student.isFirstLogin && !student.roomAllocated ? (
            <div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                Welcome to the hostel management system! To get started, please request a room.
              </p>
              <button
                onClick={handleRequestRoom}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
              >
                Request Room
              </button>
            </div>
          ) : student.roomAllocated ? (
            <div>
              <p className="text-sm sm:text-base text-gray-600 mb-2">Your room has been allocated:</p>
              <div className="bg-green-100 rounded-md p-3 sm:p-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-xl sm:text-2xl">{student.roomAllocated}</p>
                  <p className="text-xs sm:text-sm text-gray-500">Room Number</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm sm:text-base text-amber-600">Your room request is pending approval by the admin.</p>
              <div className="mt-3 sm:mt-4 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-amber-500 mr-2 sm:mr-3"></div>
                <span className="text-sm sm:text-base text-gray-600">Waiting for allocation</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Announcements Card */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Announcements</h2>
            <p className="text-sm sm:text-base text-gray-600">No new announcements</p>
          </div>
          
          {/* Important Contacts Card */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Important Contacts</h2>
            <ul className="space-y-2 text-sm sm:text-base text-gray-600">
              <li className="flex flex-col sm:flex-row sm:justify-between">
                <span className="font-medium">Warden:</span>
                <span className="mt-1 sm:mt-0">+91 98765 43210</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between">
                <span className="font-medium">Security:</span>
                <span className="mt-1 sm:mt-0">+91 98765 12345</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between">
                <span className="font-medium">Hostel Office:</span>
                <span className="mt-1 sm:mt-0">+91 98712 34567</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;