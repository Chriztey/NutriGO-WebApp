import React, { useEffect, useState } from "react";
import LogoDummy from "../asset/nutrigo_dark.png";
import { auth, provider } from "../firebase";

import { signInWithPopup } from "firebase/auth";

const Hero = () => {
  const [value, setValue] = useState("");

  const handleClick = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const user = data.user;
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      console.log(`User document created for UID: ${user.uid}`);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.log("The sign-in popup was closed by the user.");
      } else {
        console.error("An unexpected error occurred during sign-in:", error);
      }
    }
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });

  return (
    <div className="relative text-center">
      {/* Top section with light pink background and dark blue heading */}
      <div className="bg-gradient-to-br from-[#FCDDF2] to-green-100 p-8">
        {/* <h1 className="text-5xl font-bold text-[#0C4767]">
          NutriGo
        </h1> */}

        <img src={LogoDummy} className="w-250 h-auto mx-auto mt-8" alt="Logo" />
        <p className="font-light italic text-2xl mt-4 text-[#6E0D25]">
          application for easy tracking and analysis of nutritional intake,
          along with personalized micronutrient supplement recommendations.
        </p>
      </div>

      {/* Bottom section with button */}
      <div className="w-full  bg-green-100 pt-16 pb-4">
        <button
          className="bg-[#FF7F2A] text-white font-semibold rounded-md p-4 w-1/2 md:w-1/4 hover:bg-[#6E0D25]"
          onClick={() => handleClick().catch(console.error)}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
