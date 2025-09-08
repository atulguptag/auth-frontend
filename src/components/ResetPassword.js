import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageTitle from "./PageTitle";
import { appConfig } from "./config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiRefreshCw,
  FiArrowLeft,
} from "react-icons/fi";

const ResetPassword = () => {
  const apiBaseUrl = `${appConfig.baseApiUrl}`;
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.error || "User does not exist or invalid email!");
      }
    } catch (err) {
      toast.error("Failed to connect to server. Please try again.");
      console.error("Reset password error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageTitle title="Reset Password - JokeMaster" />
      <div className="min-vh-100 bg-light d-flex align-items-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 col-sm-9">
              <div
                className="modern-card p-4 p-md-5 mx-auto"
                style={{ maxWidth: "500px" }}
              >
                <div className="text-center mb-4">
                  <FiRefreshCw size={48} className="text-primary mb-3" />
                  <h2 className="h3 fw-bold text-dark mb-3">Reset Password</h2>
                  <p className="text-muted mb-0">
                    Enter your email and new password to reset
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">
                      Email Address
                    </label>
                    <div className="position-relative">
                      <FiMail
                        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                        size={18}
                      />
                      <input
                        type="email"
                        className="form-control ps-5 py-3 border-2"
                        placeholder="Enter your registered email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        disabled={isLoading}
                        style={{ borderRadius: "12px" }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">
                      New Password
                    </label>
                    <div className="position-relative">
                      <FiLock
                        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                        size={18}
                      />
                      <input
                        type={isVisible ? "text" : "password"}
                        className="form-control ps-5 pe-5 py-3 border-2"
                        placeholder="Enter your new password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                        minLength={6}
                        disabled={isLoading}
                        style={{ borderRadius: "12px" }}
                      />
                      <button
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                        className="position-absolute top-50 end-0 translate-middle-y me-3 btn btn-link p-0 text-muted hover-zoom"
                        style={{ border: "none", background: "none" }}
                        disabled={isLoading}
                      >
                        {isVisible ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </button>
                    </div>
                    <small className="text-muted">
                      Password must be at least 6 characters long
                    </small>
                  </div>

                  <div className="d-grid mb-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-modern py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Resetting...
                        </>
                      ) : (
                        <>
                          <FiRefreshCw className="me-2" />
                          Reset Password
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center">
                  <Link
                    className="text-decoration-none text-muted hover-zoom d-inline-flex align-items-center small"
                    to="/login"
                  >
                    <FiArrowLeft className="me-2" size={16} />
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
