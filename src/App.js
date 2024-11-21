import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { auth } from "../src/firebase";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Profile";
import UserForm from "./pages/UserForm";
import Onboarding from "./pages/Onboarding";
import NutritionLoadingScreen from "./component/Loading";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  // const [isProfileComplete, setIsProfileComplete] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false); // Track initial load completion

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsAuthenticated(true);

        // Check profile completeness
        // const checkProfileCompletion = async () => {
        //   if (user.phoneNumber) {
        //     setIsProfileComplete(true);
        //   } else {
        //     const userDoc = await getDoc(doc(firestore, "users", user.uid));
        //     setIsProfileComplete(userDoc.exists() && !!userDoc.data().phoneNumber);
        //   }
        // };

        // await checkProfileCompletion();
        // console.log(isProfileComplete)
      } else {
        setIsAuthenticated(false);
        // setIsProfileComplete(false);
      }

      // Set initial load as complete after auth and profile checks
      setInitialLoadComplete(true);
    });

    return unsubscribe; // Cleanup the listener on component unmount
  }, []);

  // Display loading spinner or message until initial load is complete
  if (!initialLoadComplete) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<Onboarding></Onboarding>} />
        <Route
          path="/load"
          element={<NutritionLoadingScreen></NutritionLoadingScreen>}
        />
      </Routes>
    </Router>
  );
}

export default App;
