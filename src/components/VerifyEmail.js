import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { appConfig } from "./config";

const VerifyEmail = () => {
  const apiBaseUrl = `${appConfig.baseApiUrl}`;
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const token = query.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        toast.error("No token provided");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/verify?token=${token}`, {
          method: "GET",
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(
            "Email verification successful! Redirecting to Login..."
          );
          setTimeout(() => navigate("/login"), 2000);
        } else {
          toast.error("Failed to verify email", data.error);
          navigate("/login");
        }
      } catch (err) {
        toast.error("Failed to connect to server", err);
        navigate("/login");
      }
    };

    verifyEmail();
  }, [navigate, token, apiBaseUrl]);

  return (
    <div className="container mt-5">
      <LoadingSpinner />
      Verifying email..
    </div>
  );
};
export default VerifyEmail;
