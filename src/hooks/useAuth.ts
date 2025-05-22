import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface UserProfile {
  email: string;
  orgName?: string;    // For organizations
  logoUrl?: string;
  role: "organization" | "admin";
  // Add more fields as needed
}

/**
 * Log in and get user + profile (role, orgName, etc.)
 */
export const login = async (email: string, password: string) => {
  try {
    // 1. Log in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid;

    // 2. Fetch user profile from "users" collection by UID
    const userDoc = await getDoc(doc(db, "users", uid));
    const userData = userDoc.exists() ? (userDoc.data() as UserProfile) : null;

    if (!userData || !userData.role) {
      throw new Error("No role assigned to this account.");
    }

    // Optional: Attach email from Auth (for reference)
    userData.email = user.email || userData.email;

    // Return what you need (user, role, orgName, etc.)
    return {
      user,
      role: userData.role,
      profile: userData,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Log out current user
 */
export const logout = async () => {
  await signOut(auth);
};