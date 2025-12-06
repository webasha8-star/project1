import React, { useState } from "react";
import "./LabOutline.css";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const modules = [
  {
    id: 1,
    title: "Module 1: Introduction to Exploit Development",
    summary:
      "Learn the fundamentals of writing custom exploits, focusing on memory corruption and basic shellcode techniques.",
    questions: [
      {
        label: "What is the primary goal of exploit development?",
        name: "q1",
        options: [
          "To gain unauthorized control of a system.",
          "To patch security vulnerabilities.",
          "To monitor network traffic.",
          "To improve software performance."
        ],
      },
      {
        label: "Which programming language is commonly used for writing exploits?",
        name: "q2",
        options: ["C", "Python", "Java", "HTML"],
      },
      {
        label: "What is shellcode?",
        name: "q3",
        options: [
          "Small piece of code used as payload in exploits.",
          "A secure code review process.",
          "A debugging tool.",
          "An antivirus signature."
        ],
      },
      {
        label: "Which vulnerability type involves overwriting memory buffers?",
        name: "q4",
        options: [
          "Buffer overflow",
          "SQL Injection",
          "Cross-site scripting",
          "Race condition"
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Module 2: Memory Corruption Basics",
    summary:
      "Explore heap and stack overflows, and how memory corruption enables arbitrary code execution.",
    questions: [
      {
        label: "Which segment of memory is typically targeted in buffer overflow exploits?",
        name: "q1",
        options: [
          "Stack",
          "Heap",
          "Data segment",
          "Code segment"
        ],
      },
      {
        label: "What is the purpose of a NOP sled in shellcode?",
        name: "q2",
        options: [
          "To increase the chance of hitting shellcode in memory.",
          "To encrypt the payload.",
          "To clean registers.",
          "To crash the program."
        ],
      },
      {
        label: "What tool is commonly used to inspect process memory during exploit development?",
        name: "q3",
        options: ["gdb", "tcpdump", "Wireshark", "strace"],
      },
      {
        label: "What is ASLR?",
        name: "q4",
        options: [
          "Address Space Layout Randomization.",
          "Automatic System Level Restart.",
          "Application Secure Login Role.",
          "Advanced Secure Load Routine."
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Module 3: Writing Shellcode",
    summary:
      "Learn to write and test shellcode, including common payloads and techniques to bypass protections.",
    questions: [
      {
        label: "Which tool can generate shellcode payloads?",
        name: "q1",
        options: ["msfvenom", "nmap", "curl", "sqlmap"],
      },
      {
        label: "What is a common payload used in exploits?",
        name: "q2",
        options: [
          "Reverse shell",
          "Denial of service",
          "File transfer",
          "Packet sniffer"
        ],
      },
      {
        label: "Why is it important to avoid null bytes in shellcode?",
        name: "q3",
        options: [
          "To prevent premature string termination.",
          "To speed up execution.",
          "To improve readability.",
          "To reduce file size."
        ],
      },
      {
        label: "What is the purpose of ‘NOP’ instructions in shellcode?",
        name: "q4",
        options: [
          "Padding to align instructions and increase exploit reliability.",
          "Encrypting payload.",
          "Generating exceptions.",
          "Clearing CPU cache."
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Module 4: Exploit Mitigations",
    summary:
      "Understand common exploit mitigations including DEP, ASLR, and stack canaries and how to bypass them.",
    questions: [
      {
        label: "What does DEP (Data Execution Prevention) do?",
        name: "q1",
        options: [
          "Prevents execution of code in data regions.",
          "Encrypts data in memory.",
          "Prevents network attacks.",
          "Scans executable files."
        ],
      },
      {
        label: "How does ASLR protect against exploits?",
        name: "q2",
        options: [
          "Randomizes memory addresses.",
          "Encrypts shellcode.",
          "Disables executable stacks.",
          "Blocks network traffic."
        ],
      },
      {
        label: "What is a stack canary?",
        name: "q3",
        options: [
          "A known value placed before the return address to detect overwrites.",
          "An antivirus process.",
          "An encrypted shellcode form.",
          "A buffer for file input."
        ],
      },
      {
        label: "Which technique can bypass DEP?",
        name: "q4",
        options: [
          "Return Oriented Programming (ROP).",
          "SQL Injection.",
          "Cross-site scripting.",
          "Data encryption."
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Module 5: Advanced Exploit Techniques",
    summary:
      "Explore advanced techniques such as ROP chains, heap exploitation, and format string vulnerabilities.",
    questions: [
      {
        label: "What is ROP (Return Oriented Programming)?",
        name: "q1",
        options: [
          "Using existing code snippets to perform arbitrary operations.",
          "A new programming language.",
          "A debugging technique.",
          "A type of malware."
        ],
      },
      {
        label: "What vulnerability can be exploited using format string attacks?",
        name: "q2",
        options: [
          "Improperly sanitized user input.",
          "SQL Injection.",
          "Buffer overflow.",
          "Race condition."
        ],
      },
      {
        label: "What is heap spraying?",
        name: "q3",
        options: [
          "Filling heap memory with attacker-controlled data to facilitate exploitation.",
          "A memory cleaning technique.",
          "An antivirus method.",
          "A network scanning technique."
        ],
      },
      {
        label: "Which tool helps analyze binary programs for exploitation?",
        name: "q4",
        options: ["radare2", "curl", "Wireshark", "gcc"],
      },
    ],
  },
  {
    id: 6,
    title: "Module 6: Exploit Development Workflow",
    summary:
      "Overview of the practical steps involved in developing, testing, and deploying custom exploits.",
    questions: [
      {
        label: "What is the first step in exploit development?",
        name: "q1",
        options: ["Vulnerability analysis", "Writing shellcode", "Network scanning", "System backup"],
      },
      {
        label: "Which tool is commonly used for debugging during exploit development?",
        name: "q2",
        options: ["gdb", "vim", "Postman", "Metasploit"],
      },
      {
        label: "Why is testing important in exploit development?",
        name: "q3",
        options: [
          "To ensure reliability and avoid crashes.",
          "Only for legal reasons.",
          "To create antivirus signatures.",
          "To encrypt payloads.",
        ],
      },
      {
        label: "What should you consider when deploying exploits?",
        name: "q4",
        options: [
          "Target environment and mitigations.",
          "Branding and logos.",
          "User interface design.",
          "File sizes only.",
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
      {/* Module Header */}
      <section
        className="lab-info-section"
        style={{ background: "#232d3f", color: "#fff", padding: "32px 0", textAlign: "center", paddingTop: "150px" , textTransform: "none"}}
      >
        <div className="container" style={{ margin: "0 auto", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 ,textTransform: "none" }}>
            <img
              src="/assets/img/home-1/shop/Hard Level 6.png" alt=""
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
              <h1 style={{ fontSize: "2.2rem", marginBottom: "8px", color: "#39FF14" , textTransform: "none"}}>Custom Exploit Development</h1>
              <p style={{ fontSize: "1.15rem", color: "#fff", margin: 0 , textTransform: "none"}}>
                Learn how to develop, test, and deploy custom exploits. Topics include memory corruption, shellcode writing, bypassing mitigations, and advanced exploitation techniques.
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
                <span style={{ color: "#39FF14", fontWeight: 700, marginRight: 12 , textTransform: "none"}}>Module {module.id}</span>
                <span style={{ color: "#fff", fontWeight: 600 , textTransform: "none"}}>{module.title.replace(/^Module \d+: /, "")}</span>
                <span style={{ marginLeft: "auto", color: "#fff", fontSize: 22 }}>
                  {openModule === module.id ? "\u25B2" : "\u25B6"}
                </span>
              </div>
              {openModule === module.id && (
                <div style={{ padding: "24px 32px", color: "#fff", fontSize: "1.08rem", background: "#232d3f" }}>
                  <div style={{ marginBottom: 8, color: "#bfc9da" }}>{module.summary}</div>
                  {isLoggedIn ? (
                    <div>
                      {module.questions.map((q, idx) => (
                        <div key={q.name} style={{ marginBottom: 24, background: "#1a1f2e", padding: 16, borderRadius: 8 }}>
                          <label style={{ color: "#39FF14", fontWeight: 600, display: "block", marginBottom: 6 }}>
                            Question {idx + 1}. {q.label}
                          </label>
                          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                            {q.options ? (
                              <div style={{ flex: 1 }}>
                                {q.options.map((opt, i) => (
                                  <label key={i} style={{ display: "block", marginBottom: 6, color: "#fff", fontWeight: 400 }}>
                                    <input
                                      type="radio"
                                      name={`module${module.id}-${q.name}`}
                                      value={opt}
                                      checked={answers[module.id]?.[q.name] === opt}
                                      onChange={e => handleInputChange(module.id, q.name, opt)}
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
                                onChange={e => handleInputChange(module.id, q.name, e.target.value)}
                                style={{
                                  flex: 1,
                                  padding: "10px",
                                  borderRadius: 4,
                                  border: "1px solid #34495e",
                                  background: "#181c2a",
                                  color: "#fff",
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
                              }}
                              disabled={submittedAnswers[module.id]?.[q.name]}
                            >
                              {submittedAnswers[module.id]?.[q.name] ? "Submitted" : "Submit"}
                            </button>
                          </div>
                        </div>
                      ))}
                      {isModuleComplete(module.id) && (
                        <div style={{ marginTop: 16, padding: 12, background: "#2ecc71", color: "#fff", borderRadius: 4, textAlign: "center" }}>
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
          {/* Completion Message */}
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
              Well Done! You've completed the Custom Exploit Development Lab.<br />
              Ready to take the next step? Head to <b>Advanced Post Exploitation</b>.
            </div>
          )}
        </div>
      </section>
      {/* Lab Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 1200, margin: "24px auto 0", padding: "0 24px" , textTransform: "none" }}>
        <Link
          to="/labs/11" className="lab-nav-btn">
          &larr; Previous Lab
        </Link>
        <Link
          to="/labs/13" className="lab-nav-btn">Next Lab &rarr;
        </Link>
      </div>
      </Layout>
    </>
  );
};

export default LabsOutlinePage;
