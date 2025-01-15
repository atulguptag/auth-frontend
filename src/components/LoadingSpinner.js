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
      <div className="d-flex flex-column align-items-center">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="mt-2">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
