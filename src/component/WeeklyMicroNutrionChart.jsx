import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { format, subDays } from "date-fns";
import { auth, db as firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const nutrients = [
  { key: "vitaminA", label: "Vitamin A (AKG)" },
  { key: "vitaminB1", label: "Vitamin B1 (AKG)" },
  { key: "vitaminB2", label: "Vitamin B2 (AKG)" },
  { key: "vitaminB3", label: "Vitamin B3 (AKG)" },
  { key: "vitaminB6", label: "Vitamin B6 (AKG)" },
  { key: "vitaminB12", label: "Vitamin B12 (AKG)" },
  { key: "vitaminC", label: "Vitamin C (AKG)" },
  { key: "vitaminD", label: "Vitamin D (AKG)" },
  { key: "vitaminE", label: "Vitamin E (AKG)" },
  { key: "vitaminK", label: "Vitamin K (AKG)" },
  { key: "iron", label: "Iron (g)" },
  { key: "calcium", label: "Calcium (g)" },
];

const VitaminChart = ({ selectedDate }) => {
  const [selectedNutrient, setSelectedNutrient] = useState(nutrients[0].key);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeeklyData = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true); // Start loading state
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
          return {
            date: dates[index],
            value: docData[selectedNutrient] || 0, // Fetch selected nutrient
          };
        } else {
          return {
            date: dates[index],
            value: 0,
          };
        }
      });

      setWeeklyData(data);
    } catch (error) {
      console.error("Error fetching weekly data:", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  useEffect(() => {
    fetchWeeklyData();
  }, [selectedNutrient, selectedDate]);

  const chartData = {
    labels: weeklyData.map((entry) => entry.date),
    datasets: [
      {
        label: nutrients.find((nutrient) => nutrient.key === selectedNutrient)
          ?.label,
        data: weeklyData.map((entry) => entry.value),
        borderColor: "#FF7F2A",
        backgroundColor: "rgba(255, 127, 42, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Dates",
        },
      },
      y: {
        title: {
          display: false,
          text: nutrients.find((nutrient) => nutrient.key === selectedNutrient)
            ?.label,
        },
        ticks: {
          beginAtZero: true, // Ensure y-axis starts at zero
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-6 max-w mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-blue-900 text-center">
        Weekly Micro-Nutrient Data
      </h2>

      {/* Dropdown for Nutrient Selection */}
      <select
        value={selectedNutrient}
        onChange={(e) => setSelectedNutrient(e.target.value)}
        className="p-2 mb-4 bg-gray-700 hover:bg-gray-500 text-white rounded-md cursor-pointer"
      >
        {nutrients.map((nutrient) => (
          <option key={nutrient.key} value={nutrient.key}>
            {nutrient.label}
          </option>
        ))}
      </select>

      {/* Loading Indicator or Chart */}
      {loading ? (
        <p className="text-center text-gray-500 animate-bounce text-xl">
          Loading data...
        </p>
      ) : weeklyData.length > 0 ? (
        <div className="w-full h-[400px] md:h-[500px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p className="text-center text-red-500">
          No data available for this week.
        </p>
      )}
    </div>
  );
};

export default VitaminChart;
