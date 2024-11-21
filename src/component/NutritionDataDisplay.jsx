import { ChevronLeft, ChevronRight } from "lucide-react";
import DatePicker from "react-datepicker";

const NutritionDataDisplay = ({
  nutritionData,
  selectedDate,
  handlePrevDate,
  handleNextDate,
  handleDateChange,
  loading,
}) => {
  // const [date, setDate] = useState(new Date());

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
      value: "vitaminb1",
      unit: "AKG",
      max: 15,
    },
    {
      name: "Vitamin B2",
      value: "vitaminb2",
      unit: "AKG",
      max: 10,
    },
    {
      name: "Vitamin B3",
      value: "vitaminb3",
      unit: "AKG",
      max: 10,
    },
    {
      name: "Vitamin B6",
      value: "vitaminb6",
      unit: "AKG",
      max: 10,
    },
    {
      name: "Vitamin B12",
      value: "vitaminb12",
      unit: "AKG",
      max: 5,
    },
    {
      name: "Vitamin C",
      value: "vitaminc",
      unit: "AKG",
      max: 60,
    },
    {
      name: "Vitamin D",
      value: "vitamind",
      unit: "AKG",
      max: 5,
    },
    {
      name: "Vitamin E",
      value: "vitamine",
      unit: "AKG",
      max: 10,
    },
    {
      name: "Vitamin K",
      value: "vitamink",
      unit: "AKG",
      max: 10,
    },
    { name: "Iron", value: "iron", unit: "g", max: 3 },
    { name: "Calcium", value: "calcium", unit: "g", max: 100 },
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
    <div>
      {!loading ? (
        <div className="w-full p-4 space-y-4">
          {/* Header */}
          <div className="md:flex items-center justify-between max-w-">
            <h2 className="text-2xl font-semibold">Nutrition Data for</h2>
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

          {/* Nutrient Cards */}

          <div>
            {nutritionData ? (
              <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">Macronutrients</h3>
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
                      <div className="h-2 bg-orange-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{
                            width: `${
                              (nutritionData[nutrient.value]
                                ? nutritionData[nutrient.value]
                                : 0 / nutrient.max) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Vitamins and Minerals
                  </h3>
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
                              (nutritionData[vitamin.value]
                                ? nutritionData[vitamin.value]
                                : 0 / vitamin.max) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-red-500 text-center pt-16">
                No data added on this date
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600 pt-16 animate-bounce">
          Loading Data...
        </p>
      )}
    </div>
  );
};

export default NutritionDataDisplay;
