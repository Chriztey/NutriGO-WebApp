"use client";

import { Camera, ClipboardCheck, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function KeyFeatures() {
  const features = [
    {
      Icon: Camera,
      title: "Nutrition Tracker",
      descriptionId:
        "Pencatatan asupan harian cukup dengan mengirimkan foto makanan melalui Whatsapp.",
      descriptionEn:
        "Daily intake tracking is as simple as sending a photo of food through WhatsApp.",
    },
    {
      Icon: ClipboardCheck,
      title: "Automatic Diagnosis",
      descriptionId:
        "Diagnosis kecukupan asupan sehari-hari berdasarkan kalori, makronutrien, dan mikronutrien secara otomatis.",
      descriptionEn:
        "Automatic diagnosis of daily intake adequacy based on calories, macronutrients, and micronutrients.",
    },
    {
      Icon: Search,
      title: "Recommendation System",
      descriptionId:
        "Sistem rekomendasi produk suplemen yang dipersonalisasi kepada pengguna yang kekurangan asupan mikronutrien.",
      descriptionEn:
        "A personalized supplement product recommendation system for users with micronutrient deficiencies.",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-green-100 to-blue-100 py-20 px-4 relative overflow-hidden">
      {/* Subtle grid pattern for background */}
      <div className="absolute inset-0 bg-grid-slate-200/50 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

      <div className="max-w-6xl mx-auto relative">
        {/* Animated Section Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-blue-900 mb-16 italic text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Do We Do?
        </motion.h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => {
            const { Icon } = feature;
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Icon Container with Gradient Background */}
                <div className="mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-[#FCDDF2] flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  <Icon className="w-12 h-12 text-white" />
                </div>

                {/* Feature Title */}
                <h3 className="text-2xl font-semibold text-blue-900 mb-4 uppercase">
                  {feature.title}
                </h3>

                {/* Descriptions */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {feature.descriptionId}
                </p>
                <p className="text-gray-600 text-sm italic">
                  {feature.descriptionEn}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
