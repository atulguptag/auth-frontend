import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageTitle from "./PageTitle";

const Signup = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to connect to server");
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
                <h3 className="card-title text-center mb-4">Sign Up</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">{success}</div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
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
                        top: "56%",
                        transform: "translateY(-50%)",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      {isVisible ? "👁️" : "🙈"}
                    </button>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
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
