import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { appConfig } from "./config";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import PageTitle from "./PageTitle";
import {
  FiUser,
  FiClock,
  FiMessageCircle,
  FiCalendar,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

const Profile = () => {
  const { token, user } = useContext(AuthContext);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = `${appConfig.baseApiUrl}`;

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${apiBaseUrl}/profile`, {
          method: "GET",
          headers: headers,
        });

        if (response.ok) {
          const data = await response.json();
          setPrompts(data);
        } else {
          toast.error("Unable to load your profile data");
        }
      } catch (error) {
        toast.error("An error occurred while fetching your data.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPrompts();
    }
  }, [token, apiBaseUrl]);

  if (!token) {
    return (
      <>
        <PageTitle title="Profile - JokeMaster" />
        <div className="min-vh-100 hero-section d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <div className="modern-card p-5">
                  <FiUser size={64} className="text-muted mb-4" />
                  <h2 className="display-6 fw-bold mb-3">Access Required</h2>
                  <p className="text-muted mb-4">
                    Please log in to view your profile and joke generation
                    history.
                  </p>
                  <a
                    href="/login"
                    className="btn btn-primary btn-modern btn-lg"
                  >
                    <FiUser className="me-2" />
                    Sign In
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageTitle title="Profile - JokeMaster" />
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  // Calculate stats
  const totalPrompts = prompts.length;
  const recentPrompts = prompts.filter((prompt) => {
    const promptDate = new Date(prompt.CreatedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return promptDate >= weekAgo;
  }).length;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <PageTitle title="Profile - JokeMaster" />
      <div className="min-vh-100 bg-light">
        {/* Header Section */}
        <section className="gradient-primary text-white py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-white bg-opacity-20 rounded-circle p-3 me-4">
                    <FiUser size={32} />
                  </div>
                  <div>
                    <h1 className="display-5 fw-bold mb-2">Welcome back!</h1>
                    <p className="lead mb-0 text-white-50">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding">
          <div className="container">
            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <div className="modern-card text-center p-4 h-100 hover-lift">
                  <FiMessageCircle className="text-primary mb-3" size={48} />
                  <h3 className="display-6 fw-bold text-primary mb-2">
                    {totalPrompts}
                  </h3>
                  <p className="text-muted mb-0">Total Jokes Generated</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="modern-card text-center p-4 h-100 hover-lift">
                  <FiTrendingUp className="text-success mb-3" size={48} />
                  <h3 className="display-6 fw-bold text-success mb-2">
                    {recentPrompts}
                  </h3>
                  <p className="text-muted mb-0">This Week</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="modern-card text-center p-4 h-100 hover-lift">
                  <FiZap className="text-warning mb-3" size={48} />
                  <h3 className="display-6 fw-bold text-warning mb-2">∞</h3>
                  <p className="text-muted mb-0">Unlimited Access</p>
                </div>
              </div>
            </div>

            {/* Prompt History */}
            <div className="row">
              <div className="col-12">
                <div className="modern-card p-5">
                  <div className="d-flex align-items-center mb-4">
                    <FiClock className="me-3 text-primary" size={28} />
                    <h2 className="mb-0 fw-bold">
                      Your Joke Generation History
                    </h2>
                  </div>

                  {totalPrompts === 0 ? (
                    <div className="text-center py-5">
                      <FiMessageCircle size={64} className="text-muted mb-4" />
                      <h4 className="fw-bold mb-3">No jokes generated yet!</h4>
                      <p className="text-muted mb-4">
                        Start creating hilarious content with our AI-powered
                        joke generator.
                      </p>
                      <a
                        href="/generate-jokes"
                        className="btn btn-primary btn-modern btn-lg"
                      >
                        <FiZap className="me-2" />
                        Generate Your First Joke
                      </a>
                    </div>
                  ) : (
                    <div className="row g-4">
                      {prompts.map((prompt) => (
                        <div key={prompt.ID} className="col-lg-6">
                          <div className="border rounded-3 p-4 h-100 hover-lift bg-white">
                            <div className="d-flex align-items-start justify-content-between mb-3">
                              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                                Prompt #{prompt.ID}
                              </span>
                              <small className="text-muted">
                                <FiCalendar className="me-1" size={14} />
                                {formatDate(prompt.CreatedAt)}
                              </small>
                            </div>
                            <p className="mb-0 text-dark lh-base">
                              <strong>Topic:</strong> {prompt.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
