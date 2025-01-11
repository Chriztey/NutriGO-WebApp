import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const vitaminData = [
  { name: "Vitamin A", value: 1000 },
  { name: "Vitamin B", value: 800 },
  { name: "Vitamin C", value: 1200 },
];

const COLORS = ["#FF8042", "#00C49F", "#FFBB28"];

const VitaminPieChart = () => {
  const lowestVitamin = vitaminData.reduce((min, vitamin) =>
    vitamin.value < min.value ? vitamin : min
  );

  return (
    <div className="w-full max-w-lg border p-4 rounded-lg shadow-lg">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Vitamin Comparison</h2>
        <p className="text-gray-600">
          Pie chart showing the lowest value among 3 vitamins
        </p>
      </div>
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip formatter={(value) => `${value} mcg`} />
            <Pie
              data={vitaminData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {vitaminData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke={entry.name === lowestVitamin.name ? "#000" : "none"}
                  strokeWidth={entry.name === lowestVitamin.name ? 2 : 0}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        {vitaminData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 mr-1"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span
              className={entry.name === lowestVitamin.name ? "font-bold" : ""}
            >
              {entry.name}: {entry.value} mcg
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VitaminPieChart;
