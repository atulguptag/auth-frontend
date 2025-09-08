import React from "react";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiLogIn,
  FiUserPlus,
  FiHome,
  FiLogOut,
  FiZap,
} from "react-icons/fi";

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 hover-zoom text-dark" to="/">
          <FiZap className="me-2 text-primary" />
          JokeMaster
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center hover-zoom px-3 text-dark fw-medium"
                    to="/login"
                  >
                    <FiLogIn className="me-2" size={18} />
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center hover-zoom px-3 text-white bg-primary rounded-pill"
                    to="/signup"
                  >
                    <FiUserPlus className="me-2" size={18} />
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center hover-zoom px-3 text-dark fw-medium"
                    to="/home"
                  >
                    <FiHome className="me-2" size={18} />
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center hover-zoom px-3 text-dark fw-medium"
                    to="/generate-jokes"
                  >
                    <FiZap className="me-2" size={18} />
                    Generate
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center hover-zoom px-3 text-dark fw-medium"
                    to="/profile"
                  >
                    <FiUser className="me-2" size={18} />
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-danger d-flex align-items-center hover-zoom px-3 border-0 fw-medium"
                    onClick={onLogout}
                    style={{ textDecoration: "none" }}
                  >
                    <FiLogOut className="me-2" size={18} />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
