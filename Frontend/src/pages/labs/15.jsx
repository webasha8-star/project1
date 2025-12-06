import React, { useState } from "react";
import "./LabOutline.css";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const modules = [
  {
    id: 1,
    title: "Module 1: Penetration Testing Methodology",
    summary:
      "Overview of the penetration testing process including information gathering, scanning, enumeration, exploitation, and post-exploitation.",
    questions: [
      {
        label: "What is the first phase of penetration testing?",
        name: "q1",
        options: [
          "Information Gathering",
          "Exploitation",
          "Post-Exploitation",
          "Reporting",
        ],
      },
      {
        label: "Which tool is commonly used for reconnaissance?",
        name: "q2",
        options: ["Nmap", "Metasploit", "John the Ripper", "Wireshark"],
      },
      {
        label: "What is the goal of enumeration?",
        name: "q3",
        options: [
          "Gather detailed information about hosts, users, and services",
          "Launch network attacks",
          "Install malware",
          "Clean logs",
        ],
      },
      {
        label: "Which protocol is often targeted during enumeration?",
        name: "q4",
        options: ["SMB", "HTTP", "FTP", "DNS"],
      },
    ],
  },
  {
    id: 2,
    title: "Module 2: Vulnerability Scanning and Analysis",
    summary:
      "Understanding tool usage and identifying vulnerabilities to prioritize for exploitation in OSCP-style labs.",
    questions: [
      {
        label: "Which tool is used to identify vulnerabilities in services?",
        name: "q1",
        options: ["Nessus", "Wireshark", "Tcpdump", "Netcat"],
      },
      {
        label: "What should you verify after finding potential vulnerabilities?",
        name: "q2",
        options: [
          "If the vulnerability is exploitable",
          "If the service is up to date",
          "If the server is patched",
          "If the server has firewall enabled",
        ],
      },
      {
        label: "Which technique helps to avoid detection during scanning?",
        name: "q3",
        options: [
          "Slow scanning and using proxies",
          "Flooding the target with requests",
          "Using default credentials",
          "Massive parallel scans",
        ],
      },
      {
        label: "What does CVE stand for?",
        name: "q4",
        options: [
          "Common Vulnerabilities and Exposures",
          "Centralized Vulnerability Engine",
          "Certified Vulnerability Expert",
          "Controlled Vulnerability Exploit",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Module 3: Exploitation Techniques",
    summary:
      "Hands-on exploitation techniques for gaining access to target machines in a simulated OSCP environment.",
    questions: [
      {
        label: "What is the purpose of a reverse shell?",
        name: "q1",
        options: [
          "To connect back from the target machine to the attacker",
          "To transfer files",
          "To scan ports",
          "To encrypt data",
        ],
      },
      {
        label: "Which tool is widely used for exploitation and payload delivery?",
        name: "q2",
        options: [
          "Metasploit Framework",
          "Nmap",
          "Wireshark",
          "John the Ripper",
        ],
      },
      {
        label: "What is privilege escalation?",
        name: "q3",
        options: [
          "Gaining higher privileges than initially allowed",
          "Crashing the system",
          "Installing malware",
          "Cleaning logs",
        ],
      },
      {
        label: "Which operating systems are most commonly targeted in OSCP?",
        name: "q4",
        options: ["Linux and Windows", "macOS only", "Android", "iOS"],
      },
    ],
  },
  {
    id: 4,
    title: "Module 4: Post-Exploitation and Maintaining Access",
    summary:
      "Techniques to maintain access, pivot within the network, and cover tracks during OSCP simulations.",
    questions: [
      {
        label: "What is a common method to maintain persistence on a compromised host?",
        name: "q1",
        options: [
          "Adding a new user with administrative privileges",
          "Uninstalling security patches",
          "Running a port scan",
          "Turning off the machine",
        ],
      },
      {
        label: "What is lateral movement?",
        name: "q2",
        options: [
          "Moving through the network from one compromised host to another",
          "Scanning the network",
          "Restarting network services",
          "Changing firewall rules",
        ],
      },
      {
        label: "Which tool assists with lateral movement in Windows environments?",
        name: "q3",
        options: [
          "PsExec",
          "Nmap",
          "Wireshark",
          "Tcpdump",
        ],
      },
      {
        label: "Why is log cleaning important in post-exploitation?",
        name: "q4",
        options: [
          "To hide traces of the attacker’s activity",
          "To recover deleted files",
          "To increase system stability",
          "To update software",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Module 5: Report Writing and Documentation",
    summary:
      "Best practices for documenting findings and writing professional penetration test reports in OSCP.",
    questions: [
      {
        label: "What should be included in a penetration testing report?",
        name: "q1",
        options: [
          "Vulnerabilities found, exploitation steps, impact analysis",
          "Personal opinions",
          "Only successful exploits",
          "Source codes",
        ],
      },
      {
        label: "Why is clear documentation important?",
        name: "q2",
        options: [
          "To enable clients to remediate issues effectively",
          "To reduce report length",
          "To confuse readers",
          "To hide sensitive information",
        ],
      },
      {
        label: "What format is commonly used for OSCP reports?",
        name: "q3",
        options: [
          "PDF",
          "JPEG",
          "TXT",
          "EXE",
        ],
      },
      {
        label: "Should steps to reproduce exploits be detailed?",
        name: "q4",
        options: [
          "Yes, for transparency and repeatability",
          "No, to keep it secret",
          "Only if requested",
          "Never",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Module 6: Time Management and Exam Strategy",
    summary:
      "Tips and strategies to manage time efficiently and maximize success during the OSCP 24-hour exam.",
    questions: [
      {
        label: "What is a good approach to start the OSCP exam?",
        name: "q1",
        options: [
          "Begin with quick wins to build confidence",
          "Start with the hardest machine",
          "Skip enumeration",
          "Only focus on Windows systems",
        ],
      },
      {
        label: "How should you handle difficult machines during the exam?",
        name: "q2",
        options: [
          "Move on and return later",
          "Spend all your time on it immediately",
          "Ignore documentation",
          "Restart the exam",
        ],
      },
      {
        label: "Why is note-taking important?",
        name: "q3",
        options: [
          "To keep track of findings and steps for report writing",
          "To waste exam time",
          "To share answers with others",
          "To distract the proctor",
        ],
      },
      {
        label: "What should be your priority during the exam?",
        name: "q4",
        options: [
          "Maximizing points through effective exploitation",
          "Exploring all machines randomly",
          "Only focusing on one exploit",
          "Ignoring time limits",
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
    if (!answer) {
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
        }}
      >
        <div className="container" style={{ margin: "0 auto", textAlign: "left" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <img
              src="/assets/img/home-1/shop/Extreme Level 3.png" alt=""
              style={{
                width: 110,
                height: 110,
                marginRight: 32,
                borderRadius: 12,
                background: "#FF6B00",
                padding: 8,
                objectFit: "contain",
              }}
            />
            <div>
              <h1 style={{ fontSize: "2.2rem", marginBottom: "8px", color: "#39FF14" , textTransform: "none"}}>
                OSCP 24hr Simulation
              </h1>
              <p style={{ fontSize: "1.15rem", color: "#fff", margin: 0 , textTransform: "none"}}>
                Experience a full-scale OSCP 24-hour simulation focusing on penetration testing methodology, exploitation, and exam strategy.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Accordion Section */}
      <section style={{ background: "#181c2a", minHeight: "60vh", padding: "32px 0" }}>
        <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {modules.map((module) => (
            <div
              key={module.id}
              style={{
                marginBottom: 18,
                borderRadius: 8,
                background: "#232d3f",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
                }}
              >
                <span style={{ color: "#39FF14", fontWeight: 700, marginRight: 12 , textTransform: "none"}}>
                  Module {module.id}
                </span>
                <span style={{ color: "#fff", fontWeight: 600 , textTransform: "none" }}>
                  {module.title.replace(/^Module \d+: /, "")}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    color: "#fff",
                    fontSize: 22,
                  }}
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
                  }}
                >
                  <div style={{ marginBottom: 8, color: "#bfc9da" }}>{module.summary}</div>
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
                          }}
                        >
                          <label
                            style={{
                              color: "#39FF14",
                              fontWeight: 600,
                              display: "block",
                              marginBottom: 6,
                              textTransform: "none"
                            }}
                          >
                            Question {idx + 1}. {q.label}
                          </label>
                          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                            {q.options ? (
                              <div style={{ flex: 1 }}>
                                {q.options.map((opt, i) => (
                                  <label
                                    key={i}
                                    style={{
                                      display: "block",
                                      marginBottom: 6,
                                      color: "#fff",
                                      fontWeight: 400,
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      name={`module${module.id}-${q.name}`}
                                      value={opt}
                                      checked={answers[module.id]?.[q.name] === opt}
                                      onChange={(e) => handleInputChange(module.id, q.name, opt)}
                                      disabled={submittedAnswers[module.id]?.[q.name]}
                                      style={{ marginRight: 8 }}
                                    />
                                    {opt}
                                  </label>
                                ))}
                              </div>
                            ) : (
                              <input
                                type="text"
                                value={answers[module.id]?.[q.name] || ""}
                                onChange={(e) => handleInputChange(module.id, q.name, e.target.value)}
                                style={{
                                  flex: 1,
                                  padding: "10px",
                                  borderRadius: 4,
                                  border: "1px solid #34495e",
                                  background: "#181c2a",
                                  color: "#fff",
                                  textTransform: "none"
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
                                textTransform: "none"
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
                            textTransform: "none"
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
                textTransform: "none"
              }}
            >
              <span role="img" aria-label="trophy">
                🏆
              </span>{" "}
              Well Done! You've completed the OSCP 24hr Simulation Lab.<br />
              Ready to take the next step? Head to <b>Advanced Penetration Techniques</b>.
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
          textTransform: "none"
        }}
      >
        <Link
          to="/labs/14" className="lab-nav-btn">
          &larr; Previous Lab
        </Link>
      </div>
      </Layout>
    </>
  );
};

export default LabsOutlinePage;
