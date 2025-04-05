"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const SNavbar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Student name - you would typically get this from a prop or context
  const studentName = "John Doe";

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close profile dropdown when toggling mobile menu
    if (!isMobileMenuOpen) {
      setIsProfileDropdownOpen(false);
    }
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 md:py-6 md:px-8">
      <div className="container mx-auto">
        {/* Desktop and Mobile Header */}
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Student Portal</div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-6">
            <NavItem label="Dashboard" href="/student/dashboard" />
            <NavItem label="Mess" href="/student/mess" />
            <NavItem label="Lost&Found" href="/student/lostfound" />
            <NavItem label="Raise Complaint" href="/student/complaint" />
            <NavItem label="Fee Payment" href="/student/fee-payment" />
            
            {/* Profile dropdown for desktop */}
            <div className="relative">
              <button 
                className="flex items-center space-x-1 hover:text-gray-300" 
                onClick={toggleProfileDropdown}
              >
                <span>Profile ({studentName})</span>
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
                    href="/student/laundry" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Laundry
                  </a>
                  <a 
                    href="/student/my-qr" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My QR
                  </a>
                  <a 
                    href="/student/notifications" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Notifications
                  </a>
                  <a 
                    href="/student/about" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    About
                  </a>
                  <a 
                    href="/student/apply-leave" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Apply Leave
                  </a>
                  <a 
                    href="/student/logout" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4 border-t border-gray-700 pt-4">
            <MobileNavItem label="Dashboard" href="/student/dashboard" />
            <MobileNavItem label="Mess" href="/student/mess" />
            <MobileNavItem label="Lost&Found" href="/student/lostfound" />
            <MobileNavItem label="Raise Complaint" href="/student/complaint" />
            <MobileNavItem label="Fee Payment" href="/student/fee-payment" />
            
            {/* Mobile Profile Section */}
            <div>
              <button 
                className="w-full text-left py-2 flex justify-between items-center"
                onClick={toggleProfileDropdown}
              >
                <span>Profile ({studentName})</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
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
                <div className="mt-2 ml-4 flex flex-col space-y-2 border-l border-gray-700 pl-4">
                  {/* <MobileNavItem label="Attendance" href="/student/attendance" /> */}
                  <MobileNavItem label="Laundry" href="/student/laundry" />
                  <MobileNavItem label="My QR" href="/student/my-qr" />
                  <MobileNavItem label="Notifications" href="/student/notifications" />
                  <MobileNavItem label="About" href="/student/about" />
                  <MobileNavItem label="Apply Leave" href="/student/apply-leave" />
                  <MobileNavItem label="Logout" href="/student/logout" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Helper component for desktop navigation items
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

// Helper component for mobile navigation items
const MobileNavItem = ({ label, href }) => {
  return (
    <a 
      href={href} 
      className="block py-2 hover:text-gray-300"
    >
      {label}
    </a>
  );
};

export default SNavbar;