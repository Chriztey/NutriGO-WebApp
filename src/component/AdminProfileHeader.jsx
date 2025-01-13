import React from "react";

export default function AdminProfileHeader({
  name,
  totalUsers,
  date,
  onLogout = () => console.log("Logout clicked"),
}) {
  return (
    <div className="bg-white/50 backdrop-blur-lg border-none shadow-lg rounded-lg p-6">
      <div className="flex flex-row items-center space-x-4 pb-2">
        {/* <div className="h-20 w-20 rounded-full overflow-hidden border border-gray-300">
          <img
            src="/placeholder-avatar.jpg"
            alt="User"
            className="h-full w-full object-cover"
          />
        </div> */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">{name}</h2>
          <p className="text-sm text-indigo-700">
            R&D and Marketing Specialist
          </p>
        </div>
      </div>
      <div className="flex gap-8 text-sm text-indigo-800 mt-4">
        <div>
          <p className="font-semibold">Department:</p>
          <p>R&D and Marketing</p>
        </div>
        <div>
          <p className="font-semibold">Users:</p>
          <p>{totalUsers}</p>
        </div>
        {/* <div>
          <p className="font-semibold">Team Size:</p>
          <p>8 Members</p>
        </div> */}
      </div>
    </div>
  );
}
