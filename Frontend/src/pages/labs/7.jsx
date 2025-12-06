import React, { useState } from "react";
import Layout from "../../components/Layout";
import "./LabOutline.css";
import { Link } from "react-router-dom";

const modules = [
  {
    id: 1,
    title: "Module 1: Privilege Escalation Fundamentals",
    summary: "Understand the basics of privilege escalation on Linux systems.",
    questions: [
      {
        label: "What is privilege escalation in the context of Linux security?",
        name: "q1",
        options: [
          "Gaining higher-level permissions than intended",
          "Changing file permissions",
          "Escaping a virtual machine",
          "Installing new software",
        ],
      },
      {
        label: "Which command can help you find SUID binaries on a Linux system?",
        name: "q2",
        options: [
          "find / -perm -4000 -type f 2>/dev/null",
          "ls -la /root",
          "chmod +s /bin/bash",
          "ps aux",
        ],
      },
      {
        label: "What is the risk of a world-writable /etc/passwd file?",
        name: "q3",
        options: [
          "Any user can add or modify user accounts",
          "The system will not boot",
          "It allows remote code execution",
          "It disables password authentication",
        ],
      },
      {
        label: "Which tool is commonly used for automated Linux privilege escalation enumeration?",
        name: "q4",
        options: ["LinPEAS", "John the Ripper", "Burp Suite", "Metasploit"],
      },
    ],
  },
  {
    id: 2,
    title: "Module 2: Sudo and SUID Exploitation",
    summary:
      "Explore privilege escalation via misconfigured sudo and SUID binaries.",
    questions: [
      {
        label: "Which command lists a user's sudo privileges?",
        name: "q1",
        options: ["sudo -l", "sudo su", "whoami", "ls -l /etc/sudoers"],
      },
      {
        label: "What is a common risk of allowing 'sudo vi' without a password?",
        name: "q2",
        options: [
          "A user can spawn a root shell",
          "It disables sudo",
          "It deletes system files",
          "It changes the hostname",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Module 3: Kernel and Path Exploits",
    summary:
      "Learn about kernel exploits and PATH variable manipulation for privilege escalation.",
    questions: [
      {
        label: "What is the risk of an unpatched Linux kernel?",
        name: "q1",
        options: [
          "It may be vulnerable to local privilege escalation exploits",
          "It will run slower",
          "It cannot be updated",
          "It disables networking",
        ],
      },
      {
        label: "How can a writable PATH variable lead to privilege escalation?",
        name: "q2",
        options: [
          "A user can place malicious executables earlier in the PATH",
          "It allows remote access",
          "It disables sudo",
          "It changes the default shell",
        ],
      },
    ],
  },
];

const Lab7 = () => {
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
    const moduleQuestions = modules.find((m) => m.id === moduleId)?.questions || [];
    const submittedCount = Object.keys(submittedAnswers[moduleId] || {}).length;
    return moduleQuestions.length === submittedCount;
  };

  const allModulesCompleted = modules.every((module) => isModuleComplete(module.id));

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
  src="/assets/img/home-1/shop/Hard Level 1.png"
  alt="Hard Level 1"
  style={{
    width: 110,
    height: 110,
    marginRight: 32,
    borderRadius: 12,
    background: "#f03e2aff",
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
                  Linux Privilege Escalation Lab
                </h1>
                <p
                  style={{
                    fontSize: "1.15rem",
                    color: "#fff",
                    margin: 0,
                    textTransform: "none",
                  }}
                >
                  Master network scanning techniques and enumeration for real-world pentesting.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Accordion Section */}
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
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      textTransform: "none",
                    }}
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
                Well Done! You've completed the Linux Privilege Escalation Lab.
                <br />
                Ready to take the next step? Head to <b>Windows Privilege Escalation</b>.
              </div>
            )}
          </div>
        </section>
        {/* Lab Navigation Buttons */}
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
          <Link to="/labs/6" className="lab-nav-btn">
            &larr; Previous Lab
          </Link>
          <Link to="/labs/8" className="lab-nav-btn">
            Next Lab &rarr;
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default Lab7;
