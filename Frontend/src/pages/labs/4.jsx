import React, { useState } from "react";
import Layout from "../../components/Layout";
import "./LabOutline.css";
import { Link } from "react-router-dom";

// Sample modules data
const modules = [
  {
    id: 1,
    title: "Module 1: Web Application Architecture & Entry Points",
    summary: "This module introduces the foundational structure of web applications, focusing on how data flows through client-server communication and identifying initial entry points for attacks.",
    questions: [
      { label: "What is the HTTP protocol, and how is it used in client-server communication?", name: "q1" },
      { label: "List three common HTTP methods and explain their use cases.", name: "q2" },
      { label: "Which part of a web application typically stores session data: front-end or back-end?", name: "q3" },
      { label: "What are common attack surfaces in a modern web application?", name: "q4" },
      { label: "Use BurpSuite to intercept a login request. What are the names of the intercepted input parameters?", name: "q5" },
      { label: "Inspect the headers and status code using curl or BurpSuite for a forbidden page. What status code is returned?", name: "q6" }
    ]
  },
  {
    id: 2,
    title: "Module 2: SQL Injection Discovery & Exploitation",
    summary: "This module explores how attackers exploit poorly sanitized input fields to manipulate backend SQL queries and access sensitive data.",
    questions: [
      { label: "What is SQL Injection, and how does it occur in a web application?", name: "q1" },
      { label: "What does the payload ' OR '1'='1 do inside a SQL query?", name: "q2" },
      { label: "Which SQL operator is commonly used to test for injection: AND, OR, JOIN, or SELECT?", name: "q3" },
      { label: "What is the purpose of -- in a SQLi payload?", name: "q4" },
      { label: "Run sqlmap on a test URL http://site.com/page.php?id=2. What databases are discovered using --dbs?", name: "q5" },
      { label: "Use sqlmap to extract tables from the discovered DB. List any table containing user credentials.", name: "q6" }
    ]
  },
  {
    id: 3,
    title: "Module 3: Input Manipulation, XSS & File Inclusions",
    summary: "This module focuses on how improper input handling can lead to client-side attacks like XSS and server-side issues like LFI/RFI. You’ll test and exploit these vulnerabilities using common tools.",
    questions: [
      { label: "What’s the difference between Reflected, Stored, and DOM-based XSS?", name: "q1" },
      { label: "What is Local File Inclusion (LFI), and how can it be abused?", name: "q2" },
      { label: "Which characters are often used to test for weak input validation?", name: "q3" },
      { label: "What is the impact of uploading a .php.jpg file to a poorly filtered uploader?", name: "q4" },
      { label: "Inject <script>alert(1)</script> into a URL parameter. Did the alert fire? Provide the URL used.", name: "q5" },
      { label: "Access /etc/passwd using a vulnerable file parameter like ?file=../../../../etc/passwd. Was the content displayed?", name: "q6" }
    ]
  }
];

