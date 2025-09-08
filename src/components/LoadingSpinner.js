import React from "react";

const LoadingSpinner = ({
  size = "default",
  overlay = false,
  message = "Loading...",
}) => {
  const getSpinnerSize = () => {
    switch (size) {
      case "small":
        return { width: "1.5rem", height: "1.5rem" };
      case "large":
        return { width: "4rem", height: "4rem" };
      default:
        return { width: "2.5rem", height: "2.5rem" };
    }
  };

  const spinnerStyle = getSpinnerSize();

  // Inline spinner (for buttons, etc.)
  if (!overlay) {
    return (
      <div className="d-inline-flex align-items-center">
        <div
          className="spinner-border text-primary"
          style={spinnerStyle}
          role="status"
        >
          <span className="visually-hidden">{message}</span>
        </div>
        {size !== "small" && <span className="ms-2 text-muted">{message}</span>}
      </div>
    );
  }

  // Full overlay spinner
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
      }}
    >
      <div className="text-center">
        <div className="modern-card p-4 border-0 shadow-lg">
          <div
            className="spinner-border text-primary mb-3"
            style={spinnerStyle}
            role="status"
          >
            <span className="visually-hidden">{message}</span>
          </div>
          <div className="fw-medium text-dark">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
