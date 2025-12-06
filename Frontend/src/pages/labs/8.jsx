import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

// Define your modules/questions for Lab 8 here
const modules = [
  {
    id: 1,
    title: "Module 1: Windows Enumeration Fundamentals",
    summary:
      "Learn the basics of enumerating Windows systems for exploitation.",
    questions: [
      {
        label: "Which command lists all user accounts on a Windows machine?",
        name: "q1",
        options: ["net user", "whoami", "ipconfig", "dir"],
      },
      {
        label: "What tool is commonly used for Windows SMB enumeration?",
        name: "q2",
        options: ["enum4windows", "nmap", "hydra", "wireshark"],
      },
      {
        label: "What is the risk of an unpatched Windows service?",
        name: "q3",
        options: [
          "It may be vulnerable to privilege escalation or remote code execution",
          "It will run faster",
          "It disables the firewall",
          "It changes the hostname",
        ],
      },
      {
        label:
          "Which tool can automate local privilege escalation checks on Windows?",
        name: "q4",
        options: ["WinPEAS", "Metasploit", "Burp Suite", "John the Ripper"],
      },
    ],
  },
  {
    id: 2,
    title: "Module 2: Service Exploitation and Persistence",
    summary:
      "Explore exploiting vulnerable services and establishing persistence on Windows.",
    questions: [
      {
        label: "Which command can be used to create a new Windows service?",
        name: "q1",
        options: ["sc create", "netstat -an", "tasklist", "regedit"],
      },
      {
        label: "What is a common method for persistence on Windows?",
        name: "q2",
        options: [
          "Adding a malicious entry to the Run registry key",
          "Deleting system32",
          "Changing the desktop wallpaper",
          "Running disk cleanup",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Module 3: Token Impersonation and Credential Dumping",
    summary:
      "Understand token impersonation and credential dumping techniques.",
    questions: [
      {
        label: "Which tool is commonly used for dumping Windows credentials?",
        name: "q1",
        options: ["Mimikatz", "Nessus", "Wireshark", "Putty"],
      },
      {
        label: "What is token impersonation in Windows exploitation?",
        name: "q2",
        options: [
          "Using another user's security token to gain their privileges",
          "Changing file permissions",
          "Escaping a virtual machine",
          "Installing updates",
        ],
      },
    ],
  },
];

const Lab8 = () => {
  const [openModule, setOpenModule] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  // Simulating not logged in; set to true if you want logged-in behavior
  const [isLoggedIn] = useState(false);

  const handleInputChange = (moduleId, qName, value) => {
    setAnswers((prev) => ({
      ...prev,
      [moduleId]: { ...prev[moduleId], [qName]: value },
    }));
  };

  const handleSubmitQuestion = (moduleId, qName) => {
    setSubmittedAnswers((prev) => ({
      ...prev,
      [moduleId]: { ...prev[moduleId], [qName]: true },
    }));
  };

  const isModuleComplete = (moduleId) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return false;
    return module.questions.every((q) => submittedAnswers[moduleId]?.[q.name]);
  };

  const allModulesCompleted = modules.every((m) => isModuleComplete(m.id));

  return (
    <>
      <Layout>
        <section
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
                textTransform: "none",
              }}
            >
              <img
  src="/assets/img/home-1/shop/Hard Level 2.png"
  alt="Hard Level 2"
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
                  Windows Exploitation Chain
                </h1>
                <p
                  style={{
                    fontSize: "1.15rem",
                    color: "#fff",
                    margin: 0,
                    textTransform: "none",
                  }}
                >
                  Master the art of Windows enumeration, exploitation, and
                  persistence.
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
                    <div
                      style={{ marginBottom: 8, color: "#bfc9da", textTransform: "none" }}
                    >
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
                              {q.options ? (
                                q.multi ? (
                                  // Multi-select checkboxes
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
                                  // Single select radio
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
                                          onChange={() =>
                                            handleInputChange(module.id, q.name, opt)
                                          }
                                          disabled={submittedAnswers[module.id]?.[q.name]}
                                          style={{ marginRight: 8 }}
                                        />
                                        {opt}
                                      </label>
                                    ))}
                                  </div>
                                )
                              ) : (
                                // Textarea for open-ended question
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
                Well Done! You've completed the Windows Exploitation Chain Lab.
                <br />
                Ready to take the next step? Head to the next module.
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
          <Link to="/labs/7" className="lab-nav-btn">
            &larr; Previous Lab
          </Link>
          <Link to="/labs/9" className="lab-nav-btn">
            Next Lab &rarr;
          </Link>
        </div>
        </Layout>
      </>
      );
};

      export default Lab8;
