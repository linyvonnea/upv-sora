import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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

/**
 * Update user name
 */
export const updateUserUsername = async (user: any, newName: string) => {
  const userDocRef = doc(db, "users", user.uid);
  await updateDoc(userDocRef, {orgName: newName});
}

/**
 * Update user email
 */
export const updateUserEmail = async (user: any, newEmail: string) => {
  const userDocRef = doc(db, "users", user.uid);
  await updateEmail(user, newEmail);
  await updateDoc(userDocRef, {email: newEmail});
  logout();
}

/**
 * Update user password
 */
export const updateUserPassword = async (user: any, newPassword: string) => {
  await updatePassword(user, newPassword);
  logout();
}