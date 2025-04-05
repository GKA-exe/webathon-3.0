// StatsSection.jsx - Container for stat cards
import React from "react";

export const StatsSection = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#647c90] text-white p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="p-6 grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
};
