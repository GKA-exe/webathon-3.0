"use client";
import { useState } from "react";

const StudentLaundry = () => {
  // Dummy data instead of fetching from an API
  const dummyLaundryData = {
    id: "LDY2854",
    date: "April 8, 2025",
    time: "3:00 PM - 4:00 PM",
    machine: "Washer #3",
    status: "Scheduled",
    progressMinutes: 0,
    totalMinutes: 60
  };

  const [laundryInfo, setLaundryInfo] = useState(dummyLaundryData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancel = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setLaundryInfo({
        ...laundryInfo,
        status: "Cancelled"
      });
      setIsLoading(false);
      setShowCancelModal(false);
    }, 800);
  };

  const startLaundry = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setLaundryInfo({
        ...laundryInfo,
        status: "In Progress",
        progressMinutes: 15
      });
      setIsLoading(false);
    }, 800);
  };

  const scheduleLaundry = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setLaundryInfo(dummyLaundryData);
      setIsLoading(false);
    }, 800);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "scheduled":
        return {
          bg: "var(--color-secondary)",
          text: "var(--color-foreground)"
        };
      case "in progress":
        return {
          bg: "#FEF3C7", // Amber light
          text: "#92400E"  // Amber dark
        };
      case "completed":
        return {
          bg: "#D1FAE5", // Green light
          text: "#065F46"  // Green dark
        };
      case "cancelled":
        return {
          bg: "#FEE2E2", // Red light
          text: "#B91C1C"  // Red dark
        };
      default:
        return {
          bg: "var(--color-textc)",
          text: "var(--color-foreground)"
        };
    }
  };

  const formatTimeRemaining = () => {
    if (!laundryInfo || laundryInfo.status.toLowerCase() !== "in progress") return null;
    
    const minutesRemaining = laundryInfo.totalMinutes - laundryInfo.progressMinutes;
    return `${minutesRemaining} minutes remaining`;
  };

  const getProgressPercentage = () => {
    if (!laundryInfo || laundryInfo.status.toLowerCase() !== "in progress") return 0;
    return (laundryInfo.progressMinutes / laundryInfo.totalMinutes) * 100;
  };

  const canCancel = laundryInfo?.status.toLowerCase() === "scheduled";
  const canStart = laundryInfo?.status.toLowerCase() === "scheduled";
  const timeRemaining = formatTimeRemaining();
  const progressPercentage = getProgressPercentage();

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 md:p-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-lg mx-auto">
        <h1 
          className="text-2xl md:text-3xl font-bold mb-2 text-center"
          style={{ color: "var(--color-primary)" }}
        >
          Laundry Service
        </h1>
        <p 
          className="text-center mb-6"
          style={{ color: "var(--color-teritary)" }}
        >
          Check your scheduled laundry details
        </p>

        {isLoading ? (
          <div 
            className="bg-white rounded-lg shadow-md p-8 flex justify-center items-center"
            style={{ minHeight: "200px" }}
          >
            <div 
              className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: "var(--color-secondary)", borderTopColor: "transparent" }}
            ></div>
          </div>
        ) : error ? (
          <div 
            className="bg-white rounded-lg shadow-md p-6"
            style={{ border: "1px solid #FCA5A5" }}
          >
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => setError(null)}
              className="px-4 py-2 rounded-md text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Try Again
            </button>
          </div>
        ) : laundryInfo.status.toLowerCase() === "cancelled" ? (
          <div 
            className="bg-white rounded-lg shadow-md p-6 text-center"
            style={{ border: "1px solid var(--color-secondary)" }}
          >
            <p style={{ color: "var(--color-teritary)" }}>
              Your laundry booking has been cancelled.
            </p>
            <button
              className="mt-4 px-4 py-2 rounded-md text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
              onClick={scheduleLaundry}
            >
              Schedule New Laundry
            </button>
          </div>
        ) : (
          <div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            style={{ border: "1px solid var(--color-secondary)" }}
          >
            <div 
              className="p-4 border-b"
              style={{ borderColor: "var(--color-secondary)", backgroundColor: "var(--color-textc)" }}
            >
              <div className="flex justify-between items-center">
                <h2 
                  className="text-xl font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  Your Laundry Details
                </h2>
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: getStatusColor(laundryInfo.status).bg,
                    color: getStatusColor(laundryInfo.status).text
                  }}
                >
                  {laundryInfo.status}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm" style={{ color: "var(--color-teritary)" }}>
                    Scheduled Date
                  </label>
                  <p className="font-medium text-black">{laundryInfo.date}</p>
                </div>
                <div>
                  <label className="block text-sm" style={{ color: "var(--color-teritary)" }}>
                    Time Slot
                  </label>
                  <p className="font-medium text-black">{laundryInfo.time}</p>
                </div>
                <div>
                  <label className="block text-sm" style={{ color: "var(--color-teritary)" }}>
                    Machine Number
                  </label>
                  <p className="font-medium text-black">{laundryInfo.machine}</p>
                </div>
                <div>
                  <label className="block text-sm" style={{ color: "var(--color-teritary)" }}>
                    Laundry ID
                  </label>
                  <p className="font-medium text-black">{laundryInfo.id}</p>
                </div>
              </div>

              {timeRemaining && (
                <div 
                  className="mt-4 p-3 rounded-md"
                  style={{ backgroundColor: "var(--color-textc)" }}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="font-medium">{timeRemaining}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${progressPercentage}%`,
                        backgroundColor: "var(--color-primary)"
                      }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t flex flex-wrap gap-2 justify-between items-center" style={{ borderColor: "var(--color-textc)" }}>
                {canStart && (
                  <button
                    className="px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                    onClick={startLaundry}
                  >
                    Start Laundry
                  </button>
                )}
                
                <button
                  className="px-4 py-2 rounded-md text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                  onClick={scheduleLaundry}
                >
                  {laundryInfo.status.toLowerCase() === "completed" ? "Schedule New" : "Refresh"}
                </button>
                
                {canCancel && (
                  <button
                    className="px-4 py-2 rounded-md border"
                    style={{ 
                      borderColor: "#EF4444",
                      color: "#EF4444" 
                    }}
                    onClick={() => setShowCancelModal(true)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions Card */}
        <div 
          className="mt-6 bg-white rounded-lg shadow-md p-5"
          style={{ border: "1px solid var(--color-secondary)" }}
        >
          <h3 
            className="text-lg font-semibold mb-3"
            style={{ color: "var(--color-primary)" }}
          >
            Laundry Instructions
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: "var(--color-foreground)" }}>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Please arrive 5 minutes before your scheduled time
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Remove your laundry promptly when the cycle completes
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Cancellations must be made at least 2 hours before the scheduled time
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              For assistance, contact hostel administration at ext. 4567
            </li>
          </ul>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
            style={{ border: "1px solid var(--color-secondary)" }}
          >
            <h3 
              className="text-lg font-semibold mb-3"
              style={{ color: "var(--color-primary)" }}
            >
              Cancel Laundry Booking
            </h3>
            <p className="mb-4" style={{ color: "var(--color-foreground)" }}>
              Are you sure you want to cancel your laundry booking for {laundryInfo.date} at {laundryInfo.time}?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-md"
                style={{ 
                  backgroundColor: "var(--color-textc)",
                  color: "var(--color-foreground)" 
                }}
                onClick={() => setShowCancelModal(false)}
              >
                Keep Booking
              </button>
              <button
                className="px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: "#EF4444" }}
                onClick={handleCancel}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLaundry;