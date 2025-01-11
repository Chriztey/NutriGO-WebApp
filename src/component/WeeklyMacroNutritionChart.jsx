import React, { useState, useEffect, useCallback } from "react";
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

const macronutrients = [
  { key: "calories", label: "Calories (kcal)" },
  { key: "protein", label: "Protein (g)" },
  { key: "fat", label: "Fat (g)" },
  { key: "carbs", label: "Carbohydrates (g)" },
  { key: "fiber", label: "Fiber (g)" },
];

const MacronutrientChart = ({ selectedDate }) => {
  const [selectedMacronutrient, setSelectedMacronutrient] = useState(
    macronutrients[0].key
  );
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeeklyData = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true); // Start loading
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
            value: docData[selectedMacronutrient] || 0,
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
      setLoading(false); // Stop loading
    }
  }, [selectedDate, selectedMacronutrient]);

  useEffect(() => {
    fetchWeeklyData();
  }, [fetchWeeklyData]);

  const chartData = {
    labels: weeklyData.map((entry) => entry.date),
    datasets: [
      {
        label: macronutrients.find((n) => n.key === selectedMacronutrient)
          ?.label,
        data: weeklyData.map((entry) => entry.value),
        borderColor: "#6E0D25",
        backgroundColor: "rgba(255, 127, 42, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

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
          text: macronutrients.find((n) => n.key === selectedMacronutrient)
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
      <h2 className="text-2xl text-blue-900 md:text-4xl font-bold mb-4  text-center">
        Weekly Macro-Nutrient Data
      </h2>

      <select
        value={selectedMacronutrient}
        onChange={(e) => setSelectedMacronutrient(e.target.value)}
        className="p-2 mb-4 bg-gray-700 hover:bg-gray-500 text-white rounded-md cursor-pointer"
      >
        {macronutrients.map((n) => (
          <option key={n.key} value={n.key}>
            {n.label}
          </option>
        ))}
      </select>

      {loading ? (
        <p className="text-center text-gray-500 animate-bounce text-xl">
          Loading data...
        </p>
      ) : (
        <div className="w-full h-[400px] md:h-[500px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default MacronutrientChart;
