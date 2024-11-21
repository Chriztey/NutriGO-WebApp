"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Apple, Carrot, Egg, Fish, Grape } from "lucide-react";
import Logo from "../asset/nutrigologo.png";

export default function NutritionLoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 40
      );
    }, 600);

    return () => clearInterval(timer);
  }, []);

  const foodIcons = [Apple, Carrot, Egg, Fish, Grape];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center">
      {/* App Name */}

      <img src={Logo} className="w-1/5 mx-auto" alt="loading"></img>

      {/* Icon Animation */}
      <div className="relative w-64 h-64 justify-center">
        {foodIcons.map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute top-1/2 left-1/2"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: Math.cos((index / foodIcons.length) * Math.PI * 2) * 80,
              y: Math.sin((index / foodIcons.length) * Math.PI * 2) * 80,
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-12 h-12 text-green-500" />
          </motion.div>
        ))}

        {/* Central Pulse Animation */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 bg-green-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Progress Bar */}
      <div className="mt-8 w-64 bg-gray-200 rounded-full h-4 overflow-hidden">
        <motion.div
          className="h-full bg-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Loading Message */}
      <div className="mt-2 text-gray-600">Loading your data...</div>
    </div>
  );
}
