import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";


const ProtectedRoute = ({ children }) => {
  const { isLogin } = useAuth();

  if (!isLogin) {
    return <Navigate to="/login" replace />
  }

  return children;
};

export default ProtectedRoute;
