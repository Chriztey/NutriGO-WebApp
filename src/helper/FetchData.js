import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Ensure you import your Firestore instance

const fetchTotalUsers = async () => {
  try {
    // Reference to the "users" collection
    const usersCollectionRef = collection(db, "users");

    // Get all documents in the "users" collection
    const querySnapshot = await getDocs(usersCollectionRef);

    // Get the total number of users
    const totalUsers = querySnapshot.size;

    console.log("Total registered users:", totalUsers);
    return totalUsers;
  } catch (error) {
    console.error("Error fetching total users:", error);
    return 0;
  }
};

export default fetchTotalUsers;
