
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Award, Medal } from "lucide-react";
import { Trophy } from "lucide-react";


const medals = {
  1: <Award size={20} color="#FFD700" />,       // Gold
  2: <Medal size={20} color="#C0C0C0" />,       // Silver
  3: <Medal size={20} color="#CD7F32" />,       // Bronze
};


const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/leaderboard");
        setLeaderboardData(res.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <Layout>
        <main
          style={{
            paddingTop: "130px",
            textAlign: "center",
            color: "#00ff41",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <h2>Loading Leaderboard...</h2>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main style={{ paddingTop: "130px", fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
          <h2
  style={{
    textAlign: "center",
    fontSize: "2.8rem",
    marginBottom: "30px",
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    color: "#ffffff"
  }}
>
  <Trophy size={38} color="#00ff41" strokeWidth={1.5} />
  Global Leaderboard
</h2>


          {/* --------------------  RESPONSIVE CSS  -------------------- */}
          <style>{`
            .table-responsive {
              width: 100%;
              overflow-x: auto;
              overflow-y: hidden;
              padding-bottom: 12px;
              -webkit-overflow-scrolling: touch;
            }

            .leaderboard-table {
              min-width: 650px; 
              width: 100%;
              border-collapse: collapse;
            }

            .leaderboard-table th,
            .leaderboard-table td {
              white-space: nowrap;
              padding: 10px;
            }

            .avatar-img {
              width: 45px;
              height: 45px;
              border-radius: 50%;
              border: 2px solid #00ff6aff;
              object-fit: cover;
            }

            .flag-img {
              width: 28px;
              height: 18px;
              border-radius: 4px;
              object-fit: cover;
            }

            @media (max-width: 480px) {
              h2 {
                font-size: 1.8rem !important;
              }

              .avatar-img {
                width: 35px !important;
                height: 35px !important;
              }

              .flag-img {
                width: 20px !important;
                height: 14px !important;
              }

              .leaderboard-table th,
              .leaderboard-table td {
                padding: 6px !important;
                font-size: 12px !important;
              }
            }
          `}</style>

          {/* --------------------  TABLE WRAPPED FOR RESPONSIVENESS  -------------------- */}
          <div className="table-responsive">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Avatar</th>
                  <th>Username</th>
                  <th>Completed Labs</th>
                  <th>Country</th>
                </tr>
              </thead>

              <tbody>
                {leaderboardData.map((row, index) => (
                  <tr key={index}>
                    {/* Rank */}
                    <td>{medals[index + 1] || index + 1}</td>

                    {/* Avatar */}
                    <td>
                      {row.image ? (
                        <img
                          src={`http://localhost:5000${row.image}`}
                          alt={row.username}
                          className="avatar-img"
                        />
                      ) : (
                        <div
                          style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            backgroundColor: "#0FA30F30",
                            color: "#00ff41",
                            fontWeight: "bold",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {row.username?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </td>

                    {/* Username */}
                    <td
                      style={{
                        fontWeight: index === 0 ? "bold" : "normal",
                        color:
                          index === 0
                            ? "#FFD700"
                            : index === 1
                            ? "#E6E8FA"
                            : index === 2
                            ? "#CD7F32"
                            : "#fff",
                      }}
                    >
                      {row.username}
                    </td>

                    {/* Completed Labs */}
                    <td style={{ color: "#00ff41", fontWeight: "bold" }}>
                      {row.completedLabsCount}
                    </td>

                    {/* Country */}
                    <td>
                      {row.country ? (
                        <>
                          <img
                            src={`https://flagcdn.com/w40/${row.country.toLowerCase()}.png`}
                            alt={row.country}
                            className="flag-img"
                          />{" "}
                          {new Intl.DisplayNames(["en"], { type: "region" }).of(
                            row.country
                          )}
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* -------------------- END TABLE -------------------- */}
        </div>
      </main>
    </Layout>
  );
};

export default Leaderboard;
