import React from "react";

export default function StatCard({ title, value, icon, color, unit = "" }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <div
          className={`w-10 h-10 ${color} rounded-full flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-800">
        {value}
        <span className="text-xl ml-1">{unit}</span>
      </p>
      <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${Math.min((value / 100) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
