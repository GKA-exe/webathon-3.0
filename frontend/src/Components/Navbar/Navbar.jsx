"use client";
import React, { useState } from 'react';

const NavigationBar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav className="bg-gray-800 text-white py-6 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Project Name</div>
        
        <div className="flex space-x-6">
          <NavItem label="Dashboard" href="/admin/dashboard" />
          <NavItem label="Room Management" href="/admin/room-management" />
          <NavItem label="Attendance & Leave" href="/admin/attendance-leave" />
          <NavItem label="Mess" href="/admin/mess" />
          <NavItem label="Complaints" href="/admin/complaints" />
          
          {/* Profile dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-1 hover:text-gray-300" 
              onClick={toggleProfileDropdown}
            >
              <span>Profile</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </button>
            
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <a 
                  href="/admin/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  View Profile
                </a>
                <a 
                  href="/admin/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a 
                  href="/admin/logout" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Helper component for navigation items
const NavItem = ({ label, href }) => {
  return (
    <a 
      href={href} 
      className="hover:text-gray-300"
    >
      {label}
    </a>
  );
};

export default NavigationBar;