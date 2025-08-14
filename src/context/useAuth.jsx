import { useState, useContext, createContext } from "react";
import getLocalStorage from "@/utils/getLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(!!getLocalStorage("token"));

  const login = (token,id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
