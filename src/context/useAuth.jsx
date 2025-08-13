import { useState, useContext, createContext } from "react";

import getLocalStorage from "@/utils/getLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const isLogin = getLocalStorage('token') ? true : false
  
  console.log(isLogin)

  console.log(getLocalStorage('token'))

  return (
    <AuthContext.Provider value={{ isLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);