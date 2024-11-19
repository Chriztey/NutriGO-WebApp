import React from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/user-form"); // Redirect to the form page
  };

  return (
    <div className="bg-[#FCDDF2] min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-[#0C4767] mb-4">Welcome!</h1>
      <p className="text-lg text-[#0C4767] mb-6">
        To get started, we need some basic information from you.
      </p>
      <button
        onClick={handleStart}
        className="px-6 py-3 bg-[#FF7F2A] text-white rounded-md hover:bg-[#6E0D25]"
      >
        Fill Out Profile
      </button>
    </div>
  );
};

export default Onboarding;
