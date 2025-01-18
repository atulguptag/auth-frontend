import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageTitle from "./PageTitle";
import { appConfig } from "./config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const apiBaseUrl = `${appConfig.baseApiUrl}`;
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        toast.error("User does not exists!", data.error);
      }
    } catch (err) {
      toast.error("Failed to connect to server", err);
    }
  };

  return (
    <>
      <PageTitle title="Reset Password" />
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Reset Password</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      placeholder="Enter Registered Email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type={isVisible ? "text" : "password"}
                      placeholder="Enter New Password"
                      className="form-control"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setIsVisible(!isVisible)}
                      style={{
                        position: "absolute",
                        right: "20px",
                        top: "59%",
                        transform: "translateY(-50%)",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      {isVisible ? "👁️" : "🙈"}
                    </button>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Reset Password
                    </button>
                    <p className="mt-3 text-center">
                      <Link className="text-decoration-none" to="/login">
                        Back to Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
