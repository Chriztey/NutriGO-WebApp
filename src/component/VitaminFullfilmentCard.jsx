import React from "react";
import { AlertTriangle, Droplet, Zap } from "lucide-react";
import { formatVitaminName } from "../helper/FormatVitaminName";

const VitaminFulfillmentCard = ({ vitamin, index }) => {
  const ListIcon = [AlertTriangle, Droplet, Zap];
  const ListColor = ["text-yellow-500", "text-blue-500", "text-orange-500"];
  const Icon = ListIcon[index];
  const Color = ListColor[index];
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center ">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${Color} bg-opacity-10 mr-4`}
      >
        <Icon className={`h-6 w-6 ${Color}`} />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold">{formatVitaminName(vitamin.name)}</h3>
        <p className="text-sm text-gray-500">Fulfillment: {vitamin.value}%</p>
      </div>
      <div className={`text-2xl font-bold ml-8 ${Color}`}>#{index + 1}</div>
    </div>
  );
};

export default VitaminFulfillmentCard;
