import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Please wait...</span>
        </div>
        <div className="text-dark mt-2">Please wait...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
