"use client";
import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { entryQrValidator, exitQrValidator } from "@/api/qrvalidator";
import { CheckCircle, XCircle } from "lucide-react"; // Optional icons for tick/cross

const QrCodeScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState("entry");
  const [modal, setModal] = useState({
    visible: false,
    success: null,
    message: "",
  });

  const handleScan = async (result) => {
    try {
      const data = JSON.parse(result[0].rawValue);
      console.log(data);

      if (data.email) {
        setEmail(data.email);
        let response = false;

        if (mode === "entry") {
          response = await entryQrValidator(data.email);
          setModal({
            visible: true,
            success: response,
            message: response ? "Entry Marked Successfully" : "Failed to Mark Entry",
          });
        } else if (mode === "exit") {
          response = await exitQrValidator(data.email);
          setModal({
            visible: true,
            success: response,
            message: response ? "Exit Marked Successfully" : "Failed to Mark Exit",
          });
        } else {
          console.error("Invalid mode.");
        }

        setScanning(false);
      } else {
        alert("Invalid QR Code. 'email' field missing.");
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-[350px] relative">
        {/* Mode Selector */}
        <div className="mb-4">
          <label className="block text-sm text-black mb-1">Select Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="text-black w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="entry" className="text-black">Mark Entry</option>
            <option value="exit" className="text-black">Mark Exit</option>
          </select>
        </div>

        {/* Scanner Info */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h6v6H3V3zm0 12h6v6H3v-6zm12-12h6v6h-6V3zm0 12h6v6h-6v-6z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-700">QR Code Scanner</h2>
          <p className="text-sm text-gray-500">Tap below to start scanning</p>
        </div>

        {/* Scan Button or Scanner */}
        {!scanning ? (
          <button
            onClick={() => setScanning(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center justify-center w-full hover:bg-blue-600 transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-4.553a1 1 0 00-1.414-1.414L13 8.586V3a1 1 0 10-2 0v5.586L5.861 4.033a1 1 0 00-1.414 1.414L9 10H3a1 1 0 100 2h6l-4.553 4.553a1 1 0 101.414 1.414L11 13.414V21a1 1 0 102 0v-7.586l4.553 4.553a1 1 0 001.414-1.414L15 12h6a1 1 0 100-2h-6z"
              />
            </svg>
            Start Scanning
          </button>
        ) : (
          <div className="mt-4">
            <Scanner
              onScan={handleScan}
              onError={(error) => console.error(error)}
              className="rounded-md"
            />
            <button
              onClick={() => setScanning(false)}
              className="mt-4 text-sm text-red-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        )}

        {email && (
          <p className="mt-6 text-sm text-green-600">
            ✅ Last scanned email: <strong>{email}</strong>
          </p>
        )}

        {/* Modal */}
        {modal.visible && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 rounded-xl z-10">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[280px] text-center">
              {modal.success ? (
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
              ) : (
                <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
              )}
              <h3 className="text-lg font-semibold text-gray-800">{modal.message}</h3>
              <button
                onClick={() => setModal({ visible: false, success: null, message: "" })}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCodeScanner;
