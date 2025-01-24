import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Check authentication status when AuthProvider mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setIsAuthenticated(true);
    setToken(newToken);
    toast.success("Login Successful!");
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setToken(null);
      toast.success("Logout Successful!");
      navigate("/home");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        token,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
