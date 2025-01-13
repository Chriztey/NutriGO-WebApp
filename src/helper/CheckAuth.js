import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Or use `next/navigation` for Next.js
import { auth, db, provider } from "../firebase"; // Import your Firebase auth instance

import toast from "react-hot-toast";
import { signOut, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions

export function useAuth(redirectPath = "/Home") {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const navigate = useNavigate(); // Adjust to your routing setup

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        if (redirectPath) navigate(redirectPath); // Redirect unauthenticated users
      }

      // Set initial load as complete after auth check
      setInitialLoadComplete(true);
    });

    return unsubscribe; // Cleanup the listener on component unmount
  }, [navigate, redirectPath]);

  return { isAuthenticated, initialLoadComplete };
}

export const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("User is not logged in. Redirecting to /home.");
        navigate("/home");
        setLoading(false);
        return;
      }

      try {
        console.log(`Authenticated user: ${user.uid}. Checking role...`);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        if (userData?.role === "admin") {
          console.log("User is an admin. Access granted.");
          setIsAdmin(true);
        } else {
          console.log("User is not an admin. Redirecting to /dashboard.");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
        navigate("/dashboard"); // Redirect to dashboard on error
      } finally {
        setLoading(false);
      }
    });

    // Cleanup the listener on component unmount
    return () => {
      console.log("Cleaning up auth state listener.");
      unsubscribe();
    };
  }, [navigate]);

  return { isAdmin, loading };
};

export const logout = async () => {
  try {
    toast.success("Successfully logged out!");
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    toast.error("Failed to log out. Please try again.");
  }
};

export // Function to initialize user data in Firestore
const initializeUserData = async (uid, email) => {
  if (!uid || !email) return;

  const userDocRef = doc(db, "users", uid); // Reference to the Firestore document
  try {
    const userDocSnap = await getDoc(userDocRef); // Check if the document exists
    if (userDocSnap.exists()) {
      console.log(`User document already exists for UID: ${uid}`);
    } else {
      // Create the document with token: 3 and email
      await setDoc(userDocRef, {
        token: 3,
        email: email,
        role: "user",
        createdAt: new Date().toISOString(),
      });
      console.log(`New user document created for UID: ${uid}`);
    }
  } catch (error) {
    console.error("Error initializing user data:", error);
  }
};

export const login = async () => {
  // const navigate = useNavigate();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Signed in user:", result.user);

    // Initialize user document in Firestore
    await initializeUserData(result.user.uid, result.user.email);
    // navigate("/Dashboard");
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      console.log("The sign-in popup was closed by the user.");
    } else {
      console.error("An unexpected error occurred during sign-in:", error);
    }
  }
};
