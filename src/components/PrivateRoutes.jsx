import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { currUser } = useContext(AuthContext);
  return currUser ? <Outlet /> : <Navigate to={`/`} />;
};

export default PrivateRoutes;
