"use client";

import { useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { User, Mail, Lock, Phone, Shield, CheckCircle, Loader2, Menu } from "lucide-react";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);
  
  // Modified the background template to include light blue as the base color
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(100, 124, 144, 0.1), #e6f7ff 80%)`;

  useEffect(() => {
    setIsClient(true);
    calculatePasswordStrength(formData.password);
  }, [formData.password]);

  const calculatePasswordStrength = (value) => {
    let strength = 0;
    if (value.length >= 8) strength++;
    if (value.match(/[A-Z]/)) strength++;
    if (value.match(/[0-9]/)) strength++;
    if (value.match(/[^A-Za-z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptedTerms) {
      setError("You must accept the terms and conditions");
      return;
    }

    setIsLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData,
          userType: "student" 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactNumber: ""
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    animate(radius, 200, { duration: 0.5 });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-[#e2ded0] text-[#4e4f50]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#1e2939] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl text-textc">
                NARKAM
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-textc hover:text-[#a0bcd1] px-3 py-2 rounded-md font-medium transition-colors">
                Home
              </Link>
              <Link
                href="/login"
                className="text-textc hover:text-[#a0bcd1] px-3 py-2 rounded-md font-medium"
              >
                Sign In
              </Link>
              <Link href="/register" className="bg-[#647c90] text-[#e2ded0] px-4 py-2 rounded-md font-medium hover:bg-[#a0bcd1] transition-colors">
                Register
              </Link>
            </div>

            <div className="flex md:hidden items-center">
              <button
                type="button"
                className="text-[#647c90] hover:text-[#a0bcd1] transition-colors"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#e2ded0] shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-[#647c90] hover:text-[#a0bcd1] hover:bg-[#d5d2c4] transition-colors">
                Home
              </Link>
              <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-[#647c90] hover:text-[#a0bcd1] hover:bg-[#d5d2c4] transition-colors">
                Register
              </Link>
              <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-[#647c90] hover:text-[#a0bcd1] hover:bg-[#d5d2c4] transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-xl border border-[#647c90]/30 hover:shadow-2xl transition-all duration-300">
          {/* Illustration Section */}
          <motion.div 
            className="bg-[#647c90] text-[#e2ded0] p-8 md:p-12 flex flex-col justify-center md:w-1/2 border-r border-[#647c90]/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#a0bcd1]/10 rounded-full -mt-20 -mr-32 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#4e4f50]/10 rounded-full -mb-10 -ml-20 blur-xl" />
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Community</h1>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-[#a0bcd1] flex-shrink-0" />
                  <span>Secure account management</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-[#a0bcd1] flex-shrink-0" />
                  <span>24/7 student support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-[#a0bcd1] flex-shrink-0" />
                  <span>Personalized dashboard</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Form Section - Changed background color to light blue */}
          <motion.div
            onMouseMove={handleMouseMove}
            style={{ backgroundColor: "#E5E1DA", ...background }}
            className="relative p-8 w-full md:w-1/2 transition-all duration-300 group/form shadow-inner"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isClient && (
              <div className="absolute inset-0 -z-10 overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-[#647c90]/10 rounded-full"
                    initial={{
                      x: Math.random() * 100 + "%",
                      y: Math.random() * 100 + "%",
                    }}
                    animate={{
                      x: Math.random() * 100 + "%",
                      y: Math.random() * 100 + "%",
                    }}
                    transition={{
                      duration: Math.random() * 5 + 5,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                ))}
              </div>
            )}

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#4e4f50] mb-2">
                  Student Registration
                </h2>
                <p className="text-[#4e4f50]/80">
                  Please fill in all required fields
                </p>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#4e4f50]/80">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#e2ded0] border border-[#647c90]/30 rounded-xl py-3 px-4 text-[#4e4f50] placeholder-[#4e4f50]/50 focus:border-[#4e4f50] focus:ring-1 focus:ring-[#4e4f50]/50 outline-none transition-all duration-200 shadow-sm pr-12"
                    placeholder="John Doe"
                    required
                  />
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#647c90]/50" />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#4e4f50]/80">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#e2ded0] border border-[#647c90]/30 rounded-xl py-3 px-4 text-[#4e4f50] placeholder-[#4e4f50]/50 focus:border-[#4e4f50] focus:ring-1 focus:ring-[#4e4f50]/50 outline-none transition-all duration-200 shadow-sm pr-12"
                    placeholder="student@institution.edu"
                    required
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#647c90]/50" />
                </div>
              </div>

              {/* Contact Number Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#4e4f50]/80">Contact Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full bg-[#e2ded0] border border-[#647c90]/30 rounded-xl py-3 px-4 text-[#4e4f50] placeholder-[#4e4f50]/50 focus:border-[#4e4f50] focus:ring-1 focus:ring-[#4e4f50]/50 outline-none transition-all duration-200 shadow-sm pr-12"
                    placeholder="+1 234 567 890"
                    pattern="[+]{0,1}[0-9\s]{10,15}"
                    required
                  />
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#647c90]/50" />
                </div>
              </div>

              {/* Password Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#4e4f50]/80">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-[#e2ded0] border border-[#647c90]/30 rounded-xl py-3 px-4 text-[#4e4f50] placeholder-[#4e4f50]/50 focus:border-[#4e4f50] focus:ring-1 focus:ring-[#4e4f50]/50 outline-none transition-all duration-200 shadow-sm pr-12"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#647c90]/50 hover:text-[#4e4f50] transition-colors"
                    >
                      <Lock className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#4e4f50]/80">Confirm Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-[#e2ded0] border border-[#647c90]/30 rounded-xl py-3 px-4 text-[#4e4f50] placeholder-[#4e4f50]/50 focus:border-[#4e4f50] focus:ring-1 focus:ring-[#4e4f50]/50 outline-none transition-all duration-200 shadow-sm pr-12"
                      placeholder="••••••••"
                      required
                    />
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#647c90]/50" />
                  </div>
                </div>
              </div>

              {/* Password Strength Indicator */}
              <div className="flex gap-1 mt-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 w-full rounded-full transition-colors ${
                      passwordStrength > i ? "bg-[#647c90]" : "bg-[#647c90]/20"
                    }`}
                  />
                ))}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-5 h-5 rounded border-[#647c90]/30 text-[#647c90] focus:ring-[#647c90]"
                />
                <span className="text-sm text-[#4e4f50]/80">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#647c90] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#647c90] hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-[#647c90]/10 text-red-600 rounded-lg border border-red-200 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-[#647c90]/10 text-green-600 rounded-lg border border-green-200 text-sm"
                >
                  Registration successful! Check your email for verification.
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading || !acceptedTerms}
                className="w-full py-3 px-6 bg-[#4e4f50] text-[#a0bcd1] rounded-xl font-medium hover:bg-[#3d3e3f] transition-colors duration-200 flex items-center justify-center gap-2 relative overflow-hidden border border-[#4e4f50]/70 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Register Now</span>
                  </>
                )}
              </motion.button>

              <p className="text-center text-sm text-[#4e4f50]/80">
                Already have an account?{" "}
                <Link href="/login" className="text-[#647c90] font-medium hover:underline">
                  Sign in here
                </Link>
              </p>
            </motion.form>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#647c90] text-[#e2ded0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#e2ded0]/90">
            © 2025 NARKAM. All rights reserved. |{" "}
            <Link href="/contact" className="hover:text-[#a0bcd1] transition-colors">
              Contact Support
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}