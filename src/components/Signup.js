import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageTitle from "./PageTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { appConfig } from "./config";

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
        toast.success("Register successfully! Please check your email.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error("Email already exists!", data.error);
      }
    } catch (err) {
      toast.error("Failed to connect to server");
    }
  };

  return (
    <>
      <PageTitle title="Sign Up" />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">
                  Sign Up to Get Started
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      autoComplete="name"
                      placeholder="Enter Your Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      autoComplete="email"
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type={isVisible ? "text" : "password"}
                      className="form-control"
                      autoComplete="password"
                      placeholder="Enter Password"
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
                        top: "67%",
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
                      Sign Up
                    </button>

                    <p className="mt-3 text-center">
                      Already have an account?
                      <Link className="text-decoration-none" to="/login">
                        Login
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

export default Signup;
