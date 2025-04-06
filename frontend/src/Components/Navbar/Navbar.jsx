"use client";
import React, { useState } from "react";

const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  function logout() {
    // Remove JWT token from sessionStorage
    sessionStorage.removeItem("jwtToken");

    // Optionally, redirect the user to login page or home
    window.location.href = "/login"; // change path as needed
  }

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 md:py-6 md:px-8">
      <div className="container mx-auto">
        {/* Desktop and Mobile Header */}
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">NARKAM</div>

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
            <NavItem label="Dashboard" href="/admin" />
            <NavItem label="Room Management" href="/admin/room-management" />
            <NavItem label="Lost & Found" href="/admin/lost-and-found" />
            <NavItem label="Announcements" href="/admin/announcements" />
            <NavItem label="QR Scanner" href="/admin/qr-scanner" />

            {/* Logout link replacing Profile dropdown */}
            <button
              onClick={logout}
              className="text-red-500 hover:text-red-400 focus:outline-none cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4 border-t border-gray-700 pt-4">
            <MobileNavItem label="Dashboard" href="/admin/dashboard" />
            <MobileNavItem label="Room Management" href="/admin/room-management" />
            <NavItem label="Lost & Found" href="/admin/lost-and-found" />
            <NavItem label="Announcements" href="/admin/announcements" />
            <MobileNavItem label="QR Scanner" href="/admin/qr-scanner" />

            {/* Direct Logout link for mobile */}
            <button
              onClick={logout}
              className="text-red-500 hover:text-red-400 focus:outline-none cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Helper component for desktop navigation items
const NavItem = ({ label, href }) => {
  return (
    <a href={href} className="hover:text-gray-300">
      {label}
    </a>
  );
};

// Helper component for mobile navigation items
const MobileNavItem = ({ label, href }) => {
  return (
    <a href={href} className="block py-2 hover:text-gray-300">
      {label}
    </a>
  );
};

export default NavigationBar;
