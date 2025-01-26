import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

const GoogleAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const oauthState = query.get("state");

    if (oauthState) {
      localStorage.setItem("oauth_state", oauthState);
    }

    if (token) {
      handleLogin(token);
      toast.success("Logged in successfully via Google!");
      navigate("/home");
    } else {
      toast.error("Failed to authenticate with Google.");
      navigate("/login");
    }
  }, [location, handleLogin, navigate]);

  return <LoadingSpinner />;
};

export default GoogleAuthCallback;
