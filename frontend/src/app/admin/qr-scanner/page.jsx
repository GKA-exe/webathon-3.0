import React from "react";
import QRScanner from "@/Components/Admin_Components/QR_Scanner";
import { Building, Info, User } from "lucide-react";

const QRScanPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resident Verification</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Scan resident QR codes to verify access privileges and update check-in status
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* QR Scanner */}
          <div>
            <QRScanner />
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 text-blue-500" size={24} />
              Scanning Instructions
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium mb-2 text-blue-800">How to Scan</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Click "Start Scanning" to activate the camera</li>
                  <li>Position the QR code within the frame</li>
                  <li>Hold steady until the code is recognized</li>
                  <li>Wait for verification to complete</li>
                </ol>
              </div>

              <div>
                <h3 className="font-medium mb-2">Common Issues</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Ensure adequate lighting for best results</li>
                  <li>Clean your camera lens if scanning fails</li>
                  <li>Make sure the QR code is not damaged</li>
                  <li>Contact admin if verification fails repeatedly</li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-start">
                  <User className="text-gray-500 mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Access Control</h4>
                    <p className="text-sm text-gray-600">
                      This scanner verifies resident access permissions for your hostel facilities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start mt-4">
                  <Building className="text-gray-500 mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Hostel Management System</h4>
                    <p className="text-sm text-gray-600">
                      Part of the digital access control and resident management solution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Need help? Contact the hostel administration desk or call support at (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
};

export default QRScanPage;
