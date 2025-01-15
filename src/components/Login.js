import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageTitle from "./PageTitle";

const Login = ({ setIsAuthenticated }) => {
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <>
      <PageTitle title="Login" />
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Login</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
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
                      placeholder="Enter Your Password"
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
                        top: "53%",
                        transform: "translateY(-50%)",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      {isVisible ? "👁️" : "🙈"}
                    </button>
                  </div>
                  <div className="mt-3 text-end">
                    <Link className="text-decoration-none" to="/reset-password">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="mt-3 d-grid">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
                <p className="mt-3 text-center">
                  Don't have an account?{" "}
                  <Link className="text-decoration-none" to="/signup">
                    Sign Up.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
