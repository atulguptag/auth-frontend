import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { appConfig } from "./config";
import PageTitle from "./PageTitle";
import { FiMail } from "react-icons/fi";

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
        toast.error("No verification token provided");
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
          toast.error(data.error || "Failed to verify email");
          navigate("/login");
        }
      } catch (err) {
        toast.error("Failed to connect to server");
        console.error("Verification error:", err);
        navigate("/login");
      }
    };

    verifyEmail();
  }, [navigate, token, apiBaseUrl]);

  return (
    <>
      <PageTitle title="Email Verification - JokeMaster" />
      <div className="min-vh-100 bg-light d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="modern-card p-5 text-center">
                <div className="mb-4">
                  <FiMail size={64} className="text-primary mb-3" />
                  <h2 className="h3 fw-bold text-dark mb-3">
                    Verifying Your Email
                  </h2>
                  <p className="text-muted mb-4">
                    Please wait while we verify your email address...
                  </p>
                </div>
                <LoadingSpinner size="large" message="Verifying..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
