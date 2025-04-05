import React from 'react';

export const StatCard = ({ icon, count, label }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#a0bcd1] bg-opacity-20 rounded-lg">
      {icon}
      <span className="text-3xl font-bold text-[#4e4f50]">{count}</span>
      <span className="text-[#746c70] text-sm mt-1">{label}</span>
    </div>
  );
};
