import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const SampleVitaminAverageWeeklyChart = ({ weeklyNutritionData }) => {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const formattedData = weeklyNutritionData.map((data) => {
      const vitaminKeys = Object.keys(data).filter((key) =>
        key.includes("vitamin")
      );
      const averageValue =
        vitaminKeys.reduce((sum, key) => sum + data[key], 0) /
        vitaminKeys.length;

      return {
        day: data.date,
        average: averageValue || 0,
      };
    });
    setWeeklyData(formattedData);
  }, [weeklyNutritionData]);

  return (
    <div className="bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Weekly Average Vitamin Fulfillment
          </h2>
          <p className="text-sm text-gray-500">
            Average percentage of daily recommended intake for all vitamins
          </p>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} barSize={20}>
              <XAxis dataKey="day" stroke="#888888" fontSize={12} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickFormatter={(value) => `${value.toFixed(2)}%`}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg bg-white p-2 shadow-md">
                        <p className="font-semibold">
                          {payload[0].payload.day}
                        </p>
                        <p className="text-sm">
                          Average:{" "}
                          <span className="font-medium">
                            {payload[0].value.toFixed(2)}%
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="average"
                radius={[4, 4, 0, 0]}
                fill="hsl(214, 62%, 51%)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SampleVitaminAverageWeeklyChart;
