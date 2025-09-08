import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiSmile,
  FiThumbsUp,
  FiTrendingUp,
  FiStar,
  FiArrowRight,
  FiTarget,
  FiUser,
  FiType,
  FiZap,
  FiHome,
  FiLinkedin,
  FiGithub,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiLogIn,
  FiUserPlus,
  FiRefreshCw,
  FiMessageCircle,
  FiShield,
} from "react-icons/fi";
import PageTitle from "./PageTitle";
import { appConfig } from "./config";
import { toast } from "react-toastify";

const Home = () => {
  const apiBaseUrl = `${appConfig.baseApiUrl}`;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        } else {
          console.error("No token found");
          return;
        }

        const response = await fetch(`${apiBaseUrl}/home`, {
          method: "GET",
          headers: headers,
        });

        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          toast.error(data.error || "Unauthorized access");
        }
      } catch (err) {
        toast.error("Failed to fetch user data!");
        console.error(err);
      }
    };

    fetchUserData();
  }, [apiBaseUrl]);

  const featuredJokes = [
    {
      text: "Why don't scientists trust atoms? Because they make up everything!",
      author: "JokeMaster42",
      likes: 1234,
      category: "Science",
    },
    {
      text: "What did the grape say when it got stepped on? Nothing, it just let out a little wine!",
      author: "PunPro",
      likes: 987,
      category: "Food",
    },
    {
      text: "Why did the scarecrow win an award? Because he was outstanding in his field!",
      author: "JestKing",
      likes: 856,
      category: "Farming",
    },
    {
      text: "Why can't your nose be 12 inches long? Because then it would be a foot!",
      author: "NoseKnows",
      likes: 1123,
      category: "Anatomy",
    },
    {
      text: "Why did the math book look sad? Because it had too many problems.",
      author: "NumberNerd",
      likes: 1045,
      category: "Math",
    },
    {
      text: "What do you call fake spaghetti? An impasta!",
      author: "PastaPun",
      likes: 986,
      category: "Food",
    },
    {
      text: "Why was the broom late? It swept in!",
      author: "CleanJoker",
      likes: 847,
      category: "Everyday Life",
    },
    {
      text: "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
      author: "ClubComedian",
      likes: 759,
      category: "Sports",
    },
    {
      text: "What do you call cheese that isn't yours? Nacho cheese!",
      author: "CheesyChuckle",
      likes: 1420,
      category: "Food",
    },
  ];

  const categories = [
    {
      name: "Puns",
      count: 2500,
      icon: <FiTarget className="text-primary" size={28} />,
    },
    {
      name: "Dad Jokes",
      count: 1800,
      icon: <FiUser className="text-success" size={28} />,
    },
    {
      name: "Wordplay",
      count: 1500,
      icon: <FiType className="text-info" size={28} />,
    },
    {
      name: "Situation Comedy",
      count: 2000,
      icon: <FiSmile className="text-warning" size={28} />,
    },
    {
      name: "One-liners",
      count: 1200,
      icon: <FiZap className="text-danger" size={28} />,
    },
    {
      name: "Knock-knock",
      count: 800,
      icon: <FiHome className="text-secondary" size={28} />,
    },
  ];

  const stats = [
    {
      label: "Total Jokes Generated",
      value: "10,000+",
      icon: <FiSmile className="text-primary" size={48} />,
    },
    {
      label: "Daily Users",
      value: "500+",
      icon: <FiTrendingUp className="text-success" size={48} />,
    },
    {
      label: "Languages",
      value: "2",
      icon: <FiStar className="text-warning" size={48} />,
    },
  ];

  return (
    <>
      <PageTitle title="Welcome to JokeMaster" />
      <div className="min-vh-100">
        {/* Hero Section */}
        <section className="hero-section d-flex align-items-center">
          <div className="container position-relative">
            <div className="row align-items-center min-vh-100 py-5">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="hero-content">
                  <h1 className="display-3 fw-bold text-white mb-4">
                    Welcome to <span className="text-gradient">JokeMaster</span>
                  </h1>
                  <p className="lead text-white-50 mb-5 fs-5">
                    Generate hilarious jokes in English and Hindi with our
                    AI-powered joke generator. Just enter a few words and let
                    the magic happen!
                  </p>
                  <div className="d-flex flex-column flex-sm-row gap-3">
                    <Link
                      to="/generate-jokes"
                      className="btn btn-light btn-modern btn-lg hover-zoom"
                    >
                      <FiZap className="me-2" />
                      Generate Jokes
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-image text-center">
                  <img
                    src="/happy-laugh-group-people.png"
                    alt="Laughing people enjoying jokes"
                    className="img-fluid rounded-4 shadow-lg hover-lift"
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">
                Loved by <span className="text-gradient">Many People</span>
              </h2>
              <p className="lead text-muted">
                Join thousands of users spreading laughter worldwide
              </p>
            </div>
            <div className="row g-4">
              {stats.map((stat, index) => (
                <div key={index} className="col-md-4">
                  <div className="modern-card text-center p-4 h-100 hover-lift">
                    <div className="mb-3">{stat.icon}</div>
                    <h3 className="display-6 fw-bold mb-2 text-primary">
                      {stat.value}
                    </h3>
                    <p className="text-muted mb-0 fs-6">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">Browse by Category</h2>
              <p className="lead text-muted">
                Discover jokes that match your sense of humor
              </p>
            </div>
            <div className="row g-4">
              {categories.map((category, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <div
                    className="modern-card p-4 h-100 hover-lift"
                    role="button"
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-3">{category.icon}</div>
                      <div className="flex-grow-1">
                        <h5 className="fw-semibold mb-1">{category.name}</h5>
                        <p className="text-muted mb-0 small">
                          {category.count.toLocaleString()} jokes
                        </p>
                      </div>
                      <FiArrowRight className="text-muted" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Jokes Section */}
        <section id="featured" className="section-padding bg-light">
          <div className="container">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
              <div>
                <h2 className="display-5 fw-bold mb-2">Featured Jokes</h2>
                <p className="text-muted mb-0">
                  Our most popular jokes handpicked for you
                </p>
              </div>
              <Link
                to="#"
                className="btn btn-primary btn-modern hover-zoom mt-3 mt-md-0"
              >
                View All <FiArrowRight className="ms-2" />
              </Link>
            </div>
            <div className="row g-4">
              {featuredJokes.map((joke, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <div className="modern-card p-4 h-100 hover-lift">
                    <div className="mb-3">
                      <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                        {joke.category}
                      </span>
                    </div>
                    <p className="mb-4 text-dark lh-base">{joke.text}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted fw-medium">
                        By {joke.author}
                      </small>
                      <div className="d-flex align-items-center text-muted">
                        <FiThumbsUp className="me-1" size={16} />
                        <small className="fw-medium">
                          {joke.likes.toLocaleString()}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding gradient-primary">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h2 className="display-5 fw-bold text-white mb-4">
                  Ready to Start Laughing?
                </h2>
                <p className="lead text-white-50 mb-5">
                  Start generating your own hilarious content in multiple
                  languages and share the joy of laughter with friends and
                  family! Whether you're a fan of witty wordplay, clever puns,
                  or classic one-liners, our AI-powered joke generator has
                  something for everyone.
                </p>
                {userData ? (
                  <Link
                    to="/generate-jokes"
                    className="btn btn-light btn-modern btn-lg hover-zoom"
                  >
                    <FiZap className="me-2" />
                    Generate Jokes Now
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-light btn-modern btn-lg hover-zoom"
                  >
                    <FiUser className="me-2" />
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-light border-top">
          <div className="container section-padding">
            {/* Main Footer Content */}
            <div className="row g-5 mb-5">
              {/* Brand Section */}
              <div className="col-lg-5 col-md-6">
                <div className="mb-4">
                  <Link
                    className="d-flex align-items-center text-decoration-none mb-3"
                    to="/"
                  >
                    <FiZap className="me-2 text-primary" size={32} />
                    <h4 className="fw-bold text-dark mb-0">JokeMaster</h4>
                  </Link>
                  <p className="text-muted mb-4 lh-base">
                    Transform any topic into hilarious jokes with our AI-powered
                    generator. Supporting English and Hindi, we make laughter
                    accessible to everyone.
                  </p>
                  <div className="d-flex gap-3">
                    <a
                      href="https://www.linkedin.com/in/atulguptag/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm rounded-circle p-2 hover-zoom"
                      aria-label="LinkedIn"
                    >
                      <FiLinkedin size={16} />
                    </a>
                    <a
                      href="https://www.github.com/atulguptag/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm rounded-circle p-2 hover-zoom"
                      aria-label="GitHub"
                    >
                      <FiGithub size={16} />
                    </a>
                    <a
                      href="https://www.facebook.com/itsatulguptag/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm rounded-circle p-2 hover-zoom"
                      aria-label="Facebook"
                    >
                      <FiFacebook size={16} />
                    </a>
                    <a
                      href="https://www.instagram.com/itsatulguptag/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm rounded-circle p-2 hover-zoom"
                      aria-label="Instagram"
                    >
                      <FiInstagram size={16} />
                    </a>
                    <a
                      href="https://www.twitter.com/atulgupta_g/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm rounded-circle p-2 hover-zoom"
                      aria-label="Twitter"
                    >
                      <FiTwitter size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                <h6 className="fw-bold text-dark mb-3">Platform</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link
                      to="/generate-jokes"
                      className="text-muted text-decoration-none hover-zoom d-flex align-items-center"
                    >
                      <FiZap className="me-2" size={14} />
                      Generate Jokes
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/profile"
                      className="text-muted text-decoration-none hover-zoom d-flex align-items-center"
                    >
                      <FiUser className="me-2" size={14} />
                      My Profile
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Account */}
              <div className="col-lg-2 col-md-6 col-sm-6">
                <h6 className="fw-bold text-dark mb-3">Account</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link
                      to="/login"
                      className="text-muted text-decoration-none hover-zoom d-flex align-items-center"
                    >
                      <FiLogIn className="me-2" size={14} />
                      Sign In
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/signup"
                      className="text-muted text-decoration-none hover-zoom d-flex align-items-center"
                    >
                      <FiUserPlus className="me-2" size={14} />
                      Sign Up
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/reset-password"
                      className="text-muted text-decoration-none hover-zoom d-flex align-items-center"
                    >
                      <FiRefreshCw className="me-2" size={14} />
                      Reset Password
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div className="col-lg-2 col-md-6 col-sm-6">
                <h6 className="fw-bold text-dark mb-3">Support</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a
                      href="mailto:contact@jokemaster.com"
                      className="text-muted text-decoration-none hover-zoom d-flex align-items-center"
                    >
                      <FiMail className="me-2" size={14} />
                      Contact Us
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-muted text-decoration-none hover-zoom d-flex align-items-center"
                    >
                      <FiMessageCircle className="me-2" size={14} />
                      Help Center
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-muted text-decoration-none hover-zoom d-flex align-items-center"
                    >
                      <FiShield className="me-2" size={14} />
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="row justify-content-center mb-5">
              <div className="col-lg-6 col-md-8">
                <div className="modern-card p-4 text-center">
                  <h5 className="fw-bold text-dark mb-3">
                    Stay Updated with JokeMaster
                  </h5>
                  <p className="text-muted mb-4">
                    Get the latest jokes, updates, and exclusive content
                    delivered to your inbox. Join our community of laughter
                    enthusiasts!
                  </p>
                  <div className="row g-2 justify-content-center">
                    <div className="col-md-8">
                      <input
                        type="email"
                        className="form-control py-2"
                        placeholder="Enter your email address"
                        style={{ borderRadius: "8px" }}
                      />
                    </div>
                    <div className="col-md-4">
                      <button
                        className="btn btn-primary w-100 py-2"
                        type="button"
                        style={{ borderRadius: "8px" }}
                      >
                        <FiArrowRight className="me-2" size={16} />
                        Subscribe
                      </button>
                    </div>
                  </div>
                  <small className="text-muted mt-3 d-block">
                    Join 500+ users getting weekly joke updates. Unsubscribe
                    anytime.
                  </small>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-top pt-4">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <p className="text-muted small mb-0">
                    &copy; {new Date().getFullYear()} JokeMaster. All rights
                    reserved.
                  </p>
                </div>
                <div className="col-md-6 text-md-end">
                  <div className="d-flex justify-content-md-end gap-4 mt-3 mt-md-0">
                    <a
                      href="#"
                      className="text-muted text-decoration-none small hover-zoom"
                    >
                      Terms of Service
                    </a>
                    <a
                      href="#"
                      className="text-muted text-decoration-none small hover-zoom"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="#"
                      className="text-muted text-decoration-none small hover-zoom"
                    >
                      Cookie Policy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
