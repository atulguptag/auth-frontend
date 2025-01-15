import React, { useState } from "react";
import PageTitle from "./PageTitle";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/home", {
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageTitle title="Home" />
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">
                  Welcome to Go Auth Application
                </h3>
                {error && <div className="alert alert-danger">{error}</div>}
                {userData && (
                  <div>
                    <p className="text-center">Your role is: {userData.role}</p>
                    <div className="d-grid gap-2">
                      <button className="btn btn-primary">View Profile</button>
                      {userData.role === "admin" && (
                        <button className="btn btn-secondary">
                          Admin Panel
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
