import React, { useState, useEffect, useCallback } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { auth, db as firestore } from "../firebase"; // Ensure correct Firebase import
import { format, subDays } from "date-fns";
import { doc, getDoc } from "firebase/firestore";

const VitaminAverageWeeklyChart = ({ selectedDate }) => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeeklyData = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    const promises = [];
    const dates = [];

    for (let i = 6; i >= 0; i--) {
      const date = subDays(selectedDate, i);
      dates.push(format(date, "yyyy-MM-dd"));

      const docRef = doc(
        firestore,
        `users/${user.uid}/nutritionData/${format(date, "yyyy-MM-dd")}`
      );
      promises.push(getDoc(docRef));
    }

    try {
      const results = await Promise.all(promises);
      const data = results.map((docSnap, index) => {
        if (docSnap.exists()) {
          const docData = docSnap.data();
          const vitaminKeys = Object.keys(docData).filter((key) =>
            key.includes("vitamin")
          );
          const averageValue =
            vitaminKeys.reduce((sum, key) => sum + docData[key], 0) /
            vitaminKeys.length;

          return {
            day: dates[index],
            average: averageValue || 0,
          };
        } else {
          return {
            day: dates[index],
            average: 0,
          };
        }
      });

      setWeeklyData(data);
    } catch (error) {
      console.error("Error fetching weekly data:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchWeeklyData();
  }, [fetchWeeklyData]);

  return (
    <div className=" bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Weekly Average Vitamin Fulfillment
          </h2>
          <p className="text-sm text-gray-500">
            Average percentage of daily recommended intake for all vitamins
          </p>
        </div>
        {loading ? (
          <p className="text-center text-gray-500 animate-bounce text-xl">
            Loading data...
          </p>
        ) : (
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barSize={20}>
                <XAxis
                  dataKey="day"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 100]}
                />
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                />
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
        )}
      </div>
    </div>
  );
};

export default VitaminAverageWeeklyChart;
