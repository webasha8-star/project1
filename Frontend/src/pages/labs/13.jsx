import React, { useState } from "react";
import "./LabOutline.css";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const modules = [
  {
    id: 1,
    title: "Module 1: System Enumeration and Access",
    summary:
      "Perform extensive system enumeration and verify access permissions to prepare for the Linux exam simulation.",
    questions: [
      {
        label: "Which command lists all currently logged in users?",
        name: "q1",
        options: ["who", "ps", "top", "ifconfig"],
      },
      {
        label: "How can you check current user privileges?",
        name: "q2",
        options: [
          "Using the 'id' command.",
          "Viewing /etc/passwd file only.",
          "Using 'ls -l' on /root.",
          "Checking /var/log/auth.log.",
        ],
      },
      {
        label: "Which directory contains user home folders?",
        name: "q3",
        options: ["/home", "/root", "/etc", "/var"],
      },
      {
        label: "What file contains user account information?",
        name: "q4",
        options: ["/etc/passwd", "/etc/shadow", "/var/log/syslog", "/etc/group"],
      },
    ],
  },
  {
    id: 2,
    title: "Module 2: Service Enumeration and Vulnerabilities",
    summary:
      "Identify running services and analyze potential vulnerabilities related to them in the simulated environment.",
    questions: [
      {
        label: "Which command shows listening network services?",
        name: "q1",
        options: ["netstat -tuln", "ps aux", "top", "df -h"],
      },
      {
        label: "What is a common port for SSH service?",
        name: "q2",
        options: ["22", "80", "443", "3306"],
      },
      {
        label: "Which file lists service-to-port mappings?",
        name: "q3",
        options: ["/etc/services", "/etc/hosts", "/etc/passwd", "/var/log/syslog"],
      },
      {
        label: "How do you check system services status on a system using systemd?",
        name: "q4",
        options: ["systemctl status", "service --status-all", "chkconfig", "initctl"],
      },
    ],
  },
  {
    id: 3,
    title: "Module 3: File Permissions and Ownership",
    summary:
      "Understand file permission models and identify misconfigurations to exploit during the exam simulation.",
    questions: [
      {
        label: "What does the permission 'rwxr-xr--' imply for a file owner?",
        name: "q1",
        options: [
          "Owner has read, write, execute; group has read, execute; others have read only.",
          "Owner has read-only access; group and others have none.",
          "Everyone has full access.",
          "File is hidden.",
        ],
      },
      {
        label: "Which command changes file ownership?",
        name: "q2",
        options: ["chown", "chmod", "chgrp", "ls"],
      },
      {
        label: "How to set the sticky bit on a directory?",
        name: "q3",
        options: ["chmod +t <directory>", "chmod +x <directory>", "chmod 777 <directory>", "chown +t <directory>"],
      },
      {
        label: "Which symbolic permission changes add execute permission for the group?",
        name: "q4",
        options: ["chmod g+x <file>", "chmod o+x <file>", "chmod u+x <file>", "chmod a+x <file>"],
      },
    ],
  },
  {
    id: 4,
    title: "Module 4: Process Monitoring and Job Scheduling",
    summary:
      "Learn to monitor processes, identify suspicious activity, and understand cron job configurations in the simulated scenario.",
    questions: [
      {
        label: "What is the command to view running processes in a tree format?",
        name: "q1",
        options: ["pstree", "ps aux", "top", "htop"],
      },
      {
        label: "Where are system-wide cron jobs stored?",
        name: "q2",
        options: ["/etc/crontab", "/var/spool/cron", "/etc/cron.d", "/tmp"],
      },
      {
        label: "How can you list your user cron jobs?",
        name: "q3",
        options: ["crontab -l", "ls /etc/cron*", "ps -ef", "systemctl list-timers"],
      },
      {
        label: "Which signal stops a process temporarily?",
        name: "q4",
        options: ["SIGSTOP", "SIGKILL", "SIGTERM", "SIGCONT"],
      },
    ],
  },
  {
    id: 5,
    title: "Module 5: Network Configuration and Traffic Analysis",
    summary:
      "Analyze network settings and capture network traffic to find clues and information critical for the Linux exam simulation.",
    questions: [
      {
        label: "Which tool captures network packets?",
        name: "q1",
        options: ["tcpdump", "nmap", "netstat", "ping"],
      },
      {
        label: "What command shows the IP address configuration?",
        name: "q2",
        options: ["ip addr show", "ip link set", "ifconfig down", "route add"],
      },
      {
        label: "How can you display current active TCP connections?",
        name: "q3",
        options: ["ss -t", "ss -u", "netstat -nr", "ip route"],
      },
      {
        label: "What is the default file for hostname configuration in many Linux distributions?",
        name: "q4",
        options: ["/etc/hostname", "/etc/hosts", "/etc/network/interfaces", "/var/log/syslog"],
      },
    ],
  },
  {
    id: 6,
    title: "Module 6: Exploitation Techniques and Post-Exploitation",
    summary:
      "Understand common Linux exploitation strategies and how to apply post-exploitation techniques effectively during the simulation.",
    questions: [
      {
        label: "What is a setuid binary?",
        name: "q1",
        options: [
          "A binary that runs with the privileges of the file owner.",
          "A file with extended attributes.",
          "A hidden system file.",
          "An encrypted executable.",
        ],
      },
      {
        label: "How to find setuid binaries?",
        name: "q2",
        options: [
          "find / -perm -4000 -type f 2>/dev/null",
          "ls -l /bin",
          "locate suid",
          "cat /etc/passwd",
        ],
      },
      {
        label: "What is privilege escalation?",
        name: "q3",
        options: [
          "Obtaining higher privileges than initially granted.",
          "Downloading files from the internet.",
          "Starting a remote shell.",
          "Encrypting sensitive files.",
        ],
      },
      {
        label: "What tool helps in gathering system exploit info?",
        name: "q4",
        options: ["LinEnum", "Nessus", "Metasploit", "Wireshark"],
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
    // For multi-select answers, value can be array or single string
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
    alert(`Submitted answer for Module ${moduleId}, Question ${questionName}: ${Array.isArray(answer) ? answer.join(", ") : answer}`);
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
            <img
              src="/assets/img/home-1/shop/Extreme Level 1.png" alt=""
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
              <h1 style={{ fontSize: "2.2rem", marginBottom: "8px", color: "#39FF14" ,textTransform: "none" }}>BlackBox 1 – Linux Exam Sim</h1>
              <p style={{ fontSize: "1.15rem", color: "#fff", margin: 0 , textTransform: "none"}}>
                A comprehensive Linux exam simulation focusing on system enumeration, vulnerability discovery, exploitation, and post-exploitation techniques.
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
                  textTransform: "none"
                }}
              >
                <span style={{ color: "#39FF14", fontWeight: 700, marginRight: 12 , textTransform: "none"}}>Module {module.id}</span>
                <span style={{ color: "#fff", fontWeight: 600 , textTransform: "none"}}>{module.title.replace(/^Module \d+: /, "")}</span>
                <span style={{ marginLeft: "auto", color: "#fff", fontSize: 22 }}>
                  {openModule === module.id ? "\u25B2" : "\u25B6"}
                </span>
              </div>
              {openModule === module.id && (
                <div style={{ padding: "24px 32px", color: "#fff", fontSize: "1.08rem", background: "#232d3f" , textTransform: "none"}}>
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
                              // If multi-select flag true, render checkboxes, else radio buttons
                              q.multi ? (
                                <div style={{ flex: 1 }}>
                                  {q.options.map((opt, i) => (
                                    <label key={i} style={{ display: "block", marginBottom: 6, color: "#fff", fontWeight: 400 }}>
                                      <input
                                        type="checkbox"
                                        name={`module${module.id}-${q.name}`}
                                        value={opt}
                                        checked={Array.isArray(answers[module.id]?.[q.name]) && answers[module.id][q.name].includes(opt)}
                                        onChange={(e) => {
                                          const prev = Array.isArray(answers[module.id]?.[q.name]) ? answers[module.id][q.name] : [];
                                          if (e.target.checked) {
                                            handleInputChange(module.id, q.name, [...prev, opt]);
                                          } else {
                                            handleInputChange(module.id, q.name, prev.filter((v) => v !== opt));
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
                                <div style={{ flex: 1 }}>
                                  {q.options.map((opt, i) => (
                                    <label key={i} style={{ display: "block", marginBottom: 6, color: "#fff", fontWeight: 400 }}>
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
                              )
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
                        <div style={{ marginTop: 16, padding: 12, background: "#2ecc71", color: "#fff", borderRadius: 4, textAlign: "center" , textTransform: "none"}}>
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
              Well Done! You've completed the BlackBox 1 – Linux Exam Sim.<br />
              Ready to take the next step? Head to <b>Linux Post-Exploitation</b>.
            </div>
          )}
        </div>
      </section>
      {/* Lab Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 1200, margin: "24px auto 0", padding: "0 24px" , textTransform : "none" }}>
        <Link
          to="/labs/12" className="lab-nav-btn">
          &larr; Previous Lab
        </Link>
        <Link
          to="/labs/14" className="lab-nav-btn">
          Next Lab &rarr;
        </Link>
      </div>
      </Layout>
    </>
  );
};

export default LabsOutlinePage;
