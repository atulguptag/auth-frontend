import React, { useContext } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import LoadingSpinner from "./components/LoadingSpinner";
import JokeGenerator from "./components/JokeGenerator";
import VerifyEmail from "./components/VerifyEmail";
import Profile from "./components/Profile";
import { AuthContext } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, Navigate } from "react-router-dom";
import GoogleAuthCallback from "./components/GoogleAuthCallback";

const App = () => {
  const { isAuthenticated, isLoading, handleLogout } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/generate-jokes" element={<JokeGenerator />} />
        <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
};

export default App;
