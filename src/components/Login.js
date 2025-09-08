import React, { useState, useContext } from "react";
import PageTitle from "./PageTitle";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { appConfig } from "./config";
import { AuthContext } from "../context/AuthContext";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiArrowRight,
} from "react-icons/fi";

const Login = () => {
  const apiBaseUrl = `${appConfig.baseApiUrl}`;
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.access_token;
        handleLogin(token);
        toast.success("Login Successful!");
        navigate("/home");
      } else if (response.status === 403) {
        toast.warning("Please verify your email address before logging in");
      } else {
        toast.error(data.error || "User not found!");
      }
    } catch (err) {
      toast.error("Failed to connect to server!");
      console.error("Login Error:", err);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${apiBaseUrl}/auth/google`;
  };

  return (
    <>
      <PageTitle title="Login - JokeMaster" />
      <div className="min-vh-100 bg-light d-flex align-items-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 col-sm-9">
              <div
                className="modern-card p-4 p-md-5 mx-auto"
                style={{ maxWidth: "500px" }}
              >
                <div className="text-center mb-4">
                  <h2 className="h3 fw-bold text-dark mb-3">Welcome Back!</h2>
                  <p className="text-muted mb-0">
                    Sign in to continue generating amazing jokes
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
                        autoComplete="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        style={{ borderRadius: "12px" }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">
                      Password
                    </label>
                    <div className="position-relative">
                      <FiLock
                        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                        size={18}
                      />
                      <input
                        type={isVisible ? "text" : "password"}
                        className="form-control ps-5 pe-5 py-3 border-2"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                        style={{ borderRadius: "12px" }}
                      />
                      <button
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                        className="position-absolute top-50 end-0 translate-middle-y me-3 btn btn-link p-0 text-muted hover-zoom"
                        style={{ border: "none", background: "none" }}
                      >
                        {isVisible ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-4 text-end">
                    <Link
                      className="text-decoration-none text-primary hover-zoom fw-medium small"
                      to="/reset-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="d-grid mb-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-modern py-3"
                    >
                      <FiLogIn className="me-2" />
                      Sign In
                    </button>
                  </div>
                </form>

                <div className="position-relative mb-4">
                  <hr className="border-secondary-subtle" />
                  <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
                    OR
                  </span>
                </div>

                <div className="d-grid mb-4">
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-modern py-3 hover-zoom"
                    onClick={handleGoogleLogin}
                  >
                    <img
                      src="/image.png"
                      alt="Google logo"
                      className="me-2"
                      style={{
                        width: "20px",
                        height: "20px",
                        objectFit: "contain",
                      }}
                    />
                    Continue with Google
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-muted mb-0 small">
                    Don't have an account?{" "}
                    <Link
                      className="text-decoration-none text-primary hover-zoom fw-semibold"
                      to="/signup"
                    >
                      Sign up here <FiArrowRight className="ms-1" size={14} />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
