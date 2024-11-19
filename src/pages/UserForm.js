import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db as firestore } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserForm() {
  const [formData, setFormData] = useState({
    // phoneNumber: "",
    country: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    activity: "",
  });

  const [phoneNumber, setPhoneNumber] = useState({
    phoneNumber: "",
    // country: "",
    // gender: "",
    // age: "",
    // weight: "",
    // height: "",
    // activity: "",
  });

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isPhoneNumberComplete, setIsPhoneNumberComplete] = useState(false);
  const [loading, setLoading] = useState(true); // Initial loading for data fetch
  const [submitting, setSubmitting] = useState(false); // Loading state for form submission
  const [phoneSubmitting, setPhoneSubmitting] = useState(false); // Loading state for phone submission
  const navigate = useNavigate();

  // Check if the user is authenticated; if not, redirect to home
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/"); // Redirect to home if user is not authenticated
      } else {
        fetchUserData(user.uid); // If authenticated, fetch user data
      }
    });

    return unsubscribe; // Cleanup the auth state listener on component unmount
  }, [navigate]);

  // Fetch user data from Firestore
  const fetchUserData = async (userId) => {
    try {
      const userDocRef = doc(firestore, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setFormData(userDoc.data());
        setPhoneNumber(userDoc.data());
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data.");
    }
    setLoading(false); // Stop loading after data is fetched
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value !== ""
    );
    setIsFormComplete(allFieldsFilled);
  }, [formData]);

  useEffect(() => {
    const allFieldsFilled = Object.values(phoneNumber).every(
      (value) => value !== ""
    );
    setIsPhoneNumberComplete(allFieldsFilled);
  }, [phoneNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setPhoneNumber((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleNumericInput = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validatePhoneNumber = (value) => {
    if (!value.startsWith("62")) {
      toast.error("Phone number must start with '62'.");
      return false;
    } else if (value.length < 11) {
      // Minimum length including '62'
      toast.error("Phone number must be at least 9 digits after '62'.");
      return false;
    }
    return true; // Validation passed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validatePhoneNumber(formData.phoneNumber)) {
    //   return; // Stop submission if validation fails
    // }
    setSubmitting(true); // Start submitting state
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(
          doc(firestore, "users", user.uid),
          {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            ...formData,
          },
          { merge: true }
        );

        toast.success("Profile saved successfully!");
      } catch (error) {
        console.error("Error saving user data:", error);
        toast.error("Failed to save profile. Please try again.");
      }
    }
    setSubmitting(false); // End submitting state
  };

  const handlePhoneNumberSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(phoneNumber.phoneNumber)) {
      return; // Stop submission if validation fails
    }
    setPhoneSubmitting(true); // Start submitting state
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(
          doc(firestore, "users", user.uid),
          {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            ...phoneNumber,
          },
          { merge: true }
        );

        toast.success(
          "WhatsApp linked successfully! Please check your WhatsApp for a message from NutriGo."
        );
      } catch (error) {
        console.error("Error saving user phone number:", error);
        toast.error("Failed to save phone number. Please try again.");
      }
    }
    setPhoneSubmitting(false); // End submitting state
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FCDDF2] text-[#0C4767]">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FCDDF2] text-[#0C4767] p-6 max-w-md mx-auto rounded-lg shadow-md mt-8">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 text-[#FF7F2A] hover:text-[#6E0D25] font-medium"
      >
        &larr; Back to Dashboard
      </button>

      <h1 className="text-center text-3xl font-bold mb-6">PROFILE</h1>

      {/* Whatsapp Setting */}

      <form onSubmit={handlePhoneNumberSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone Number:
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber.phoneNumber}
            onChange={(e) => {
              handlePhoneChange(e);
            }}
            placeholder="Enter phone number (e.g., 62XXXXXXXXX)"
            className="w-full px-3 py-2 bg-[#84A98C] text-white rounded-md placeholder:text-black"
            required
          />
          <p className="text-sm text-gray-600 mt-1">
            Phone number must start with <strong>62</strong> and be at least 9
            digits long.
          </p>
        </div>

        <button
          type="submit"
          disabled={!isPhoneNumberComplete || submitting || phoneSubmitting}
          className={` w-full py-2 rounded-md font-medium ${
            isPhoneNumberComplete && !submitting && !phoneSubmitting
              ? "bg-[#2ee875] hover:bg-[#6E0D25] text-white"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          {phoneSubmitting ? "Saving..." : "Link Whatsapp"}
        </button>
      </form>

      {/* Whatsapp Setting */}

      <form onSubmit={handleSubmit} className="space-y-4 pt-8">
        {/* <div>
          <label className="block text-sm font-medium mb-1">
            Phone Number:
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => {
              handleNumericInput(e);
            }}
            placeholder="Enter phone number (e.g., 62XXXXXXXXX)"
            className="w-full px-3 py-2 bg-[#84A98C] text-white rounded-md"
            required
          />
          <p className="text-sm text-gray-600 mt-1">
            Phone number must start with <strong>62</strong> and be at least 9
            digits long.
          </p>
        </div> */}

        <div>
          <label className="block text-sm font-medium mb-1">Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
            className="w-full px-3 py-2 bg-[#84A98C] text-white rounded-md placeholder:text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gender:</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                className="text-[#FF7F2A] focus:ring-[#FF7F2A]"
                required
              />
              <span className="ml-2">Female</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                className="text-[#FF7F2A] focus:ring-[#FF7F2A]"
                required
              />
              <span className="ml-2">Male</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Age:</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleNumericInput}
            placeholder="Enter age"
            className="w-full px-3 py-2 bg-[#84A98C] text-white rounded-md placeholder:text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Weight (kg):</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleNumericInput}
            placeholder="Enter weight"
            className="w-full px-3 py-2 bg-[#84A98C] text-white rounded-md placeholder:text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Height (cm):</label>
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleNumericInput}
            placeholder="Enter height"
            className="w-full px-3 py-2 bg-[#84A98C] text-white rounded-md placeholder:text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Activity Level:
          </label>
          <select
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#84A98C] text-white rounded-md placeholder:text-black"
            required
          >
            <option value="">Select activity level</option>
            <option value="sedentary">Sedentary (office job)</option>
            <option value="light">Light exercise (1-2 days/week)</option>
            <option value="moderate">Moderate exercise (3-5 days/week)</option>
            <option value="heavy">Heavy exercise (6-7 days/week)</option>
            <option value="athlete">Athlete (2x per day)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!isFormComplete || submitting || phoneSubmitting}
          className={`w-full py-2 rounded-md font-medium ${
            isFormComplete && !submitting && !phoneSubmitting
              ? "bg-[#FF7F2A] hover:bg-[#6E0D25] text-white"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          {submitting ? "Saving..." : "Submit"}
        </button>
      </form>

      {/* Toast notification container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default UserForm;
