import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import "./labs/LabOutline.css";

const LabPage = () => {
  const { id } = useParams(); // lab displayOrder
  const { user, token } = useContext(AuthContext);

  const [lab, setLab] = useState(null);
  const [openModule, setOpenModule] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  // =====================================================
  // 1️⃣ Load Lab + Already Submitted Question IDs
  // =====================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 👉 Fetch lab details
        const labRes = await axios.get(`http://localhost:5000/api/labs/${id}`);
        setLab(labRes.data);

        // 👉 Fetch which questions user already submitted
        if (user) {
          const subRes = await axios.get(
            `http://localhost:5000/api/labs/submitted/${user.id}/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const submitted = subRes.data || [];

          // Convert to structure:
          // submittedAnswers[moduleId][questionId] = true
          const format = {};
          submitted.forEach((item) => {
            const mId = item.moduleId;
            const qId = item.questionId;

            if (!format[mId]) format[mId] = {};
            format[mId][qId] = true;
          });

          setSubmittedAnswers(format);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [id, user, token]);

  // =====================================================
  // 2️⃣ Handle input change
  // =====================================================
  const handleInputChange = (moduleId, questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [moduleId]: { ...prev[moduleId], [questionId]: value },
    }));
  };

  // =====================================================
  // 3️⃣ Submit single question
  // =====================================================
  const handleSubmitQuestion = async (moduleId, questionId) => {
    if (submittedAnswers[moduleId]?.[questionId]) return; // block repeat

    const answer = answers[moduleId]?.[questionId];
    if (!answer) {
      toast.warning("Please select an answer before submitting.", {
        icon: <AlertTriangle size={18} color="#eab308" />,
      });
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/labs/submit",
        {
          userId: Number(user?.id),
          answers: [{ questionId: Number(questionId), selected: answer }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Mark as submitted locally
      setSubmittedAnswers((prev) => ({
        ...prev,
        [moduleId]: { ...prev[moduleId], [questionId]: true },
      }));

      toast.success("Answer submitted successfully", {
        icon: <CheckCircle size={18} color="#22c55e" />,
      });
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error("Failed to submit. Try again.", {
        icon: <XCircle size={18} color="#ef4444" />,
      });
    }
  };

  // =====================================================
  // 4️⃣ Loading state
  // =====================================================
  if (!lab) {
    return (
      <Layout>
        <div style={{ color: "#fff", textAlign: "center", marginTop: "200px" }}>
          Loading...
        </div>
      </Layout>
    );
  }

  // =====================================================
  // 5️⃣ Render UI
  // =====================================================
  return (
    <Layout>
      {/* Header */}
      <section
        className="lab-info-section"
        style={{
          background: "#232d3f",
          color: "#fff",
          paddingTop: "150px",
          paddingBottom: "32px",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ textAlign: "left", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <img
              src="/assets/img/home-1/shop/Easy Level 1.png"
              alt="Lab"
              style={{
                width: 110,
                height: 110,
                marginRight: 32,
                borderRadius: 12,
                background: "#34495e",
                padding: 8,
                objectFit: "contain",
              }}
            />
            <div>
              <h1 style={{ fontSize: "2.2rem", color: "#39FF14" }}>
                {lab.title.toUpperCase()}
              </h1>
              <p style={{ fontSize: "1.15rem" }}>{lab.summary}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section style={{ background: "#181c2a", padding: "32px 0" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {lab.modules.map((mod, index) => (
            <div key={mod.id} style={{ marginBottom: 18, background: "#232d3f", borderRadius: 8 }}>
              {/* Module Header */}
              <div
                onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)}
                style={{
                  cursor: "pointer",
                  padding: "22px 32px",
                  display: "flex",
                  alignItems: "center",
                  color: "#39FF14",
                  fontWeight: 700,
                  background: "#232d3f",
                }}
              >
                <span style={{ marginRight: 12 }}>Module {index + 1}</span>
                <span style={{ color: "#fff" }}>{mod.title}</span>
                <span style={{ marginLeft: "auto", color: "#fff" }}>
                  {openModule === mod.id ? "▲" : "▶"}
                </span>
              </div>

              {/* Module Content */}
              {openModule === mod.id && (
                <div style={{ padding: "24px 32px", background: "#232d3f", color: "#fff" }}>
                  {mod.questions.map((q, idx) => {
                    const already = submittedAnswers[mod.id]?.[q.id] || false;

                    return (
                      <div
                        key={q.id}
                        style={{
                          marginBottom: 24,
                          background: "#1a1f2e",
                          padding: 16,
                          borderRadius: 8,
                        }}
                      >
                        <label
                          style={{
                            color: "#39FF14",
                            fontWeight: 600,
                            marginBottom: 6,
                            display: "block",
                          }}
                        >
                          Question {idx + 1}. {q.text}
                        </label>

                        {/* MCQ */}
                        {Array.isArray(q.options) ? (
                          q.options.map((opt, i) => (
                            <label key={i} style={{ display: "block", color: "#fff" }}>
                              <input
                                type="radio"
                                name={`q${q.id}`}
                                value={opt}
                                checked={answers[mod.id]?.[q.id] === opt}
                                onChange={() => handleInputChange(mod.id, q.id, opt)}
                                disabled={already}
                                style={{ marginRight: 8 }}
                              />
                              {opt}
                            </label>
                          ))
                        ) : (
                          <input
                            type="text"
                            value={answers[mod.id]?.[q.id] || ""}
                            onChange={(e) => handleInputChange(mod.id, q.id, e.target.value)}
                            disabled={already}
                            style={{
                              width: "100%",
                              padding: "10px",
                              background: "#181c2a",
                              border: "1px solid #34495e",
                              color: "#fff",
                              borderRadius: 4,
                            }}
                          />
                        )}

                        {/* Submit Button */}
                        <button
                          onClick={() => handleSubmitQuestion(mod.id, q.id)}
                          disabled={already}
                          style={{
                            background: already ? "#2ecc71" : "#0FA30F",
                            color: "#fff",
                            border: "none",
                            padding: "10px 24px",
                            borderRadius: 4,
                            marginTop: 10,
                            cursor: already ? "not-allowed" : "pointer",
                            fontWeight: 700,
                          }}
                        >
                          {already ? "Submitted" : "Submit"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 24,
              padding: "0 24px",
            }}
          >
            {parseInt(id) > 1 ? (
              <Link to={`/labs/${parseInt(id) - 1}`} className="lab-nav-btn">
                ← Previous Lab
              </Link>
            ) : (
              <div />
            )}

            {!lab.isLastLab ? (
              <Link to={`/labs/${parseInt(id) + 1}`} className="lab-nav-btn">
                Next Lab →
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LabPage;
