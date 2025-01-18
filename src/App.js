import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import LoadingSpinner from "./components/LoadingSpinner";
import JokeGenerator from "./components/JokeGenerator";
import VerifyEmail from "./components/VerifyEmail";
import { appConfig } from "./components/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

const App = () => {
  const apiBaseUrl = `${appConfig.baseApiUrl}`;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication status when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/home`, {
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
  }, [apiBaseUrl]);

  const handleLogout = async () => {
    try {
      await fetch(`${apiBaseUrl}/logout`, {
        credentials: "include",
      });
      setIsAuthenticated(false);
      toast.success("Logout Successful!");
      navigate("/home");
    } catch (err) {
      toast.error("Logout failed:");
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
        <Route path="/home" element={<Home />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/generate-jokes" element={<JokeGenerator />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
};

export default App;
