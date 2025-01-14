import React, { useState } from "react";

import { Bold, ChevronLeft, ChevronRight } from "lucide-react";
import DatePicker from "react-datepicker";
import {
  AlertTriangle,
  Apple,
  Carrot,
  Droplet,
  Fish,
  Leaf,
  Zap,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import VitaminPieChart from "./PieChart";
import AdsPlaceholder from "../asset/ads_placeholder.png";
import VitaminAverageWeeklyChart from "./VitaminAverageWeeklyChart";
import VitaminFulfillmentCard from "./VitaminFullfilmentCard";
import DietRecommendationCard from "./DietRecommendation";
import SampleVitaminAverageWeeklyChart from "./SampleVitaminAverageWeeklyChart";

const SampleNutritionDataDisplay = ({
  nutritionData,
  weeklyData,
  selectedDate,
  handlePrevDate,
  handleNextDate,
  handleDateChange,
  loading,
}) => {
  // const [date, setDate] = useState(new Date());

  const COLORS = ["#FF8042", "#00C49F", "#FFBB28"];
  const [isExpandedVitamins, setIsExpandedVitamins] = useState(false);
  const [isExpandedMacronutrients, setIsExpandedMacronutrients] =
    useState(false);

  const macronutrients = [
    {
      name: "Calories",
      value: "calories",
      unit: "kcal",
      max: 2000,
    },
    { name: "Protein", value: "protein" || 0, unit: "g", max: 50 },
    { name: "Fat", value: "fat" || 0, unit: "g", max: 70 },
    {
      name: "Carbohydrates",
      value: "carbs",
      unit: "g",
      max: 300,
    },
    { name: "Fiber", value: "fiber", unit: "g", max: 30 },
  ];

  const vitamins = [
    {
      name: "Vitamin A",
      value: "vitaminA",
      unit: "AKG",
      max: 5,
    },
    {
      name: "Vitamin B1",
      value: "vitaminB1",
      unit: "AKG",
      max: 15,
    },
    {
      name: "Vitamin B2",
      value: "vitaminB2",
      unit: "AKG",
      max: 10,
    },
    {
      name: "Vitamin B3",
      value: "vitaminB3",
      unit: "AKG",
      max: 10,
    },
    {
      name: "Vitamin B6",
      value: "vitaminB6",
      unit: "AKG",
      max: 10,
    },
    {
      name: "Vitamin B12",
      value: "vitaminB12",
      unit: "AKG",
      max: 5,
    },
    {
      name: "Vitamin C",
      value: "vitaminC",
      unit: "AKG",
      max: 60,
    },
    {
      name: "Vitamin D",
      value: "vitaminD",
      unit: "AKG",
      max: 5,
    },
    {
      name: "Vitamin E",
      value: "vitaminE",
      unit: "AKG",
      max: 10,
    },
    {
      name: "Vitamin K",
      value: "vitaminK",
      unit: "AKG",
      max: 10,
    },
    { name: "Iron", value: "iron", unit: "g", max: 3 },
    { name: "Calcium", value: "calcium", unit: "g", max: 100 },
  ];

  const lowestVitamins = nutritionData
    ? Object.keys(nutritionData)
        .filter((key) => key.startsWith("vitamin")) // Filter only vitamin keys
        .map((key) => ({ name: key, value: nutritionData[key] })) // Map to an array of objects with vitamin name and value
        .sort((a, b) => a.value - b.value) // Sort by value in ascending order
        .slice(0, 3) // Take the first 3 lowest vitamins
    : []; // Return an empty array if nutritionData is null or undefined

  console.log("Top 3 lowest vitamins:", lowestVitamins);

  const dietRecommendations = [
    {
      category: "Fruits",
      icon: Apple,
      color: "text-red-500",
      items: ["Oranges", "Kiwi", "Strawberries"],
      benefit: "Rich in Vitamin C",
    },
    {
      category: "Vegetables",
      icon: Carrot,
      color: "text-orange-500",
      items: ["Spinach", "Kale", "Broccoli"],
      benefit: "High in Vitamins A, K, and folate",
    },
    {
      category: "Proteins",
      icon: Fish,
      color: "text-blue-500",
      items: ["Salmon", "Eggs", "Lean meats"],
      benefit: "Good source of Vitamin B12 and D",
    },
  ];

  return (
    <div>
      {!loading ? (
        <div className="w-full p-4 space-y-4">
          {/* Header */}
          <div className="md:flex items-center justify-center max-w gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Nutrition Data for
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevDate}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="p-2 bg-gray-100 rounded-md shadow-sm">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="p-2 bg-gray-200 hover:bg-gray-400 text-slate-900 rounded-md cursor-pointer text-center"
                />
              </div>
              <button
                onClick={handleNextDate}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Vitamin Chart */}

          <div className=" bg-gray-50 p-4 md:p-8">
            <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-2">
              {nutritionData ? (
                <div className="shadow-lg border p-4 rounded-lg">
                  <div className="mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Vitamin Comparison
                    </h2>
                    <p className="text-sm text-gray-500 pb-4">
                      Pie chart showing the lowest value among 10 vitamins
                    </p>
                  </div>

                  {lowestVitamins.map((vitamin, index) => (
                    <VitaminFulfillmentCard
                      key={vitamin.name}
                      vitamin={vitamin}
                      index={index}
                    />
                  ))}

                  {/*PieChart Code to Display lowest 3 fullfilment*/}

                  {/* <div className="h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip formatter={(value) => `${value}`} />
                        <Pie
                          data={lowestVitamins}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={200}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {lowestVitamins.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                              stroke={index === 0 ? "#000" : "none"}
                              strokeWidth={index === 0 ? 2 : 0}
                            />
                          ))}
                        </Pie>
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div> */}
                </div>
              ) : (
                <div className="bg-yellow-400 shadow-lg p-4 rounded-lg flex items-center justify-center min-h-[300px]">
                  <p className="text-2xl font-medium text-yellow-900">
                    Ad Space Placeholder
                  </p>
                </div>
              )}

              <div className="bg-yellow-400 shadow-lg p-4 rounded-lg flex items-center justify-center min-h-[300px]">
                <p className="text-2xl font-medium text-yellow-900">
                  Ad Space Placeholder
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-3">
            {dietRecommendations.map((recommendation) => (
              <DietRecommendationCard
                key={recommendation.category}
                recommendation={recommendation}
              />
            ))}
          </div>

          {/* <div className="md:flex items-center justify-center max-w gap-4">
            {lowestVitamins.map((vitamin, index) => (
              <VitaminFulfillmentCard
                key={vitamin.name}
                vitamin={vitamin}
                index={index}
              />
            ))}
          </div> */}

          <SampleVitaminAverageWeeklyChart
            weeklyNutritionData={weeklyData}
          ></SampleVitaminAverageWeeklyChart>

          {/* Nutrient Cards */}

          <div className="mx-auto max-w-7xl shadow-lg border p-4 rounded-lg flex items-center justify-center ">
            <p className="text-xl font-semibold text-gray-900">
              View Your Nutrition Record
            </p>
          </div>

          {nutritionData ? (
            <div className="mx-auto max-w-7xl bg-gradient-to-br from-gray-150 to-gray-250 rounded-lg shadow-md p-6 transition-all duration-300">
              {/* Vitamins Section */}
              <div className="flex flex-row items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Vitamins and Minerals</h3>
                <button
                  onClick={() => setIsExpandedVitamins(!isExpandedVitamins)}
                  className="hover:bg-black/5 p-2 rounded"
                >
                  {isExpandedVitamins ? "▲" : "▼"}
                </button>
              </div>
              <div
                className={`grid gap-4 transition-all duration-300 ${
                  isExpandedVitamins ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  {vitamins.map((vitamin, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between text-sm">
                        <span>{vitamin.name}</span>
                        <span>
                          {nutritionData[vitamin.value]
                            ? nutritionData[vitamin.value]
                            : 0}{" "}
                          {vitamin.unit}
                        </span>
                      </div>
                      <div className="h-2 bg-[#e789a1] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#e83562] rounded-full"
                          style={{
                            width: `${
                              ((nutritionData[vitamin.value]
                                ? nutritionData[vitamin.value]
                                : 0) /
                                vitamin.max) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Macronutrients Section */}
              <div className="flex flex-row items-center justify-between mt-6 mb-4">
                <h3 className="text-xl font-bold">Macronutrients</h3>
                <button
                  onClick={() =>
                    setIsExpandedMacronutrients(!isExpandedMacronutrients)
                  }
                  className="hover:bg-black/5 p-2 rounded"
                >
                  {isExpandedMacronutrients ? "▲" : "▼"}
                </button>
              </div>
              <div
                className={`grid gap-4 transition-all duration-300 ${
                  isExpandedMacronutrients
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  {macronutrients.map((nutrient, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between text-sm">
                        <span>{nutrient.name}</span>
                        <span>
                          {nutritionData[nutrient.value]
                            ? nutritionData[nutrient.value]
                            : 0}{" "}
                          {nutrient.unit}
                        </span>
                      </div>
                      <div className="h-2 bg-[#85c1e9] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#3498db] rounded-full"
                          style={{
                            width: `${
                              ((nutritionData[nutrient.value]
                                ? nutritionData[nutrient.value]
                                : 0) /
                                nutrient.max) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-7xl  p-4  flex items-center justify-center">
              <p className="text-xl font-semibold text-gray-900">
                No Data Added On This Date
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600 pt-16 animate-bounce">
          Loading Data...
        </p>
      )}
    </div>
  );
};

export default SampleNutritionDataDisplay;
