import React from "react";
import StatCard from "./StatCard";
import {
  User,
  Calendar,
  Phone,
  Utensils,
  Dumbbell,
  Droplet,
  Torus,
} from "lucide-react";
import { useState, useEffect } from "react";
import DropdownMenuComponent from "./UserProfileDropdown";

export default function ProfileHeader({
  name,
  phone,
  date,
  todayNutritionData,
  onLogout = () => console.log("Logout clicked"),
  onEditProfile = () => console.log("Edit profile clicked"),
  //   calories,
  //   carbs,
  //   fat,
  //   protein,
  //   fiber,
}) {
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fats, setFats] = useState(0);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setCalories(todayNutritionData.calories);
      setProtein(todayNutritionData.protein);
      setFats(todayNutritionData.fat);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w space-y-6">
        {/* User Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-500">Welcome back!</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 ml-auto">
              <DropdownMenuComponent
                onLogout={onLogout}
                onEditProfile={onEditProfile}
              ></DropdownMenuComponent>
              {/* <p className="text-end">Test Test</p> */}

              <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm font-medium text-gray-600">
                    {date}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm font-medium text-gray-600">
                    {phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Utensils className="w-5 h-5" />
              Today's Macronutrients
            </h3>
            <p className="text-3xl font-bold">
              {todayNutritionData
                ? `${
                    todayNutritionData.calories +
                    todayNutritionData.protein +
                    todayNutritionData.fat +
                    todayNutritionData.carbs +
                    todayNutritionData.fiber
                  } g`
                : "No Data"}
            </p>
          </div>

          <StatCard
            title="Calories"
            value={
              todayNutritionData.calories ? todayNutritionData.calories : 0
            }
            icon={<Utensils className="w-5 h-5" />}
            color="bg-yellow-500"
            unit="g"
          />

          <StatCard
            title="Protein"
            value={todayNutritionData.protein ? todayNutritionData.protein : 0}
            icon={<Dumbbell className="w-5 h-5" />}
            color="bg-green-500"
            unit="g"
          />

          <StatCard
            title="Fats"
            value={todayNutritionData.fat ? todayNutritionData.fat : 0}
            icon={<Droplet className="w-5 h-5" />}
            color="bg-red-500"
            unit="g"
          />

          <StatCard
            title="Carbs"
            value={todayNutritionData.carbs ? todayNutritionData.carbs : 0}
            icon={<Torus className="w-5 h-5" />}
            color="bg-orange-500"
            unit="g"
          />
        </div>
      </div>
    </div>
  );
}
