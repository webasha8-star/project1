import React, { useState } from "react";
import "./LabOutline.css";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const modules = [
  {
    id: 1,
    title: "Module 1: Introduction to Network Pivoting",
    summary:
      "Understand the concept of network pivoting and how attackers leverage compromised machines to access internal networks.",
    questions: [
      {
        label: "What is network pivoting?",
        name: "q1",
        options: [
          "Using a compromised host to access other systems.",
          "Disconnecting from a VPN.",
          "Scanning the internet for vulnerabilities.",
          "Setting up firewall rules."
        ],
      },
      {
        label: "Which tool is commonly used for network pivoting?",
        name: "q2",
        options: ["Proxychains", "Wireshark", "Nmap", "Metasploit"],
      },
    ],
  },
  {
    id: 2,
    title: "Module 2: Port Forwarding Techniques",
    summary:
      "Learn different port forwarding methods to route traffic through compromised hosts to the target network.",
    questions: [
      {
        label: "What is local port forwarding?",
        name: "q1",
        options: [
          "Forwarding traffic from a local port to a remote service.",
          "Forwarding traffic from remote to local port.",
          "Creating VPN tunnels.",
          "Blocking ports on firewall.",
        ],
      },
      {
        label: "Which command sets up SSH local port forwarding?",
        name: "q2",
        options: [
          "ssh -L",
          "ssh -R",
          "scp -P",
          "netstat -l",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Module 3: Tunneling and Relaying",
    summary:
      "Explore methods like SOCKS proxies, SSH tunnels, and relay attacks used in pivoting within internal networks.",
    questions: [
      {
        label: "What does a SOCKS proxy do in pivoting?",
        name: "q1",
        options: [
          "Relays network traffic through the compromised host.",
          "Filters packets at firewall.",
          "Encrypts data at rest.",
          "Scans open ports remotely.",
        ],
      },
      {
        label: "Which tool can create dynamic SOCKS proxy tunnels?",
        name: "q2",
        options: [
          "ssh -D",
          "ping",
          "tcpdump",
          "ftp",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Module 4: Practical Network Pivoting",
    summary:
      "Hands-on with setting up pivots and tunneling for accessing isolated segments in the internal network.",
    questions: [
      {
        label: "What is a key challenge when pivoting inside segmented networks?",
        name: "q1",
        options: [
          "Firewall and ACL restrictions.",
          "Internet bandwidth.",
          "FTP misconfigurations.",
          "DNS cache poisoning.",
        ],
      },
      {
        label: "Which technique bypasses firewall restrictions in pivoting?",
        name: "q2",
        options: [
          "Using reverse SSH tunnels.",
          "Using FTP.",
          "Running port scans.",
          "Enabling HTTP proxies.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Module 5: Defensive Measures & Detection",
    summary:
      "Understanding how defense teams detect and prevent network pivoting attacks inside infrastructures.",
    questions: [
      {
        label: "Which monitoring technique helps spot pivoting activity?",
        name: "q1",
        options: [
          "Network traffic analysis.",
          "File permission audits.",
          "Patch management.",
          "Regular backups.",
        ],
      },
      {
        label: "What firewall feature is effective against unauthorized pivoting?",
        name: "q2",
        options: [
          "Segmentation and strict ACLs.",
          "Open ports.",
          "Default routes.",
          "All inbound traffic allowed.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Module 6: Tools for Network Pivoting",
    summary:
      "Overview of tools commonly used in penetration testing for network pivoting scenarios.",
    questions: [
      {
        label: "Which tool can be used as a proxy server for pivoting?",
        name: "q1",
        options: [
          "Proxychains",
          "Msfvenom",
          "Nikto",
          "John the Ripper",
        ],
      },
      {
        label: "What tool can be used to create reverse tunnels?",
        name: "q2",
        options: [
          "Ngrok",
          "Aircrack-ng",
          "Hashcat",
          "Burp Suite",
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
        }}
      >
        <div
          className="container"
          style={{ margin: "0 auto", textAlign: "left" }}
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
              src="/assets/img/home-1/shop/Hard Level 5.png" alt=""
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
            <div>
              <h1
                style={{
                  fontSize: "2.2rem",
                  marginBottom: "8px",
                  color: "#39FF14",
                  textTransform: "none"
                }}
              >
                Internal Network Pivoting
              </h1>
              <p style={{ fontSize: "1.15rem", color: "#fff", margin: 0 , textTransform: "none" }}>
                Learn methods and tools to pivot within internal networks during penetration testing scenarios,
                including tunneling, port forwarding, and defensive measures.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{ background: "#181c2a", minHeight: "60vh", padding: "32px 0" }}
      >
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
                }}
              >
                <span
                  style={{ color: "#39FF14", fontWeight: 700, marginRight: 12 ,  textTransform: "none"}}
                >
                  Module {module.id}
                </span>
                <span style={{ color: "#fff", fontWeight: 600 ,  textTransform: "none"}}>
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
                  <div style={{ marginBottom: 8, color: "#bfc9da" }}>
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
                            textTransform: "none"
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
                          <div
                            style={{
                              display: "flex",
                              gap: 12,
                              alignItems: "flex-start",
                            }}
                          >
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
                                      checked={
                                        answers[module.id]?.[q.name] === opt
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          module.id,
                                          q.name,
                                          opt
                                        )
                                      }
                                      disabled={
                                        submittedAnswers[module.id]?.[q.name]
                                      }
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
                                onChange={(e) =>
                                  handleInputChange(module.id, q.name, e.target.value)
                                }
                                style={{
                                  flex: 1,
                                  padding: "10px",
                                  borderRadius: 4,
                                  border: "1px solid #34495e",
                                  background: "#181c2a",
                                  color: "#fff",
                                }}
                                placeholder="Answer Here"
                                disabled={
                                  submittedAnswers[module.id]?.[q.name]
                                }
                              />
                            )}
                            <button
                              onClick={() =>
                                handleSubmitQuestion(module.id, q.name)
                              }
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
                        textTransform: "none"
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
              Well Done! You've completed the Internal Network Pivoting Lab.
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
          textTransform: "none"
        }}
      >
        <Link to="/labs/10" className="lab-nav-btn">
          ← Previous Lab
        </Link>
        <Link to="/labs/12" className="lab-nav-btn">
          Next Lab →
        </Link>
      </div>
      </Layout>
    </>
  );
};

export default LabsOutlinePage;
