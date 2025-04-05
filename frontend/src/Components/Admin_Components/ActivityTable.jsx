// ActivityTable.jsx - Reusable activity table component
import React from "react";

export const ActivityItem = ({ title, time, description, badges = null }) => {
  return (
    <div className="border-b border-[#e2ded0] pb-3">
      <div className="flex justify-between">
        <div>
          {" "}
          {/*title and description */}
          <span className="font-medium text-[#4e4f50]">{title}</span>
          <p className="text-[#746c70] text-sm mt-1">{description}</p>
        </div>
        {/* Badges display. Conditionall rendering */}
        <div>
          {badges && badges.length > 0 && (
            <div className="flex space-x-2">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${badge.color}`}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="text-[#746c70] text-sm">{time}</span>
      </div>
    </div>
  );
};

export const ActivityTable = ({ title, activities }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-auto h-[450px]">
      <div className="bg-[#647c90] text-white p-4 sticky top-0 z-10">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <ActivityItem
              key={index}
              title={activity.title}
              time={activity.time}
              description={activity.description}
              badges ={activity.badges}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
