import React from "react";
import AdminProfileHeader from "../component/AdminProfileHeader";
import MarketingStrategies from "../component/MarketingStrategies";
import VitaminsPieChart from "../component/PieChart";

function SampleAdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <AdminProfileHeader
          name="Jane Doe"
          totalUsers="10"
        ></AdminProfileHeader>
        <div className="grid md:grid-cols-2 gap-8">
          <VitaminsPieChart></VitaminsPieChart>
          <MarketingStrategies></MarketingStrategies>
        </div>
      </div>
    </div>
  );
}

export default SampleAdminDashboard;
