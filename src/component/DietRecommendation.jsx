import React from "react";

const DietRecommendationCard = ({ recommendation }) => {
  const Icon = recommendation.icon;
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="pb-2">
        <div className="flex items-center text-lg font-semibold">
          <Icon className={`h-5 w-5 ${recommendation.color} mr-2`} />
          {recommendation.category}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">{recommendation.benefit}</p>
        <div className="flex flex-wrap gap-2">
          {recommendation.items.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DietRecommendationCard;
