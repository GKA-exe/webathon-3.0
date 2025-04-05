"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { Menu, X, User, Lock, Shield } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("student");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(100, 124, 144, 0.1), transparent 80%)`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    animate(radius, 200, { duration: 0.5 });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-[#e2ded0] text-[#4e4f50]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#e2ded0] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl text-[#647c90] hover:text-[#a0bcd1] transition-colors">
                NARKAM
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-[#647c90] hover:text-[#a0bcd1] px-3 py-2 rounded-md font-medium transition-colors">
                Home
              </Link>
              <Link href="/register" className="text-[#647c90] hover:text-[#a0bcd1] px-3 py-2 rounded-md font-medium transition-colors">
                Register
              </Link>
              <Link href="/login" className="bg-[#647c90] text-[#e2ded0] px-4 py-2 rounded-md font-medium hover:bg-[#a0bcd1] transition-colors">
                Sign In
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
          {/* Left Side - Welcome Content */}
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#a0bcd1]/10 rounded-full -mt-20 -mr-32 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#4e4f50]/10 rounded-full -mb-10 -ml-20 blur-xl"></div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome Back!</h1>
              <p className="text-xl mb-8 text-[#e2ded0]/90">
                Continue your learning journey with NARKAM. Access your courses, track your progress, and connect with fellow students.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#a0bcd1] p-2 rounded-lg text-[#647c90] shadow-md">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Personalized Learning</h3>
                    <p className="text-[#e2ded0]/80">Tailored courses designed for your individual needs</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-[#a0bcd1] p-2 rounded-lg text-[#647c90] shadow-md">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L1 21H23L12 2ZM12 16C11.45 16 11 15.55 11 15C11 14.45 11.45 14 12 14C12.55 14 13 14.45 13 15C13 15.55 12.55 16 12 16ZM13 14H11V8H13V14Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Progress Tracking</h3>
                    <p className="text-[#e2ded0]/80">Monitor your achievements and stay motivated</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-[#a0bcd1] p-2 rounded-lg text-[#647c90] shadow-md">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Community Support</h3>
                    <p className="text-[#e2ded0]/80">Connect with peers and instructors for guidance</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 hidden md:block">
                <div className="p-6 bg-[#4e4f50]/10 rounded-xl border border-[#e2ded0]/20 shadow-inner">
                  <p className="text-[#e2ded0]/90 italic">
                    "NARKAM has transformed how I approach learning. The platform is intuitive and the resources are exceptional."
                  </p>
                  <p className="mt-2 font-medium">— Alex D., Student</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Side - Login Form */}
          <motion.div
            onMouseMove={handleMouseMove}
            style={{ background }}
            className="relative bg-[#a0bcd1] p-8 w-full md:w-1/2 transition-all duration-300 group/form shadow-inner"
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mb-6 inline-block"
              >
                <div className="p-4 rounded-2xl bg-[#647c90]/10 border border-[#647c90]/30 hover:border-[#4e4f50]/50 transition-colors duration-300 shadow-md">
                  {userType === "student" ? (
                    <User className="w-10 h-10 text-[#4e4f50]" />
                  ) : (
                    <Shield className="w-10 h-10 text-[#4e4f50]" />
                  )}
                </div>
              </motion.div>
              <h1 className="text-3xl font-bold text-[#4e4f50] mb-2">
                {userType === "student" ? "Student Login" : "Admin Portal"}
              </h1>
              <p className="text-[#4e4f50]/80">
                Enter your credentials to continue
              </p>
            </motion.div>

            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-[#d5d2c4] p-1 rounded-xl flex w-full max-w-xs border border-[#647c90]/30 shadow-md">
                <button
                  onClick={() => setUserType("student")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    userType === "student"
                      ? "bg-[#4e4f50] text-[#a0bcd1] shadow-sm"
                      : "text-[#4e4f50] hover:text-[#647c90]"
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setUserType("admin")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    userType === "admin"
                      ? "bg-[#4e4f50] text-[#a0bcd1] shadow-sm"
                      : "text-[#4e4f50] hover:text-[#647c90]"
                  }`}
                >
                  Administrator
                </button>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-[#4e4f50]/80">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#e2ded0] border border-[#647c90]/30 rounded-xl py-3 px-4 text-[#4e4f50] placeholder-[#4e4f50]/50 focus:border-[#4e4f50] focus:ring-1 focus:ring-[#4e4f50]/50 outline-none transition-all duration-200 shadow-sm"
                    placeholder="your.email@example.com"
                    required
                  />
                  {email.includes("@") && (
                    <motion.div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#647c90]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium text-[#4e4f50]/80">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#e2ded0] border border-[#647c90]/30 rounded-xl py-3 px-4 text-[#4e4f50] placeholder-[#4e4f50]/50 focus:border-[#4e4f50] focus:ring-1 focus:ring-[#4e4f50]/50 outline-none transition-all duration-200 shadow-sm"
                    placeholder="••••••••"
                    required
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#647c90]/50" />
                </div>
              </motion.div>

              {userType === "admin" && (
                <motion.div
                  className="bg-[#647c90]/10 rounded-xl p-4 border border-[#4e4f50]/20 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center mb-1">
                  <Shield className="w-4 h-4 text-[#4e4f50] mr-2" />
                    <span className="text-sm font-medium text-[#746c70]">Admin Notice</span>
                  </div>
                  <p className="text-xs text-[#4e4f50]/70">
                    Admin accounts have elevated privileges. Ensure you're authorized to access this portal.
                  </p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-[#4e4f50] text-[#a0bcd1] rounded-xl font-medium hover:bg-[#3d3e3f] transition-colors duration-200 flex items-center justify-center relative overflow-hidden border border-[#4e4f50]/70 shadow-md"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <motion.span
                  className="relative z-10"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isLoading ? 0 : 1 }}
                >
                  {userType === "student" ? "Sign In" : "Admin Login"}
                </motion.span>
                {isLoading && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-5 h-5 border-2 border-[#e2ded0] border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                  </motion.div>
                )}
              </motion.button>

              <motion.div
                className="flex justify-between pt-2 text-sm"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/forgot-password"
                  className="text-[#4e4f50]/70 hover:text-[#647c90] transition-colors"
                >
                  Forgot password?
                </Link>
                {userType === "student" && (
                  <Link
                    href="/register"
                    className="text-[#4e4f50]/70 hover:text-[#647c90] transition-colors"
                  >
                    Create account
                  </Link>
                )}
              </motion.div>
            </motion.form>

            {isClient && (
              <motion.div
              className="mt-8 pt-4 border-t border-[#647c90]/20 text-xs text-[#4e4f50]/50 flex items-center justify-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span>🔒 Secure connection</span>
                <span>•</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#647c90] text-[#e2ded0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-[#e2ded0]/90">
                © 2025 NARKAM. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-[#e2ded0]/90 hover:text-[#a0bcd1] transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-[#e2ded0]/90 hover:text-[#a0bcd1] transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-[#e2ded0]/90 hover:text-[#a0bcd1] transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}