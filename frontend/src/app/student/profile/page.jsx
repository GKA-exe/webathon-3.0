"use client";
import { useEffect, useState } from "react";
// import axios from "axios";
import StudentQRCode from "../qrcode/page";
import { Loader2, AlertCircle, User, Mail, Phone, Home } from "lucide-react";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const user = localStorage.getItem("user");
    setProfile(JSON.parse(user));
    setLoading(false);
  }, [])

  const ProfileField = ({ icon, label, value, className = "" }) => {
    const Icon = icon;
    return (
      <div className={`space-y-1 ${className}`}>
        <p className="text-sm font-medium text-teritary flex items-center gap-1">
          <Icon size={16} className="opacity-70" /> {label}
        </p>
        <p className="text-lg font-medium" style={{ color: "var(--color-primary)" }}>
          {value || "—"}
        </p>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold text-center"
            style={{ color: "var(--color-primary)" }}
          >
            Student Profile
          </h1>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-nav rounded-xl shadow-lg p-6">
            <Loader2
              className="h-10 w-10 animate-spin mb-4"
              style={{ color: "var(--color-primary)" }}
            />
            <p className="text-lg font-medium">Loading your profile...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 bg-nav rounded-xl shadow-lg p-6 text-center">
            <AlertCircle
              className="h-10 w-10 mb-4 text-red-500"
            />
            <p className="text-lg font-medium text-red-500">{error}</p>
            <button
              className="mt-4 px-4 py-2 rounded-md font-medium text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
              onClick={() => {
                // Simulate retry with dummy data
                setLoading(true);
                setError(null);
                setTimeout(() => {
                  setProfile(dummyProfile);
                  setLoading(false);
                }, 1000);
              }}
            >
              Try Again
            </button>
          </div>
        ) : profile ? (
          <div className="bg-nav rounded-xl shadow-lg p-6 md:p-8 space-y-6 border border-primary/20">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileField 
                icon={User} 
                label="Full Name" 
                value={profile.name} 
              />
              {profile.room && (
                <ProfileField 
                  icon={Home} 
                  label="Room Number" 
                  value={profile.room} 
                />
              )}
              <ProfileField 
                icon={Phone} 
                label="Contact Number" 
                value={profile.contactNumber} 
              />
              <ProfileField 
                icon={Mail} 
                label="Email Address" 
                value={profile.email} 
                className="break-all" 
              />
            </div>

            {/* QR Code Section */}
            <div className="pt-6 border-t border-primary/10">
              <h2
                className="text-xl font-semibold mb-4 flex items-center gap-2"
                style={{ color: "var(--color-primary)" }}
              >
                Student QR Code
                <span className="text-sm font-normal opacity-70">(Show for attendance)</span>
              </h2>
              <div className="flex justify-center">
                <StudentQRCode studentId={profile.id} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-nav rounded-xl shadow-lg p-6">
            <AlertCircle className="h-10 w-10 mb-4 text-amber-500" />
            <p className="text-lg font-medium">No profile data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;