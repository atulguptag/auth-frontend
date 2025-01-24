import React, { useState, useEffect, useRef } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import LoadingSpinner from "./components/LoadingSpinner";
import JokeGenerator from "./components/JokeGenerator";
import VerifyEmail from "./components/VerifyEmail";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const tokenRef = useRef(null);

  // Check authentication status when app loads
  useEffect(() => {
    tokenRef.current = localStorage.getItem("token");
    if (tokenRef.current) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      toast.success("Logout Successful!");
      navigate("/home");
    } catch (err) {
      toast.error("Logout failed");
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
        <Route
          path="/generate-jokes"
          element={<JokeGenerator token={tokenRef.current} />}
        />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
};

export default App;
