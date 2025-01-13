import React, { useEffect, useState } from "react";
import AdminProfileHeader from "../component/AdminProfileHeader";
import NutritionLoadingScreen from "../component/Loading";
import MarketingStrategies from "../component/MarketingStrategies";
import VitaminsPieChart from "../component/PieChart";
import { auth, db as firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import fetchTotalUsers from "../helper/FetchData";
import { useNavigate, Navigate } from "react-router-dom";

function AdminDashboard() {
  const [loadingProfileCheck, setLoadingProfileCheck] = useState(true);
  const [userName, setUserName] = useState(0);
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [totalUsers, setTotalUsers] = useState("");

  const checkAuthAndFetchUserData = async () => {
    const user = auth.currentUser;

    if (!user) {
      setIsAuthenticated(false);
      return;
    }

    try {
      setLoadingProfileCheck(true);

      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();

        setUserName(data.displayName || "User");
        setRole(data.role || "user");

        console.log(role);

        const users = await fetchTotalUsers();
        setTotalUsers(users);

        if (data.role == "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        setLoadingProfileCheck(false);
      } else {
        setLoadingProfileCheck(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoadingProfileCheck(false);
    }
  };

  useEffect(() => {
    checkAuthAndFetchUserData();
  }, []);

  // Redirect to user dashboard if not admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Loading screen
  if (loadingProfileCheck) {
    return <NutritionLoadingScreen></NutritionLoadingScreen>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <AdminProfileHeader
          name={userName}
          totalUsers={totalUsers}
        ></AdminProfileHeader>
        <div className="grid md:grid-cols-2 gap-8">
          <VitaminsPieChart></VitaminsPieChart>
          <MarketingStrategies></MarketingStrategies>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
