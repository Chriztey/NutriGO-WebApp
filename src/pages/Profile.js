import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { auth, db as firestore } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import { format, addDays, subDays } from "date-fns";

import Macronutrients from "../component/WeeklyMacroNutritionChart";
import VitaminChart from "../component/WeeklyMicroNutrionChart";
import ProfileHeader from "../component/ProfileHeader";
import NutritionDataDisplay from "../component/NutritionDataDisplay.jsx";
import NutritionLoadingScreen from "../component/Loading.jsx";
import VitaminPieChart from "../component/PieChart.jsx";

function Dashboard() {
  const [nutritionData, setNutritionData] = useState(null);
  const [todayNutritionData, setTodayNutritionData] = useState(null);
  const [recommendedValue, setRecommendedValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [userName, setUserName] = useState("");
  const [uid, setUid] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loadingNutritionData, setLoadingNutritionData] = useState(false);
  const [loadingProfileCheck, setLoadingProfileCheck] = useState(true);
  const [loading, setLoading] = useState(true); // Initial loading for data fetch
  const navigate = useNavigate();

  const currentDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const checkAuthAndFetchUserData = async () => {
    const user = auth.currentUser;

    if (!user) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();

        setUserName(data.displayName || "User");
        setPhoneNumber(data.phoneNumber || "No phone number");
        setUid(data.uid || "No UID");

        const requiredFields = [
          "phoneNumber",
          "country",
          "gender",
          "age",
          "weight",
          "height",
          "activity",
        ];
        const isComplete = requiredFields.every((field) => data[field]);
        setIsProfileComplete(isComplete);
        setLoadingProfileCheck(false); // Completeness check done

        setTimeout(() => {
          setLoading(false);
        }, 2000); // Delay for 3000 milliseconds

        // setLoading(false); // Stop other loading
      } else {
        // If user data doesn't exist, consider profile incomplete
        setIsProfileComplete(false);
        setLoadingProfileCheck(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsProfileComplete(false); // Fallback to incomplete on error
      setLoadingProfileCheck(false);
    }
  };

  useEffect(() => {
    checkAuthAndFetchUserData();
    fetchTodayNutritionData();
  }, []);

  useEffect(() => {
    // Fetch nutrition data for the selected date
    fetchNutritionData();
  }, [selectedDate]);

  const fetchTodayNutritionData = async () => {
    setLoadingNutritionData(true);
    const user = auth.currentUser;
    if (!user) return;

    const formattedDate = format(new Date(), "yyyy-MM-dd");
    try {
      const nutritionDoc = await getDoc(
        doc(firestore, `users/${user.uid}/nutritionData/${formattedDate}`)
      );
      if (nutritionDoc.exists()) {
        setTodayNutritionData(nutritionDoc.data());
        setLoadingNutritionData(false);
      } else {
        setTodayNutritionData(null); // No data for this date
        setLoadingNutritionData(false);
      }
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
      setLoadingNutritionData(false);
    }
  };

  // const fetchRecommendedValue = async () => {
  //   setLoadingNutritionData(true);
  //   const user = auth.currentUser;
  //   if (!user) return;

  //   try {
  //     const recommendValue = await getDoc(
  //       doc(
  //         firestore,
  //         `users/${user.uid}/nutritionData/recommendedValue/recommendedValue`
  //       )
  //     );
  //     if (recommendValue.exists()) {
  //       setRecommendedValue(recommendValue.data());
  //       setLoadingNutritionData(false);
  //     } else {
  //       setRecommendedValue(null); // No data for this date
  //       setLoadingNutritionData(false);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching nutrition data:", error);
  //     setLoadingNutritionData(false);
  //   }
  // };

  const fetchNutritionData = async () => {
    setLoadingNutritionData(true);
    const user = auth.currentUser;
    if (!user) return;

    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    try {
      const nutritionDoc = await getDoc(
        doc(firestore, `users/${user.uid}/nutritionData/${formattedDate}`)
      );
      if (nutritionDoc.exists()) {
        setNutritionData(nutritionDoc.data());
        setLoadingNutritionData(false);
      } else {
        setNutritionData(null); // No data for this date
        setLoadingNutritionData(false);
      }
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
      setLoadingNutritionData(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePreviousDate = () => {
    setSelectedDate((prevDate) => subDays(prevDate, 1));
  };

  const handleNextDate = () => {
    setSelectedDate((prevDate) => addDays(prevDate, 1));
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Testing Push Data

  // const PushNutritionData = () => {
  //   const [loading, setLoading] = useState(false);

  const pushData = async () => {
    try {
      {
        await setDoc(
          doc(
            firestore,
            "users",
            uid,
            "nutritionData",
            format(new Date(), "yyyy-MM-dd")
          ),
          {
            calories: 150,
            carbs: 20,
            fat: 5,
            fiber: 1,
            iron: 1.5,
            protein: 5,
            vitaminA: 3,
            vitaminB1: 14,
            vitaminB12: 15,
            vitaminB2: 8,
            vitaminB3: 9,
            vitaminB6: 6,
            vitaminC: 11,
            vitaminD: 80,
            vitaminE: 60,
            vitaminK: 20,
          },
          { merge: true }
        );
      }

      alert("Data pushed successfully!");
    } catch (error) {
      console.error("Error pushing data: ", error);
      alert("Error pushing data.");
    }
  };
  // };

  // Testing Push Data

  // Redirect to onboarding if profile is incomplete
  if (!loadingProfileCheck && !isProfileComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Loading screen
  if (loading || loadingProfileCheck) {
    return <NutritionLoadingScreen></NutritionLoadingScreen>;
  }

  return (
    <div className="bg-[#FCDDF2] min-h-screen text-[#0C4767] flex flex-col items-center p-6">
      <div className="w-full max-w-8xl p-6 bg-white rounded-lg shadow-lg">
        {/* Profile Header */}
        <ProfileHeader
          name={userName}
          phone={phoneNumber}
          date={currentDate}
          todayNutritionData={todayNutritionData ? todayNutritionData : 0}
          onLogout={logout}
          onEditProfile={() => navigate("/user-form")}
        />

        {/* Conditional message if profile is incomplete */}
        {!isProfileComplete && (
          <p className="mb-4 text-red-500 text-center md:text-left">
            Please Complete The Profile To Try The Feature
          </p>
        )}

        <button onClick={pushData} disabled={loading}>
          {loading ? "Pushing Data..." : "Push Nutrition Data"}
        </button>

        <NutritionDataDisplay
          nutritionData={nutritionData}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          handleNextDate={handleNextDate}
          handlePrevDate={handlePreviousDate}
          loading={loadingNutritionData}
        ></NutritionDataDisplay>

        {/* <div className="md:flex"> */}
        {/* Weekly Chart Section */}
        {/* <Macronutrients selectedDate={selectedDate} /> */}
        {/* Vitamin Chart Section */}
        {/* <VitaminChart selectedDate={selectedDate} />
        </div> */}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Dashboard;
