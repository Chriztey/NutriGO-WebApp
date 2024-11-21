import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const NutritionDataDisplay = ({
  nutritionData,
  date,
  handlePrevDate,
  handleNextDate,
  handleDateChange,
}) => {
  // const [date, setDate] = useState(new Date());

  const macronutrients = [
    {
      name: "Calories",
      value: nutritionData.calories || 0,
      unit: "kcal",
      max: 2000,
    },
    { name: "Protein", value: nutritionData.protein || 0, unit: "g", max: 50 },
    { name: "Fat", value: nutritionData.fat || 0, unit: "g", max: 70 },
    {
      name: "Carbohydrates",
      value: nutritionData.carbs || 0,
      unit: "g",
      max: 300,
    },
    { name: "Fiber", value: nutritionData.fiber || 0, unit: "g", max: 30 },
  ];

  const vitamins = [
    {
      name: "Vitamin A",
      value: nutritionData.vitaminA || 0,
      unit: "AKG",
      max: 5,
    },
    {
      name: "Vitamin B1",
      value: nutritionData.vitaminb1 || 0,
      unit: "AKG",
      max: 15,
    },
    {
      name: "Vitamin B2",
      value: nutritionData.vitaminb2 || 0,
      unit: "AKG",
      max: 10,
    },
    {
      name: "Vitamin B3",
      value: nutritionData.vitaminb3 || 0,
      unit: "AKG",
      max: 10,
    },
    {
      name: "Vitamin B6",
      value: nutritionData.vitaminb6 || 0,
      unit: "AKG",
      max: 10,
    },
    {
      name: "Vitamin B12",
      value: nutritionData.vitaminb12 || 0,
      unit: "AKG",
      max: 5,
    },
    {
      name: "Vitamin C",
      value: nutritionData.vitaminc || 0,
      unit: "AKG",
      max: 60,
    },
    {
      name: "Vitamin D",
      value: nutritionData.vitamind || 0,
      unit: "AKG",
      max: 5,
    },
    {
      name: "Vitamin E",
      value: nutritionData.vitamine || 0,
      unit: "AKG",
      max: 10,
    },
    {
      name: "Vitamin K",
      value: nutritionData.vitamink || 0,
      unit: "AKG",
      max: 10,
    },
    { name: "Iron", value: nutritionData.iron || 0, unit: "g", max: 3 },
    { name: "Calcium", value: nutritionData.calcium || 0, unit: "g", max: 100 },
  ];

  // const formatDate = (date) => date.toISOString().split("T")[0];

  // const nextDay = () => {
  //   const next = new Date(date);
  //   next.setDate(next.getDate() + 1);
  //   setDate(next);
  // };

  // const previousDay = () => {
  //   const prev = new Date(date);
  //   prev.setDate(prev.getDate() - 1);
  //   setDate(prev);
  // };

  return (
    <div className="w-full p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold">Nutrition Data for</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevDate}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="p-2 bg-gray-100 rounded-md shadow-sm">
            <Calendar
              className="inline-block h-4 w-4 mr-2 text-gray-600"
              onClick={handleDateChange}
            />
            {date}
          </div>
          <button
            onClick={handleNextDate}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Nutrient Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Macronutrients</h3>
          {macronutrients.map((nutrient, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between text-sm">
                <span>{nutrient.name}</span>
                <span>
                  {nutrient.value} {nutrient.unit}
                </span>
              </div>
              <div className="h-2 bg-orange-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{
                    width: `${(nutrient.value / nutrient.max) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Vitamins and Minerals</h3>
          {vitamins.map((vitamin, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between text-sm">
                <span>{vitamin.name}</span>
                <span>
                  {vitamin.value} {vitamin.unit}
                </span>
              </div>
              <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{
                    width: `${(vitamin.value / vitamin.max) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionDataDisplay;
