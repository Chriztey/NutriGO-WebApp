import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = {
  monthly: [
    { name: "Vitamin D", value: 45 },
    { name: "Vitamin B12", value: 30 },
    { name: "Vitamin C", value: 25 },
  ],
  yearly: [
    { name: "Vitamin A", value: 40 },
    { name: "Vitamin E", value: 35 },
    { name: "Vitamin K", value: 25 },
  ],
  allTime: [
    { name: "Vitamin B6", value: 50 },
    { name: "Vitamin B9", value: 30 },
    { name: "Vitamin B3", value: 20 },
  ],
};

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

const VitaminsPieChart = () => {
  const [timeFrame, setTimeFrame] = useState("monthly");

  return (
    <div className="bg-white/50 backdrop-blur-lg border-none shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-900">
          Top 3 Less Fulfilled Vitamins
        </h2>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="allTime">All Time</option>
        </select>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data[timeFrame]}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data[timeFrame].map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VitaminsPieChart;
