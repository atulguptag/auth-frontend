import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./LoadingSpinner";
import PageTitle from "./PageTitle";
import { appConfig } from "./config";

const JokeGenerator = ({ token }) => {
  const apiBaseUrl = `${appConfig.baseApiUrl}`;
  const [inputText, setInputText] = useState("");
  const [jokes, setJokes] = useState({ english: [], hindi: [] });
  const [loading, setLoading] = useState(false);
  const [remainingGenerations, setRemainingGenerations] = useState(3);

  const navigate = useNavigate();

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
      toast.warning("Please enter at least 3 words!");
      return;
    }
    setLoading(true);

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (token && token !== "null" && token !== "undefined") {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${apiBaseUrl}/generate-jokes`, {
        method: "POST",
        headers: headers,
        credentials: "include",
        body: JSON.stringify({ prompt: inputText }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Joke generated successfully!");
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
        toast.error("Failed to generate jokes!", data.error);
      }
    } catch (err) {
      toast.error("Failed to connect to server! Try again later.");
      console.error("Full error", err);
    } finally {
      setLoading(false);
    }
  };

  const renderJokeBox = (joke, index) => (
    <div
      key={index}
      className="joke-box p-3 mb-3 bg-white rounded shadow-sm position-relative"
    >
      <p className="mb-0">{joke}</p>
      <button
        onClick={() => copyToClipboard(joke)}
        className="copy-button position-absolute top-0 end-0 m-2 btn btn-sm"
      >
        <FiCopy />
      </button>
    </div>
  );

  return (
    <>
      <PageTitle title="Joke Generator" />
      <section className="bg-dark py-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title text-center mb-4">
                    ✨Generate Your favorite Jokes With Our AI-powered
                    JokeGenerator✨
                  </h3>
                  {!token && (
                    <div className="alert alert-info">
                      You have {remainingGenerations} free generations. Sign up
                      to unlock unlimited joke generation!
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        autoComplete="text"
                        placeholder="Enter at least 3 words..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        required
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="col-md-6 btn btn-primary me-2"
                        disabled={loading}
                      >
                        {loading ? <LoadingSpinner /> : "Generate Jokes"}
                      </button>
                      <button
                        type="button"
                        className="col-md-6 btn btn-secondary"
                        onClick={() => {
                          setInputText("");
                          setJokes({ english: [], hindi: [] });
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </form>

                  {(jokes.english.length > 0 || jokes.hindi.length > 0) && (
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <h4 className="mb-3 d-flex justify-content-center align-items-center">
                          English Jokes
                        </h4>
                        {jokes.english.map((joke, index) =>
                          renderJokeBox(joke, index, "english")
                        )}
                      </div>
                      <div className="col-md-6">
                        <h4 className="mb-3 d-flex justify-content-center align-items-center">
                          Hindi Jokes
                        </h4>
                        {jokes.hindi.map((joke, index) =>
                          renderJokeBox(joke, index, "hindi")
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JokeGenerator;
