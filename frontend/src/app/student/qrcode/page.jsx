"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const StudentQRCode = () => {
  // const [qrUrl, setQrUrl] = useState(null);
  const [student, setStudent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    setStudent(JSON.parse(user));
    setIsLoading(false);
  }, [])
  
  // useEffect(() => {
  //   setIsLoading(true);
  //   axios.get("/api/qr/:userId")
  //     .then(res => {
  //       setQrUrl(res.data.qr);
  //       setIsLoading(false);
  //     })
  //     .catch(err => {
  //       console.error("Failed to fetch QR code:", err);
  //       setError("Could not load your QR code. Please try again later.");
  //       setIsLoading(false);
  //     });
  // }, []);

  // const downloadQR = () => {
  //   if (!qrUrl) return;
    
  //   setDownloadStatus("Downloading...");
    
  //   const link = document.createElement("a");
  //   link.href = qrUrl;
  //   link.download = "my-qr-code.png";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
    
  //   setDownloadStatus("Downloaded!");
  //   setTimeout(() => setDownloadStatus(""), 2000);
  // };

  // const reloadQR = () => {
  //   setIsLoading(true);
  //   setError(null);
  //   axios.get("/api/qr/:userId")
  //     .then(res => {
  //       setQrUrl(res.data.qr);
  //       setIsLoading(false);
  //     })
  //     .catch(err => {
  //       console.error("Failed to fetch QR code:", err);
  //       setError("Could not load your QR code. Please try again later.");
  //       setIsLoading(false);
  //     });
  // };

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div 
        className="p-8 rounded-lg shadow-lg max-w-md w-full"
        style={{ 
          backgroundColor: "white",
          color: "var(--color-foreground)",
          border: "1px solid var(--color-secondary)"
        }}
      >
        <h1 
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "var(--color-primary)" }}
        >
          Your Student QR Code
        </h1>

        <div className="flex flex-col items-center">
          {isLoading ? (
            <div className="w-48 h-48 flex items-center justify-center">
              <div 
                className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
                style={{ borderColor: "var(--color-secondary)", borderTopColor: "transparent" }}
              ></div>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={reloadQR}
                className="px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div 
                className="mb-6 p-4 rounded-lg"
                style={{ backgroundColor: "var(--color-textc)" }}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_URL}${student.qrCodePath}`}
                  alt="Student QR Code"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <p 
                className="mt-6 text-sm text-center"
                style={{ color: "var(--color-teritary)" }}
              >
                Present this QR code for attendance and campus access
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentQRCode;