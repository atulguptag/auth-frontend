import React, { useState, useEffect, useContext } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { appConfig } from "./config";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { token } = useContext(AuthContext);
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

        console.log("Response Data", response);
        if (response.ok) {
          const data = await response.json();
          console.log("Json response", data);
          setPrompts(data);
        } else {
          toast.error("Unable to load prompts");
        }
      } catch (error) {
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
      <Container className="text-center mt-5">
        <h2>Please log in to view your prompt history</h2>
      </Container>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Your Prompt History</h2>
      {prompts.length === 0 ? (
        <div className="text-center">
          <p>You haven't generated any jokes yet!</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {prompts.map((prompt) => (
            <Col key={prompt.ID}>
              <Card className="h-100 shadow-sm hover-lift" bg="light">
                <Card.Body>
                  <Card.Text>
                    <strong>Prompt:</strong> {prompt.text}
                  </Card.Text>
                  <Card.Footer className="bg-transparent text-muted">
                    Generated on: {new Date(prompt.CreatedAt).toLocaleString()}
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Profile;
