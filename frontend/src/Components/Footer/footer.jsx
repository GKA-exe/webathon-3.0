import Link from 'next/link';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-primary text-textc mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-secondary">NARKAM Hostel</h3>
            <p className="text-sm opacity-90">
              Providing quality student accommodation and services since 2025.
            </p>
            <div className="flex items-center space-x-2 mt-4">
              <MapPinIcon className="h-5 w-5 text-secondary" />
              <span className="text-sm">123 Campus Road, Academic City</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-secondary">Quick Links</h4>
            <nav className="space-y-2">
              <Link href="/about" className="block text-sm opacity-90 hover:text-secondary transition-colors">
                About Us
              </Link>
              <Link href="/rooms" className="block text-sm opacity-90 hover:text-secondary transition-colors">
                Room Types
              </Link>
              <Link href="/facilities" className="block text-sm opacity-90 hover:text-secondary transition-colors">
                Facilities
              </Link>
              <Link href="/contact" className="block text-sm opacity-90 hover:text-secondary transition-colors">
                Visit Us
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-secondary">Resources</h4>
            <nav className="space-y-2">
              <Link href="/faq" className="block text-sm opacity-90 hover:text-secondary transition-colors">
                FAQ
              </Link>
              <Link href="/blog" className="block text-sm opacity-90 hover:text-secondary transition-colors">
                Blog
              </Link>
              <Link href="/docs" className="block text-sm opacity-90 hover:text-secondary transition-colors">
                Documentation
              </Link>
              <Link href="/support" className="block text-sm opacity-90 hover:text-secondary transition-colors">
                Support
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-secondary">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-5 w-5 text-secondary" />
                <span className="text-sm">+1 (234) 567-890</span>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="h-5 w-5 text-secondary" />
                <span className="text-sm">support@narkam.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5 text-secondary" />
                <div className="text-sm">
                  <p>Mon-Fri: 8am - 6pm</p>
                  <p>Sat: 9am - 4pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm opacity-75">
              © 2025 NARKAM Hostel. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm opacity-75 hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm opacity-75 hover:text-secondary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}