// app/page.js
"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Wifi,
  Utensils,
  Wrench,
  HomeIcon,
  Shield,
  Paintbrush,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-nav">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#1e2939] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl text-textc">
                NARKAM
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="text-textc px-4 py-2 rounded-md font-medium hover:text-[#a0bcd1]"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-textc hover:text-[#a0bcd1] px-3 py-2 rounded-md font-medium"
              >
                Register
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                className="text-[#647c90] hover:text-[#a0bcd1]"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#e2ded0] shadow-lg animated fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#647c90] hover:text-[#a0bcd1] hover:bg-[#d5d2c4]"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-[#647c90] hover:text-[#a0bcd1] hover:bg-[#d5d2c4]"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-[#647c90]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 animated fadeIn">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#e2ded0] mb-4">
                NARKAM Hostel
              </h1>
              <p className="text-[#e2ded0] text-opacity-90 text-lg md:text-xl mb-8 max-w-lg">
                Streamline your hostel operations with our all-in-one smart
                management solution. Manage rooms, bookings, and facilities with
                ease.
              </p>
              <Link
                href="/register"
                className="inline-block bg-[#e2ded0] text-[#647c90] font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#d5d2c4] transform transition hover:scale-105"
              >
                Register Now
              </Link>
            </div>
            <div className="md:w-1/2 animated slideIn">
              <HeroSVG />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-[#e2ded0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#647c90] mb-12">
            Hostel Facilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FacilityCard
              icon={<Wifi className="text-[#a0bcd1]" size={32} />}
              title="Wi-Fi"
              description="High-speed internet access throughout the hostel premises."
            />

            <FacilityCard
              icon={<Utensils className="text-[#a0bcd1]" size={32} />}
              title="Mess"
              description="Nutritious meals with flexible dining options and meal plans."
            />

            <FacilityCard
              icon={<Wrench className="text-[#a0bcd1]" size={32} />}
              title="Maintenance"
              description="Prompt maintenance services for all hostel facilities."
            />

            <FacilityCard
              icon={<HomeIcon className="text-[#a0bcd1]" size={32} />}
              title="Rooms"
              description="Clean, comfortable rooms with modern amenities."
            />

            <FacilityCard
              icon={<Shield className="text-[#a0bcd1]" size={32} />}
              title="Security"
              description="24/7 security with CCTV surveillance and access control."
            />

            <FacilityCard
              icon={<Paintbrush className="text-[#a0bcd1]" size={32} />}
              title="Housekeeping"
              description="Regular cleaning and housekeeping services."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#647c90] text-[#e2ded0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Join the Smart Hostel Experience Today
          </h2>
          <p className="text-[#e2ded0] text-opacity-90 mb-8 max-w-2xl mx-auto">
            Transform your hostel management with our smart solution. Simplify
            operations, enhance resident experience, and boost efficiency.
          </p>
          <Link
            href="/register"
            className="inline-block bg-[#e2ded0] text-[#647c90] font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#d5d2c4] transform transition hover:scale-105"
          >
            Register Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#647c90] text-[#e2ded0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-[#e2ded0] text-opacity-90">
                © 2025 NARKAM. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/about"
                className="text-[#e2ded0] text-opacity-90 hover:text-[#e2ded0]"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-[#e2ded0] text-opacity-90 hover:text-[#e2ded0]"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-[#e2ded0] text-opacity-90 hover:text-[#e2ded0]"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animated {
          animation-duration: 1s;
          animation-fill-mode: both;
        }

        .fadeIn {
          animation-name: fadeIn;
        }

        .slideIn {
          animation-name: slideIn;
        }
      `}</style>
    </div>
  );
}

// Facility Card Component
function FacilityCard({ icon, title, description }) {
  return (
    <div className="bg-[#e2ded0] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-[#746c70] hover:border-[#a0bcd1] transform hover:-translate-y-1 transition-transform">
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[#647c90] text-center mb-2">
        {title}
      </h3>
      <p className="text-[#4e4f50] text-center">{description}</p>
    </div>
  );
}

// Hero SVG Illustration
function HeroSVG() {
  return (
    <svg
      viewBox="0 0 500 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg mx-auto"
    >
      <rect
        x="100"
        y="50"
        width="300"
        height="250"
        rx="10"
        fill="#e2ded0"
        stroke="#647c90"
        strokeWidth="3"
      />
      <rect x="120" y="80" width="260" height="40" rx="5" fill="#d5d2c4" />
      <rect x="120" y="130" width="120" height="150" rx="5" fill="#d5d2c4" />
      <rect x="260" y="130" width="120" height="70" rx="5" fill="#d5d2c4" />
      <rect x="260" y="210" width="120" height="70" rx="5" fill="#d5d2c4" />
      <circle cx="150" cy="180" r="15" fill="#a0bcd1" />
      <circle cx="210" cy="180" r="15" fill="#a0bcd1" />
      <circle cx="320" cy="165" r="15" fill="#a0bcd1" />
      <circle cx="320" cy="245" r="15" fill="#a0bcd1" />
      <path
        d="M150 190 L150 250 L210 250 L210 190"
        stroke="#a0bcd1"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M320 175 L320 200"
        stroke="#a0bcd1"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M320 255 L320 280"
        stroke="#a0bcd1"
        strokeWidth="2"
        fill="none"
      />
      <rect x="140" y="90" width="220" height="20" rx="3" fill="#647c90" />
    </svg>
  );
}
