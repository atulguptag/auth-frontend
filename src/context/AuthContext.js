import React, { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Memoize handleLogout to prevent recreation on each render
  const handleLogout = useCallback(async () => {
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setToken(null);
      setUser(null);
      toast.success("Logout Successful!");
      navigate("/home");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout failed:", err);
    }
  }, [navigate]);

  // Memoize handleLogin to prevent recreation on each render
  const handleLogin = useCallback(
    (newToken) => {
      localStorage.setItem("token", newToken);
      setIsAuthenticated(true);
      setToken(newToken);
      try {
        const decoded = jwtDecode(newToken);
        setUser({
          id: decoded.user_id,
          email: decoded.email,
        });
      } catch (error) {
        console.error("Invalid token:", error);
        toast.error("Invalid token received.");
        handleLogout();
      }
    },
    [handleLogout]
  );

  // Check authentication status when AuthProvider mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      handleLogin(urlToken);
      window.history.replaceState({}, document.title, "/");
    } else {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken);
          setUser({
            id: decoded.user_id,
            email: decoded.email,
          });
          setIsAuthenticated(true);
          setToken(storedToken);
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    }
    setIsLoading(false);
  }, [handleLogin, handleLogout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        token,
        user,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
