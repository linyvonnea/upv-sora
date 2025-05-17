import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Firestore imports

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Fetch role from Firestore
    const roleDoc = await getDoc(doc(db, "roles", uid));
    const roleData = roleDoc.exists() ? roleDoc.data() : null;

    if (!roleData || !roleData.role) {
      throw new Error("No role assigned to this account.");
    }

    return { user: userCredential.user, role: roleData.role };
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await signOut(auth);
};