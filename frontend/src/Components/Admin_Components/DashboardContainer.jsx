// DashboardContainer.jsx - Main container component
import React from "react";

export const DashboardContainer = ({ title, subtitle, children }) => {
  return (
    <div className="bg-background min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#4e4f50]">{title}</h1>
        <p className="text-[#746c70] mt-2">{subtitle}</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
    </div>
  );
};
