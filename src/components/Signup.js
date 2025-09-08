import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageTitle from "./PageTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { appConfig } from "./config";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUserPlus,
  FiArrowRight,
} from "react-icons/fi";

const Signup = () => {
  const apiBaseUrl = `${appConfig.baseApiUrl}`;
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "Registration successful! Please check your email to verify your account."
        );
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(
          data.error || "Registration failed. Email may already exist."
        );
      }
    } catch (err) {
      toast.error("Failed to connect to server. Please try again.");
      console.error("Signup Error:", err);
    }
  };

  return (
    <>
      <PageTitle title="Sign Up - JokeMaster" />
      <div className="min-vh-100 bg-light d-flex align-items-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 col-sm-9">
              <div
                className="modern-card p-4 p-md-5 mx-auto"
                style={{ maxWidth: "500px" }}
              >
                <div className="text-center mb-4">
                  <h2 className="h3 fw-bold text-dark mb-3">Create Account</h2>
                  <p className="text-muted mb-0">
                    Join JokeMaster and start generating unlimited jokes
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">
                      Full Name
                    </label>
                    <div className="position-relative">
                      <FiUser
                        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                        size={18}
                      />
                      <input
                        type="text"
                        className="form-control ps-5 py-3 border-2"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        minLength={2}
                        style={{ borderRadius: "12px" }}
                      />
                    </div>
                  </div>

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
                        autoComplete="new-password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                        minLength={6}
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
                    <small className="text-muted">
                      Password must be at least 6 characters long
                    </small>
                  </div>

                  <div className="d-grid mb-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-modern py-3"
                    >
                      <FiUserPlus className="me-2" />
                      Create Account
                    </button>
                  </div>
                </form>

                <div className="text-center">
                  <p className="text-muted mb-0 small">
                    Already have an account?{" "}
                    <Link
                      className="text-decoration-none text-primary hover-zoom fw-semibold"
                      to="/login"
                    >
                      Sign in here <FiArrowRight className="ms-1" size={14} />
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

export default Signup;
