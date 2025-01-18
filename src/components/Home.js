import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiSmile,
  FiThumbsUp,
  FiTrendingUp,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";
import PageTitle from "./PageTitle";
import { appConfig } from "./config";
import { toast } from "react-toastify";

const Home = () => {
  const apiBaseUrl = `${appConfig.baseApiUrl}`;
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
    { name: "Puns", count: 2500, icon: "🎯" },
    { name: "Dad Jokes", count: 1800, icon: "👨" },
    { name: "Wordplay", count: 1500, icon: "🔤" },
    { name: "Situation Comedy", count: 2000, icon: "😄" },
    { name: "One-liners", count: 1200, icon: "💫" },
    { name: "Knock-knock", count: 800, icon: "🚪" },
  ];

  const stats = [
    { label: "Total Jokes Generated", value: "10,000+", icon: <FiSmile /> },
    { label: "Daily Users", value: "500+", icon: <FiTrendingUp /> },
    { label: "Languages", value: "2", icon: <FiStar /> },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/home`, {
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data);
        } else {
          console.log(data.error);
        }
      } catch (err) {
        toast.error("Failed to fetch user data!");
        console.log(err);
      }
    };

    fetchUserData();
  }, [apiBaseUrl]);

  return (
    <>
      <PageTitle title="Welcome to JokeMaster" />
      <div className="min-vh-100">
        <section className="bg-dark text-white py-5">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-6">
                <h1 className="display-4 fw-bold mb-4">
                  Welcome to JokeMaster
                </h1>
                <p className="lead mb-4">
                  Generate hilarious jokes in English and Hindi with our
                  AI-powered joke generator. Just enter a few words and let the
                  magic happen!
                </p>
                <div className="d-flex justify-content-start gap-3">
                  <Link
                    to="/generate-jokes"
                    className="btn btn-light btn-lg hover-zoom mb-4"
                  >
                    Generate Jokes
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <img
                  src="/happy-laugh-group-people.png"
                  alt="Laughing people"
                  className="img-fluid rounded shadow-lg hover-zoom"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-dark py-5">
          <div className="container">
            <h2 className="text-white text-center mb-5">
              Loved by Many People
            </h2>
            <div className="row justify-content-center text-center">
              {stats.map((stat, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="hover-zoom card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <div className="display-4 text-primary mb-3">
                        {stat.icon}
                      </div>
                      <h3 className="h2 mb-2">{stat.value}</h3>
                      <p className="text-muted mb-0">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-dark py-5">
          <div className="container">
            <h2 className="text-white text-center mb-5">Browse by Category</h2>
            <div className="row g-4">
              {categories.map((category, index) => (
                <div key={index} className="col-md-4 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm hover-zoom">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="display-5 me-3">{category.icon}</span>
                        <div>
                          <h3 className="h5 mb-1">{category.name}</h3>
                          <p className="small text-muted mb-0">
                            {category.count.toLocaleString()} jokes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-dark py-5">
          <div className="container">
            <div className="text-white d-flex justify-content-between align-items-center mb-4">
              <h2>Featured Jokes</h2>
              <Link to="#" className="hover-zoom btn btn-primary">
                View All <FiArrowRight className="ms-2" />
              </Link>
            </div>
            <div className="row">
              {featuredJokes.map((joke, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="hover-zoom card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <div className="mb-3">
                        <span className="badge bg-dark">{joke.category}</span>
                      </div>
                      <p className="card-text mb-3">{joke.text}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">By {joke.author}</small>
                        <div className="d-flex align-items-center">
                          <FiThumbsUp className="me-1" />
                          <small>{joke.likes}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-dark py-5">
          <div className="container">
            <div className="text-white row justify-content-center">
              <div className="col-md-8 text-center">
                <h2 className="mb-4">Ready to Start Laughing?</h2>
                <p className="lead mb-4">
                  Start generating your own hilarious content in multiple
                  languages and share the joy of laughter with friends and
                  family! Whether you're a fan of witty wordplay, clever puns,
                  or classic one-liners, our AI-powered joke generator has
                  something for everyone. Explore endless possibilities, create
                  jokes in English and Hindi, and become the ultimate JokeMaster
                  in your circle.
                </p>
                <div className="d-flex justify-content-center align-items-center">
                  <Link
                    to="/generate-jokes"
                    className="hover-zoom btn btn-light btn-lg mb-4"
                  >
                    Generate Jokes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-dark text-white py-4">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-md-4 mb-4">
                <h5>About Us</h5>
                <p className="text-muted">
                  JokeMaster is your go-to platform for generating AI-powered
                  jokes in multiple languages. Spread laughter and joy with just
                  a click!
                </p>
              </div>
              <div className="col-md-4 mb-4">
                <h5>Contact Us</h5>
                <p className="text-muted">
                  Email:{" "}
                  <a
                    href="mailto:atulguptag111@gmail.com"
                    className="text-decoration-none"
                  >
                    atulguptag111@gmail.com
                  </a>{" "}
                  <br />
                  Phone: +91 700095XXXX
                </p>
                <div className="d-flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/atulguptag/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a
                    href="https://www.github.com/atulguptag/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    <i className="bi bi-github"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/itsatulguptag/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/itsatulguptag/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a
                    href="https://www.twitter.com/atulgupta_g/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-none"
                  >
                    <i className="bi bi-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-muted mb-0">
                &copy; {new Date().getFullYear()} JokeMaster. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>

        <style>
          {`
          .hover-zoom {
            transition: transform 0.2s;
          }
          .hover-zoom:hover {
            transform: scale(1.02);
          }
        `}
        </style>
      </div>
    </>
  );
};

export default Home;
