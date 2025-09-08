import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCopy,
  FiZap,
  FiRefreshCw,
  FiAlertCircle,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./LoadingSpinner";
import PageTitle from "./PageTitle";
import { appConfig } from "./config";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../context/AuthContext";

const JokeGenerator = () => {
  const apiBaseUrl = `${appConfig.baseApiUrl}`;
  const { token } = useContext(AuthContext);
  const [inputText, setInputText] = useState("");
  const [jokes, setJokes] = useState({ english: [], hindi: [] });
  const [loading, setLoading] = useState(false);
  const [remainingGenerations, setRemainingGenerations] = useState(3);
  const [anonymousId, setAnonymousId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let storedUuid = localStorage.getItem("anonymous_id");

    if (!storedUuid) {
      storedUuid = uuidv4();
      localStorage.setItem("anonymous_id", storedUuid);
    }

    setAnonymousId(storedUuid);
  }, []);

  const validateInput = (text) => {
    const wordCount = text.trim().split(/\s+/).length;
    return wordCount >= 3;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Joke copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput(inputText)) {
      toast.warning("Please enter at least 3 words to generate better jokes!");
      return;
    }
    setLoading(true);

    try {
      const headers = {
        "Content-Type": "application/json",
        "X-Anonymous-Id": anonymousId,
      };

      if (token && token !== "null" && token !== "undefined") {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${apiBaseUrl}/generate-jokes`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ prompt: inputText }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Jokes generated successfully!");
        setJokes(data);
        if (data.remaining_generations !== undefined) {
          setRemainingGenerations(data.remaining_generations);
        }
      } else if (response.status === 401 || response.status === 403) {
        if (data.remaining_generations !== undefined) {
          setRemainingGenerations(data.remaining_generations);
        }
        if (data.remaining_generations === 0) {
          toast.error(
            "You've reached the maximum number of free generations. Please sign up to continue."
          );
          navigate("/login");
        }
      } else {
        toast.error(data.error || "Failed to generate jokes!");
      }
    } catch (err) {
      toast.error("Failed to connect to server! Please try again later.");
      console.error("Full error", err);
    } finally {
      setLoading(false);
    }
  };

  const renderJokeBox = (joke, index, language) => (
    <div
      key={index}
      className="modern-card p-4 mb-4 position-relative hover-lift"
    >
      <div className="d-flex justify-content-between align-items-start mb-2">
        <span
          className={`badge ${
            language === "english" ? "bg-primary" : "bg-success"
          } bg-opacity-10 text-${
            language === "english" ? "primary" : "success"
          } px-3 py-2 rounded-pill`}
        >
          {language === "english" ? "English" : "हिंदी"}
        </span>
        <button
          onClick={() => copyToClipboard(joke)}
          className="btn btn-outline-primary btn-sm hover-zoom"
          title="Copy joke"
        >
          <FiCopy size={16} />
        </button>
      </div>
      <p className="mb-0 lh-base text-dark fs-6">{joke}</p>
    </div>
  );

  return (
    <>
      <PageTitle title="AI Joke Generator - JokeMaster" />
      <div className="min-vh-100 bg-light">
        {/* Header Section */}
        <section className="gradient-primary text-white py-5">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="display-4 fw-bold mb-3">
                  <FiZap className="me-3" />
                  AI Joke Generator
                </h1>
                <p className="lead mb-0">
                  Transform any topic into hilarious jokes in English and Hindi
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="modern-card p-5 mb-5">
                  {/* Free Usage Alert */}
                  {!token && (
                    <div className="alert alert-info border-0 rounded-3 mb-4">
                      <div className="d-flex align-items-center">
                        <FiAlertCircle className="me-3 text-info" size={24} />
                        <div>
                          <h6 className="alert-heading mb-1">Free User</h6>
                          <p className="mb-0">
                            You have <strong>{remainingGenerations}</strong>{" "}
                            free generations remaining.
                            <a href="/signup" className="alert-link ms-1">
                              Sign up
                            </a>{" "}
                            for unlimited access!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Input Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="form-label fw-semibold mb-3">
                        Enter your topic or keywords (minimum 3 words)
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg border-2 py-3"
                        placeholder="e.g., cats playing piano, office meetings, cooking disasters..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        required
                        style={{ borderRadius: "12px" }}
                      />
                      <div className="form-text">
                        💡 Tip: Be specific for better jokes! Try "my boss
                        during video calls" instead of just "boss"
                      </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-modern btn-lg px-5"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <LoadingSpinner />
                            <span className="ms-2">Generating...</span>
                          </>
                        ) : (
                          <>
                            <FiZap className="me-2" />
                            Generate Jokes
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-modern btn-lg px-5 hover-zoom"
                        onClick={() => {
                          setInputText("");
                          setJokes({ english: [], hindi: [] });
                        }}
                        disabled={loading}
                      >
                        <FiRefreshCw className="me-2" />
                        Clear
                      </button>
                    </div>
                  </form>
                </div>

                {/* Results Section */}
                {(jokes.english.length > 0 || jokes.hindi.length > 0) && (
                  <div className="row g-4">
                    {/* English Jokes */}
                    <div className="col-lg-6">
                      <div className="d-flex align-items-center mb-4">
                        <FiStar className="me-2 text-primary" size={24} />
                        <h3 className="mb-0 fw-bold">English Jokes</h3>
                      </div>
                      {jokes.english.length > 0 ? (
                        jokes.english.map((joke, index) =>
                          renderJokeBox(joke, index, "english")
                        )
                      ) : (
                        <div className="modern-card p-4 text-center text-muted">
                          <FiAlertCircle size={32} className="mb-2" />
                          <p className="mb-0">No English jokes generated</p>
                        </div>
                      )}
                    </div>

                    {/* Hindi Jokes */}
                    <div className="col-lg-6">
                      <div className="d-flex align-items-center mb-4">
                        <FiStar className="me-2 text-success" size={24} />
                        <h3 className="mb-0 fw-bold">Hindi Jokes</h3>
                      </div>
                      {jokes.hindi.length > 0 ? (
                        jokes.hindi.map((joke, index) =>
                          renderJokeBox(joke, index, "hindi")
                        )
                      ) : (
                        <div className="modern-card p-4 text-center text-muted">
                          <FiAlertCircle size={32} className="mb-2" />
                          <p className="mb-0">No Hindi jokes generated</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {jokes.english.length > 0 || jokes.hindi.length > 0 ? (
                  <div className="text-center mt-5">
                    <div className="alert alert-success border-0 rounded-3 d-inline-block">
                      <FiCheckCircle className="me-2" />
                      Jokes generated successfully! Click the copy button to
                      share them.
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default JokeGenerator;
