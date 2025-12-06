import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const API_BASE_URL = "http://localhost:5000/api/challenges";

const UpcomingChallenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { data } = await axios.get(API_BASE_URL);
        setChallenges(data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };
    fetchChallenges();
  }, []);

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "#22c55e"; // green
      case "intermediate":
        return "#eab308"; // yellow
      case "hard":
        return "#ef4444"; // red
      default:
        return "#9ca3af";
    }
  };

  return (
    <Layout>
      <div
        style={{
          padding: "6rem 2rem 4rem",
          color: "white",
          minHeight: "100vh",
          backgroundColor: "#0a0a0a",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "900",
            marginBottom: "0.5rem",
            textAlign: "center",
            letterSpacing: "1px",
          }}
        >
          UPCOMING CTF CHALLENGES
        </h1>

        <p
          style={{
            color: "#9ca3af",
            textAlign: "center",
            marginBottom: "3rem",
            fontSize: "1.1rem",
          }}
        >
          Sharpen your skills with weekly challenges designed to test your OSCP readiness.
        </p>

        {challenges.length === 0 ? (
          <p style={{ textAlign: "center", color: "#9ca3af" }}>
            No upcoming challenges found.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {challenges.map((ch) => (
              <div
                key={ch.id}
                style={{
                  backgroundColor: "#111827",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.5rem 2rem",
                  boxShadow: "0 0 20px rgba(0, 255, 100, 0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 0 25px rgba(34,197,94,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(0,255,100,0.08)";
                }}
              >
                {/* 📝 LEFT SIDE - Text */}
                <div style={{ flex: 1, paddingRight: "1.5rem" }}>
                  <h2
                    style={{
                      color: "#22c55e",
                      fontWeight: "800",
                      fontSize: "1.5rem",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {ch.title}
                  </h2>
                  <p
                    style={{
                      color: "#9ca3af",
                      fontSize: "0.95rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {ch.desc}
                  </p>
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: getLevelColor(ch.level),
                      color: "black",
                      fontWeight: "bold",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "6px",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {ch.level}
                  </div>
                </div>

                {/* RIGHT SIDE - Image */}
                {ch.img && (
                  <img
                    src={ch.img}
                    alt={ch.title}
                    style={{
                      width: "260px",
                      height: "160px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      boxShadow: "0 0 10px rgba(34,197,94,0.2)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UpcomingChallenges;