import React, { useState } from "react";
import Layout from "../../components/Layout";
import "./LabOutline.css";
import { Link } from "react-router-dom";

// Define your modules/questions for Lab 6 here
const modules = [
  {
    id: 1,
    title: "Module 1: Network Scanning Basics",
    summary: "Learn about different types of network scans and their purposes.",
    questions: [
      {
        label:
          "What is the difference between a TCP SYN scan and a TCP Connect scan?",
        name: "q1",
        options: [
          "SYN scan is stealthier; Connect scan completes the handshake.",
          "Connect scan is stealthier; SYN scan completes the handshake.",
          "Both are the same.",
          "Neither uses TCP.",
        ],
      },
      {
        label: "Which tool is commonly used for network scanning?",
        name: "q2",
        options: ["Nmap", "Wireshark", "Metasploit", "Burp Suite"],
      },
      {
        label: "Which scan type is most likely to be detected by a firewall?",
        name: "q3",
        options: ["TCP Connect scan", "TCP SYN scan", "UDP scan", "Idle scan"],
      },
      {
        label: "What does a 'NULL scan' send in the TCP packet?",
        name: "q4",
        options: [
          "No flags set",
          "SYN flag set",
          "ACK flag set",
          "FIN flag set",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Module 2: Advanced Scanning Techniques",
    summary: "Explore stealth scans, evasion, and timing options to bypass defenses.",
    questions: [
      {
        label: "Which Nmap option enables OS detection?",
        name: "q1",
        options: ["-O", "-sS", "-A", "-T4"],
      },
      {
        label: "What is the purpose of decoy scanning?",
        name: "q2",
        options: [
          "To mask the real source of the scan",
          "To increase scan speed",
          "To scan multiple hosts simultaneously",
          "To detect open UDP ports",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Module 3: Enumeration Fundamentals",
    summary: "Understand enumeration techniques for discovering services and users.",
    questions: [
      {
        label: "Which protocol is commonly used for Windows user enumeration?",
        name: "q1",
        options: ["SMB", "FTP", "HTTP", "DNS"],
      },
      {
        label: "What does the 'enum4linux' tool do?",
        name: "q2",
        options: [
          "Enumerates information from Windows machines",
          "Performs port scanning",
          "Captures network traffic",
          "Performs SQL injection",
        ],
      },
    ],
  },
];

const Lab6 = () => {
  const [openModule, setOpenModule] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  const handleInputChange = (moduleId, name, value) => {
    setAnswers((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [name]: value,
      },
    }));
  };

  const handleSubmitQuestion = (moduleId, questionName) => {
    const answer = answers[moduleId]?.[questionName];
    if (!answer || (Array.isArray(answer) && answer.length === 0)) {
      alert("Please provide an answer before submitting.");
      return;
    }
    alert(
      `Submitted answer for Module ${moduleId}, Question ${questionName}: ${answer}`
    );
    setSubmittedAnswers((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [questionName]: true,
      },
    }));
  };

  const isModuleComplete = (moduleId) => {
    const moduleQuestions =
      modules.find((m) => m.id === moduleId)?.questions || [];
    const submittedCount = Object.keys(submittedAnswers[moduleId] || {}).length;
    return moduleQuestions.length === submittedCount;
  };

  const allModulesCompleted = modules.every((module) =>
    isModuleComplete(module.id)
  );

  return (
    <>
      <Layout>
        <section
          className="lab-info-section"
          style={{
            background: "#232d3f",
            color: "#fff",
            padding: "32px 0",
            textAlign: "center",
            paddingTop: "150px",
            textTransform: "none",
          }}
        >
          <div
            className="container"
            style={{ margin: "0 auto", textAlign: "left", textTransform: "none" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
              }}
            >
              <img
  src="/assets/img/home-1/shop/Medium Level 3.png"
  alt="Medium Level 3"
  style={{
    width: 110,
    height: 110,
    marginRight: 32,
    borderRadius: 12,
    background: "#ffcc33",
    padding: 8,
    objectFit: "contain",
  }}
/>

              <div style={{ textTransform: "none" }}>
                <h1
                  style={{
                    fontSize: "2.2rem",
                    marginBottom: "8px",
                    color: "#39FF14",
                    textTransform: "none",
                  }}
                >
                  Network Scanning & Enumeration
                </h1>
                <p
                  style={{
                    fontSize: "1.15rem",
                    color: "#fff",
                    margin: 0,
                    textTransform: "none",
                  }}
                >
                  Master network scanning techniques and enumeration for
                  real-world pentesting.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          style={{
            background: "#181c2a",
            minHeight: "60vh",
            padding: "32px 0",
            textTransform: "none",
          }}
        >
          <div
            className="container"
            style={{ maxWidth: 1200, margin: "0 auto", textTransform: "none" }}
          >
            {modules.map((module) => (
              <div
                key={module.id}
                style={{
                  marginBottom: 18,
                  borderRadius: 8,
                  background: "#232d3f",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  textTransform: "none",
                }}
              >
                <div
                  onClick={() =>
                    setOpenModule(openModule === module.id ? null : module.id)
                  }
                  style={{
                    cursor: "pointer",
                    padding: "22px 32px",
                    display: "flex",
                    alignItems: "center",
                    borderBottom:
                      openModule === module.id ? "1px solid #39FF14" : "none",
                    background: "#232d3f",
                    color: "#39FF14",
                    fontWeight: 700,
                    fontSize: "1.18rem",
                    transition: "background 0.2s",
                    textTransform: "none",
                  }}
                >
                  <span
                    style={{
                      color: "#39FF14",
                      fontWeight: 700,
                      marginRight: 12,
                      textTransform: "none",
                    }}
                  >
                    Module {module.id}
                  </span>
                  <span
                    style={{ color: "#fff", fontWeight: 600, textTransform: "none" }}
                  >
                    {module.title.replace(/^Module \d+: /, "")}
                  </span>
                  <span
                    style={{ marginLeft: "auto", color: "#fff", fontSize: 22 }}
                  >
                    {openModule === module.id ? "\u25B2" : "\u25B6"}
                  </span>
                </div>
                {openModule === module.id && (
                  <div
                    style={{
                      padding: "24px 32px",
                      color: "#fff",
                      fontSize: "1.08rem",
                      background: "#232d3f",
                      textTransform: "none",
                    }}
                  >
                    <div style={{ marginBottom: 8, color: "#bfc9da", textTransform: "none" }}>
                      {module.summary}
                    </div>
                    {isLoggedIn ? (
                      <div>
                        {module.questions.map((q, idx) => (
                          <div
                            key={q.name}
                            style={{
                              marginBottom: 24,
                              background: "#1a1f2e",
                              padding: 16,
                              borderRadius: 8,
                              textTransform: "none",
                            }}
                          >
                            <label
                              style={{
                                color: "#39FF14",
                                fontWeight: 600,
                                display: "block",
                                marginBottom: 6,
                                textTransform: "none",
                              }}
                            >
                              Question {idx + 1}. {q.label}
                            </label>
                            <div
                              style={{
                                display: "flex",
                                gap: 12,
                                alignItems: "flex-start",
                                textTransform: "none",
                              }}
                            >
                              {q.options && !q.multi ? (
                                <div style={{ flex: 1 }}>
                                  {q.options.map((opt, i) => (
                                    <label
                                      key={i}
                                      style={{
                                        display: "block",
                                        marginBottom: 6,
                                        color: "#fff",
                                        fontWeight: 400,
                                        textTransform: "none",
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        name={`module${module.id}-${q.name}`}
                                        value={opt}
                                        checked={answers[module.id]?.[q.name] === opt}
                                        onChange={(e) =>
                                          handleInputChange(module.id, q.name, opt)
                                        }
                                        disabled={submittedAnswers[module.id]?.[q.name]}
                                        style={{ marginRight: 8 }}
                                      />
                                      {opt}
                                    </label>
                                  ))}
                                </div>
                              ) : q.options && q.multi ? (
                                <div style={{ flex: 1 }}>
                                  {q.options.map((opt, i) => (
                                    <label
                                      key={i}
                                      style={{
                                        display: "block",
                                        marginBottom: 6,
                                        color: "#fff",
                                        fontWeight: 400,
                                        textTransform: "none",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        name={`module${module.id}-${q.name}`}
                                        value={opt}
                                        checked={
                                          Array.isArray(answers[module.id]?.[q.name]) &&
                                          answers[module.id][q.name].includes(opt)
                                        }
                                        onChange={(e) => {
                                          const prev = Array.isArray(
                                            answers[module.id]?.[q.name]
                                          )
                                            ? answers[module.id][q.name]
                                            : [];
                                          if (e.target.checked) {
                                            handleInputChange(module.id, q.name, [
                                              ...prev,
                                              opt,
                                            ]);
                                          } else {
                                            handleInputChange(
                                              module.id,
                                              q.name,
                                              prev.filter((v) => v !== opt)
                                            );
                                          }
                                        }}
                                        disabled={submittedAnswers[module.id]?.[q.name]}
                                        style={{ marginRight: 8 }}
                                      />
                                      {opt}
                                    </label>
                                  ))}
                                </div>
                              ) : (
                                <textarea
                                  value={answers[module.id]?.[q.name] || ""}
                                  onChange={(e) =>
                                    handleInputChange(module.id, q.name, e.target.value)
                                  }
                                  style={{
                                    flex: 1,
                                    minHeight: 80,
                                    padding: "10px",
                                    borderRadius: 4,
                                    border: "1px solid #34495e",
                                    background: "#181c2a",
                                    color: "#fff",
                                    resize: "vertical",
                                    textTransform: "none",
                                  }}
                                  placeholder="Answer Here"
                                  disabled={submittedAnswers[module.id]?.[q.name]}
                                />
                              )}
                              <button
                                onClick={() => handleSubmitQuestion(module.id, q.name)}
                                style={{
                                  background: submittedAnswers[module.id]?.[q.name]
                                    ? "#2ecc71"
                                    : "#0FA30F",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: 4,
                                  padding: "10px 24px",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  minWidth: "100px",
                                  textTransform: "none",
                                }}
                                disabled={submittedAnswers[module.id]?.[q.name]}
                              >
                                {submittedAnswers[module.id]?.[q.name]
                                  ? "Submitted"
                                  : "Submit"}
                              </button>
                            </div>
                          </div>
                        ))}
                        {isModuleComplete(module.id) && (
                          <div
                            style={{
                              marginTop: 16,
                              padding: 12,
                              background: "#2ecc71",
                              color: "#fff",
                              borderRadius: 4,
                              textAlign: "center",
                              textTransform: "none",
                            }}
                          >
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
                          textTransform: "none",
                        }}
                        onClick={() => (window.location.href = "/login")}
                      >
                        Login to Answer
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
            {allModulesCompleted && (
              <div
                style={{
                  marginTop: 48,
                  background: "#0FA30F",
                  color: "#fff",
                  padding: "18px 24px",
                  borderRadius: 8,
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "1.2rem",
                  textTransform: "none",
                }}
              >
                <span role="img" aria-label="trophy">
                  🏆
                </span>{" "}
                Well Done! You've completed the Network Scanning & Enumeration
                Lab.
                <br />
                Ready to take the next step? Head to the next module.
              </div>
            )}
          </div>
        </section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: 1200,
            margin: "24px auto 0",
            padding: "0 24px",
            textTransform: "none",
          }}
        >
          <Link to="/labs/5" className="lab-nav-btn">
            &larr; Previous Lab
          </Link>
          <Link to="/labs/7" className="lab-nav-btn">
            Next Lab &rarr;
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default Lab6;
