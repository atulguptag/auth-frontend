import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import LoadingSpinner from "./components/LoadingSpinner";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication status when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8080/home", {
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/logout", {
        credentials: "include",
      });
      setIsAuthenticated(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
};

export default App;
