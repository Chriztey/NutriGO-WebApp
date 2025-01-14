import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { auth, db as firestore } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import { format, addDays, subDays } from "date-fns";

import Macronutrients from "../component/WeeklyMacroNutritionChart";
import VitaminChart from "../component/WeeklyMicroNutrionChart";
import ProfileHeader from "../component/ProfileHeader";
import NutritionDataDisplay from "../component/NutritionDataDisplay.jsx";
import NutritionLoadingScreen from "../component/Loading.jsx";
import VitaminPieChart from "../component/PieChart.jsx";
import SampleNutritionDataDisplay from "../component/SampleNutritionDataDisplay.jsx";

const generateWeeklyNutritionData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, index) => ({
    date: format(addDays(new Date(), index - 6), "yyyy-MM-dd"),
    calories: Math.floor(Math.random() * 300 + 1200),
    carbs: Math.floor(Math.random() * 100 + 150),
    fat: Math.floor(Math.random() * 50 + 30),
    fiber: Math.floor(Math.random() * 20 + 5),
    iron: Math.floor(Math.random() * 2 + 1),
    protein: Math.floor(Math.random() * 50 + 20),
    vitaminA: Math.floor(Math.random() * 5 + 1),
    vitaminB1: Math.floor(Math.random() * 15 + 1),
    vitaminB2: Math.floor(Math.random() * 10 + 1),
    vitaminB3: Math.floor(Math.random() * 10 + 1),
    vitaminB6: Math.floor(Math.random() * 10 + 1),
    vitaminB12: Math.floor(Math.random() * 5 + 1),
    vitaminC: Math.floor(Math.random() * 60 + 1),
    vitaminD: Math.floor(Math.random() * 5 + 1),
    vitaminE: Math.floor(Math.random() * 10 + 1),
    vitaminK: Math.floor(Math.random() * 10 + 1),
  }));
};

function SampleUserDashboard() {
  const [weeklyNutritionData] = useState(generateWeeklyNutritionData());
  const [todayNutritionData] = useState(weeklyNutritionData[6]);
  const [nutritionData, setNutritionData] = useState(weeklyNutritionData[6]);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const navigate = useNavigate();

  const currentDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const foundData = weeklyNutritionData.find((data) => data.date === date);
    setNutritionData(foundData || {});
  };

  const handlePreviousDate = () => {
    const prevDate = subDays(new Date(selectedDate), 1);
    handleDateChange(format(prevDate, "yyyy-MM-dd"));
  };

  const handleNextDate = () => {
    const nextDate = addDays(new Date(selectedDate), 1);
    handleDateChange(format(nextDate, "yyyy-MM-dd"));
  };

  const logout = () => {
    try {
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="bg-[#FCDDF2] min-h-screen text-[#0C4767] flex flex-col items-center p-6">
      <div className="w-full max-w-8xl p-6 bg-white rounded-lg shadow-lg">
        {/* Profile Header */}
        <ProfileHeader
          name="Jane Doe"
          phone="+6282256968995"
          date={currentDate}
          todayNutritionData={todayNutritionData ? todayNutritionData : 0}
          onLogout={logout}
          onEditProfile={() => navigate("/")}
        />

        <SampleNutritionDataDisplay
          nutritionData={nutritionData}
          weeklyData={weeklyNutritionData}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          handleNextDate={handleNextDate}
          handlePrevDate={handlePreviousDate}
        ></SampleNutritionDataDisplay>

        {/* <NutritionDataDisplay
          nutritionData={nutritionData}
          weeklyData={weeklyNutritionData}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          handleNextDate={handleNextDate}
          handlePrevDate={handlePreviousDate}
          
        ></NutritionDataDisplay> */}
      </div>

      <ToastContainer />
    </div>
  );
}

export default SampleUserDashboard;
