import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import getLocalStorage from "./utils/getLocalStorage";
import { getUser } from "./api/userAPi";


const ProtectedRoute = ({ children }) => {
  const [isLogin,setIsLogin] = useState(true)
  const token = getLocalStorage("token")
  console.log(token)
  useEffect(() => {
    getUser(token)
      .then(res => setIsLogin(res.data.success))
  }, [])

  console.log("isLogin => ",isLogin)
  if (!isLogin) {
    return <Navigate to="/login" replace />
  }

  return children;
};

export default ProtectedRoute;