const LabsOutlinePage = () => {
  const [openModule, setOpenModule] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  const handleInputChange = (moduleId, name, value) => {
    setAnswers((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [name]: value
      }
    }));
  };

  const handleSubmitQuestion = (moduleId, questionName) => {
    const answer = answers[moduleId]?.[questionName];
    if (!answer) {
      alert("Please provide an answer before submitting.");
      return;
    }
    alert(`Submitted answer for Module ${moduleId}, Question ${questionName}: ${answer}`);
    setSubmittedAnswers((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [questionName]: true
      }
    }));
  };

  const isModuleComplete = (moduleId) => {
    const moduleQuestions = modules.find(m => m.id === moduleId)?.questions || [];
    const submittedCount = Object.keys(submittedAnswers[moduleId] || {}).length;
    return moduleQuestions.length === submittedCount;
  };

  const allModulesCompleted = modules.every(module => isModuleComplete(module.id));

  return (
    <>
      <Layout>
      {/* Module Header */}
      <section
        className="lab-info-section"
        style={{
          background: "#232d3f",
          color: "#fff",
          padding: "32px 0",
          textAlign: "center",
          paddingTop: "150px"
        }}
      >
        <div className="container" style={{ margin: "0 auto", textAlign: "left" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24
          }}>
            <img
              src="/assets/img/home-1/shop/Medium Level 2.png" alt=""
              style={{
                width: 110,
                height: 110,
                marginRight: 32,
                borderRadius: 12, 
                background: '#ffcc33',
                padding: 8,
                objectFit: "contain"
              }}
            />
            <div>
              <h1
                style={{
                  fontSize: "2.2rem",
                  marginBottom: "8px",
                  color: "#39FF14",
                  textTransform: "none"
                }}
              >
                Web Exploitation Fundamentals
              </h1>
              <p
                style={{
                  fontSize: "1.15rem",
                  color: "#fff",
                  margin: 0,
                  textTransform: "none"
                }}
              >
                Master the art of web exploitation: from understanding architecture and entry points to exploiting SQLi, XSS, and file inclusions in real-world scenarios.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Accordion Section */}
      <section style={{
        background: "#181c2a",
        minHeight: "60vh",
        padding: "32px 0"
      }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {modules.map(module => (
            <div
              key={module.id}
              style={{
                marginBottom: 18,
                borderRadius: 8,
                background: "#232d3f",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}
            >
              <div
                onClick={() => setOpenModule(openModule === module.id ? null : module.id)}
                style={{
                  cursor: "pointer",
                  padding: "22px 32px",
                  display: "flex",
                  alignItems: "center",
                  borderBottom: openModule === module.id ? "1px solid #39FF14" : "none",
                  background: "#232d3f",
                  color: "#39FF14",
                  fontWeight: 700,
                  fontSize: "1.18rem",
                  transition: "background 0.2s",
                  textTransform: "none"
                }}
              >
                <span style={{
                  color: "#39FF14",
                  fontWeight: 700,
                  marginRight: 12,
                  textTransform: "none"
                }}>
                  Module {module.id}
                </span>
                <span style={{
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none"
                }}>
                  {module.title.replace(/^Module \d+: /, "")}
                </span>
                <span style={{ marginLeft: "auto", color: "#fff", fontSize: 22 }}>
                  {openModule === module.id ? "\u25B2" : "\u25B6"}
                </span>
              </div>
              {openModule === module.id && (
                <div style={{
                  padding: "24px 32px",
                  color: "#fff",
                  fontSize: "1.08rem",
                  background: "#232d3f",
                  textTransform: "none"
                }}>
                  <div style={{ marginBottom: 8, color: "#bfc9da", textTransform: "none" }}>
                    {module.summary}
                  </div>
                  {isLoggedIn ? (
                    <div>
                      {module.questions.map((q, idx) => (
                        <div key={q.name} style={{
                          marginBottom: 24,
                          background: "#1a1f2e",
                          padding: 16,
                          borderRadius: 8
                        }}>
                          <label style={{
                            color: "#39FF14",
                            fontWeight: 600,
                            display: "block",
                            marginBottom: 6,
                            textTransform: "none"
                          }}>
                            Question {idx + 1}. {q.label}
                          </label>
                          <div style={{
                            display: "flex",
                            gap: 12,
                            alignItems: "flex-start"
                          }}>
                            <textarea
                              value={answers[module.id]?.[q.name] || ""}
                              onChange={e => handleInputChange(module.id, q.name, e.target.value)}
                              style={{
                                flex: 1,
                                minHeight: 60,
                                padding: "10px",
                                borderRadius: 4,
                                border: "1px solid #34495e",
                                background: "#181c2a",
                                color: "#fff",
                                resize: "vertical",
                                textTransform: "none"
                              }}
                              placeholder="Answer Here"
                            />
                            <button
                              onClick={() => handleSubmitQuestion(module.id, q.name)}
                              style={{
                                background: submittedAnswers[module.id]?.[q.name] ? "#2ecc71" : "#0FA30F",
                                color: "#fff",
                                border: "none",
                                borderRadius: 4,
                                padding: "10px 24px",
                                fontWeight: 700,
                                cursor: "pointer",
                                minWidth: "100px",
                                textTransform: "none"
                              }}
                              disabled={submittedAnswers[module.id]?.[q.name]}
                            >
                              {submittedAnswers[module.id]?.[q.name] ? 'Submitted' : 'Submit'}
                            </button>
                          </div>
                        </div>
                      ))}
                      {isModuleComplete(module.id) && (
                        <div style={{
                          marginTop: 16,
                          padding: 12,
                          background: "#2ecc71",
                          color: "#fff",
                          borderRadius: 4,
                          textAlign: "center",
                          textTransform: "none"
                        }}>
                          Module Completed! 🎉
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      style={{
                        background: "#0FA30F",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "12px 32px",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        marginTop: 18,
                        cursor: "pointer",
                        textTransform: "none"
                      }}
                      onClick={() => window.location.href = "/login"}
                    >
                      Login to Answer
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
          {/* Completion Message */}
          {allModulesCompleted && (
            <div style={{
              marginTop: 48,
              background: "#0FA30F",
              color: "#fff",
              padding: "18px 24px",
              borderRadius: 8,
              textAlign: "center",
              fontWeight: 600,
              fontSize: "1.2rem",
              textTransform: "none"
            }}>
              <span role="img" aria-label="trophy">🏆</span> Well Done! You've completed the Web Exploitation Fundamentals Lab.<br />
              Ready to take the next step? Head to <b>Advanced Web Attacks</b>.
            </div>
          )}
        </div>
      </section>
      {/* Lab Navigation Buttons */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: 1200,
        margin: "24px auto 0",
        padding: "0 24px"
      }}>
          <Link to="/labs/3" className="lab-nav-btn">
            &larr; Previous Lab
          </Link>
          <Link to="/labs/5" className="lab-nav-btn">
            Next Lab &rarr;
          </Link>
      </div>
      </Layout>
    </>
  );
};

export default LabsOutlinePage;
