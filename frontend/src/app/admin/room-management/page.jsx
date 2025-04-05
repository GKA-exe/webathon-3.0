"use client";
import { useState } from "react";
import NewApplicationsTable from "@/Components/Admin_Components/NewApplicationsTable";
import VacateApplicationsTable from "@/Components/Admin_Components/VacateApplicationsTable";
import RoomDetails from "@/Components/Admin_Components/RoomDetails";

export default function RoomManagement() {
  const [showNewApplications, setShowNewApplications] = useState(true);
  const [showVacateApplications, setShowVacateApplications] = useState(true);
  const [showRoomDetails, setShowRoomDetails] = useState(true);

  return (
    <div className="min-h-screen bg-[#e2ded0] text-[#4e4f50]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-[#647c90]">Room Management</h1>

        <div className="flex flex-col gap-8">
          {/* Room Details Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="bg-[#647c90] text-[#eceae4] px-4 py-3 flex justify-between items-center cursor-pointer"
              onClick={() => setShowRoomDetails(!showRoomDetails)}
            >
              <h2 className="text-xl font-semibold">Room Details</h2>
              <span>{showRoomDetails ? "▼" : "►"}</span>
            </div>
            {showRoomDetails && (
              <div className="p-4">
                <RoomDetails />
              </div>
            )}
          </div>

          {/* New Applications Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="bg-[#647c90] text-[#eceae4] px-4 py-3 flex justify-between items-center cursor-pointer"
              onClick={() => setShowNewApplications(!showNewApplications)}
            >
              <h2 className="text-xl font-semibold">New Applications</h2>
              <span>{showNewApplications ? "▼" : "►"}</span>
            </div>
            {showNewApplications && (
              <div className="p-4">
                <NewApplicationsTable />
              </div>
            )}
          </div>

          {/* Vacate Applications Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="bg-[#647c90] text-[#eceae4] px-4 py-3 flex justify-between items-center cursor-pointer"
              onClick={() => setShowVacateApplications(!showVacateApplications)}
            >
              <h2 className="text-xl font-semibold">Hostel Vacate Applications</h2>
              <span>{showVacateApplications ? "▼" : "►"}</span>
            </div>
            {showVacateApplications && (
              <div className="p-4">
                <VacateApplicationsTable />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
