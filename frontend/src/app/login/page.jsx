"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("student"); // "student" or "admin"

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(16,185,129,0.15), transparent 80%)`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // navaneeth will handle this
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    animate(radius, 200, { duration: 0.5 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0a1f1a] to-slate-900 flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        onMouseMove={handleMouseMove}
        style={{ background }}
        className="relative bg-slate-800/50 backdrop-blur-2xl rounded-[2.5rem] p-8 w-full max-w-md border border-emerald-400/20 shadow-2xl shadow-emerald-900/10 hover:shadow-emerald-900/20 transition-all duration-500 group/form"
      >
        {isClient && (
          <div className="absolute inset-0 rounded-[2.5rem] -z-10 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-emerald-400/20 rounded-full"
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
          className="text-center mb-6 space-y-4 relative"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mb-6 animate-float inline-block"
          >
            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-400/10 hover:border-emerald-400/20 transition-colors duration-300">
              {userType === "student" ? (
                <svg className="w-10 h-10 text-emerald-400" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 4a4 4 0 014 4a4 4 0 01-4 4a4 4 0 01-4-4a4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"
                  />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-emerald-400" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 3L1 9l11 6l9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z"
                  />
                </svg>
              )}
            </div>
          </motion.div>
          <motion.h1
            initial={{ letterSpacing: "-0.02em" }}
            animate={{ letterSpacing: "-0.01em" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            className="text-4xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent"
          >
            {userType === "student" ? "Student Login" : "Admin Portal"}
          </motion.h1>
          <p className="text-slate-400/90 font-light mt-2">
            Enter your credentials to continue
          </p>
        </motion.div>

        {/* User Type Toggle */}
        <motion.div 
          className="flex justify-center mb-6 relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-slate-700/30 p-1 rounded-xl flex w-full max-w-xs">
            <button
              onClick={() => setUserType("student")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                userType === "student"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setUserType("admin")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                userType === "admin"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Administrator
            </button>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div className="group">
            <div className="relative bg-slate-700/30 border border-slate-600/30 rounded-xl overflow-hidden focus-within:border-emerald-400/50 transition-all duration-300">
              <label
                htmlFor="email"
                className="absolute left-3 top-2 text-xs font-medium text-emerald-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent pt-7 pb-3 px-3 text-slate-200 outline-none"
                placeholder="your.email@example.com"
                required
              />
              {email.includes("@") && (
                <motion.div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400"
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

          <motion.div className="group">
            <div className="relative bg-slate-700/30 border border-slate-600/30 rounded-xl overflow-hidden focus-within:border-emerald-400/50 transition-all duration-300">
              <label
                htmlFor="password"
                className="absolute left-3 top-2 text-xs font-medium text-emerald-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent pt-7 pb-3 px-3 text-slate-200 outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </motion.div>

          {userType === "admin" && (
            <motion.div 
              className="bg-slate-700/20 rounded-xl p-4 border border-emerald-400/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-amber-400 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z" />
                </svg>
                <span className="text-amber-300 text-sm font-medium">Admin Notice</span>
              </div>
              <p className="text-slate-400 text-xs">
                Remember that admin accounts have additional privileges. Please ensure you're authorized to access this portal.
              </p>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 bg-gradient-to-r rounded-xl font-semibold text-slate-900 relative overflow-hidden ${
              userType === "student"
                ? "from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400"
                : "from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="relative z-10"
              initial={{ opacity: 1 }}
              animate={{ opacity: isLoading ? 0 : 1 }}
            >
              {userType === "student" ? "Student Sign In" : "Admin Sign In"}
            </motion.span>
            {isLoading && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              </motion.div>
            )}
          </motion.button>

          <motion.div
            className="flex justify-between px-1 text-sm"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
          >
            <a
              href="#"
              className="text-slate-400/90 hover:text-emerald-300 transition-colors"
            >
              Forgot password?
            </a>
            {userType === "student" && (
              <a
                href="#"
                className="text-slate-400/90 hover:text-emerald-300 transition-colors"
              >
                Create account
              </a>
            )}
          </motion.div>
        </motion.form>

        <motion.div
          className="mt-6 text-center text-sm text-emerald-400/80"
          initial={false}
        >
          {isClient && (
            <>
              <span className="animate-pulse">🔒 Secure connection</span>
              <span className="mx-2">•</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}