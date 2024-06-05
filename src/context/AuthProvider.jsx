import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState({ displayName: "DGray" });

  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, (u) => setCurrUser(u));
    return () => unsubsribe();
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, googleProvider);
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currUser, setCurrUser,handleSignIn,handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
