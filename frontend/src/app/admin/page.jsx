import React from "react";
import {
  CircleUser,
  UserMinus,
  AlertCircle,
  CheckCircle,
  Home,
  UserPlus,
} from "lucide-react";
import { StatCard } from "@/Components/Admin_Components/StatCard";
import { StatsSection } from "@/Components/Admin_Components/StatsSection";
import { ActivityTable } from "@/Components/Admin_Components/ActivityTable";
import { DashboardContainer } from "../../Components/Admin_Components/DashboardContainer";
import HomePassesTable from "@/Components/Admin_Components/HomePassesTable";
import PendingComplaintsTable from "@/Components/Admin_Components/PendingComplaintsTable";

const HostelDashboard = () => {
  // These would be replaced with actual data from your backend
  const stats = {
    studentsPresent: 156,
    studentsOnLeave: 24,
    complaintsRaised: 12,
    complaintsCleared: 8,
    vacantRooms: 15,
    waitingListCount: 32,
  };

  // Sample data for recent activities
  const recentActivities = [
    {
      title: "New complaint filed",
      time: "10 mins ago",
      description: "Room 302 - Plumbing issue reported",
    },
    {
      title: "Student leave request",
      time: "1 hour ago",
      description: "John Doe (ID: 2023045) - 3 days leave",
      badges: ["Network Issue", "Resolved"],
    },
    {
      title: "Complaint resolved",
      time: "3 hours ago",
      description: "Room 210 - Wi-Fi connectivity fixed",
      badges: ["Network Issue", "Resolved"],
    },
  ];

  // Sample data for another table
  const pendingApprovals = [
    {
      title: "Room Change Request",
      time: "Yesterday",
      description: "Sarah Johnson (ID: 2023078) - Change to single room",
    },
    {
      title: "Extended Leave",
      time: "2 days ago",
      description: "Mike Chen (ID: 2022134) - 2 week extension",
    },
  ];

  return (
    <div className="bg-background">
      <DashboardContainer title="Hostel Management Dashboard" subtitle="Admin Overview Panel">
        {/* Student Status Section */}
        <StatsSection title="Student Status">
          <StatCard
            icon={<CircleUser className="text-[#647c90] mb-2" size={36} />}
            count={stats.studentsPresent}
            label="Students Present"
          />

          <StatCard
            icon={<UserMinus className="text-[#647c90] mb-2" size={36} />}
            count={stats.studentsOnLeave}
            label="Students on Leave"
          />
        </StatsSection>

        {/* Complaints Section */}
        <StatsSection title="Complaints">
          <StatCard
            icon={<AlertCircle className="text-[#647c90] mb-2" size={36} />}
            count={stats.complaintsRaised}
            label="Raised"
          />
          <StatCard
            icon={<CheckCircle className="text-[#647c90] mb-2" size={36} />}
            count={stats.complaintsCleared}
            label="Cleared"
          />
        </StatsSection>

        {/* Room Status Section */}
        <StatsSection title="Room Status">
          <StatCard
            icon={<Home className="text-[#647c90] mb-2" size={36} />}
            count={stats.vacantRooms}
            label="Vacant Rooms"
          />
          <StatCard
            icon={<UserPlus className="text-[#647c90] mb-2" size={36} />}
            count={stats.waitingListCount}
            label="Waiting List"
          />
        </StatsSection>

        {/* Pending Complaints */}
        <div className="col-span-full mt-8">
          <HomePassesTable />
        </div>
        {/* Example of adding components outside the grid */}
        <div className="col-span-full mt-8">
          <PendingComplaintsTable />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default HostelDashboard;
