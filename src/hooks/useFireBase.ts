import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { FirebaseError } from "firebase/app";
import { useState, useMemo } from "react";



const ALLOWED_USERS = ["rydzcf@gmail.com"];
// Firebase initialization should be done outside of the hook to prevent re-initialization
 const firebaseConfig = {
  apiKey: "AIzaSyDL35L-dqLBhVnoKE2NDbsN1YSxE4hFl38",
  authDomain: "galant-55f99.firebaseapp.com",
  projectId: "galant-55f99",
  storageBucket: "galant-55f99.firebasestorage.app",
  messagingSenderId: "545979727072",
  appId: "1:545979727072:web:e5b94c34f261b64425a485"
};

// Ensure the Firebase app is initialized once
const app = initializeApp(firebaseConfig);

// Optionally, initialize analytics if available
// let analytics;
// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }

export const useFireBase = () => {
  const [fbError, setFbError] = useState<null | FirebaseError>(null);

  const auth = useMemo(() => getAuth(app), []);
  const provider = useMemo(() => new GoogleAuthProvider(), []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Zalogowany użytkownik
        const user = result.user;
        if (!ALLOWED_USERS.includes(user.email!)) {
          // If not, sign the user out and set an error
          auth.signOut().then(() => {
            setFbError(new FirebaseError("auth/invalid-email", "Access denied. Invalid email."));
          });
        } else {
          // If email is correct, clear any errors
          setFbError(null);
        }
      })
      .catch((error: FirebaseError) => {
        setFbError(error);
      });
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setFbError(null);
      })
      .catch((error: FirebaseError) => {
        setFbError(error);
      });
  };

  const [user] = useAuthState(auth);

  return {
    user,
    signOut,
    signInWithGoogle,
    fbError,
  };
};