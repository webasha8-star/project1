import React, { useState } from "react";
import "./LabOutline.css";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const modules = [
  {
    id: 1,
    title: "Module 1: Introduction to Windows AD Environment",
    summary:
      "Understand the basics of Windows Active Directory and its core components in a simulated lab environment.",
    questions: [
      {
        label: "What is Active Directory primarily used for?",
        name: "q1",
        options: [
          "Centralized domain management and authentication.",
          "Managing Linux users.",
          "Hosting websites.",
          "Database management.",
        ],
      },
      {
        label: "What is the role of a Domain Controller?",
        name: "q2",
        options: [
          "It authenticates users and enforces policies.",
          "It stores backup files.",
          "It monitors network traffic.",
          "It controls firewall settings.",
        ],
      },
      {
        label: "Which protocol is used by AD for directory services?",
        name: "q3",
        options: ["LDAP", "HTTP", "FTP", "SMTP"],
      },
      {
        label: "What does Kerberos provide in AD?",
        name: "q4",
        options: [
          "Network authentication and ticketing.",
          "File sharing.",
          "Email delivery.",
          "Database replication.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Module 2: AD Enumeration and User/Group Info",
    summary:
      "Learn techniques for enumerating users, groups, and permissions within a Windows Active Directory.",
    questions: [
      {
        label: "Which tool can enumerate AD users via command-line?",
        name: "q1",
        options: ["powershell", "net user", "ipconfig", "nslookup"],
      },
      {
        label: "How can you find members of the Domain Admins group?",
        name: "q2",
        options: [
          "Using 'Get-ADGroupMember -Identity Domain Admins' in PowerShell.",
          "Running 'ping DomainAdmins'.",
          "Checking the hosts file.",
          "Using 'netstat'.",
        ],
      },
      {
        label: "What is an SPN in AD?",
        name: "q3",
        options: [
          "Service Principal Name associated with service accounts.",
          "Security Policy Node.",
          "Subnet Protocol Number.",
          "System Print Name.",
        ],
      },
      {
        label: "Why is enumerating Group Policy Preferences useful?",
        name: "q4",
        options: [
          "They may contain stored passwords.",
          "They provide system logs.",
          "They list installed software.",
          "They control firewall rules.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Module 3: Kerberoasting and SPN Abuse",
    summary:
      "Understand how SPNs are abused for Kerberoasting attacks and how to detect them during the lab simulation.",
    questions: [
      {
        label: "What is the goal of Kerberoasting?",
        name: "q1",
        options: [
          "Extract service account hashes for offline cracking.",
          "Modify GPO settings.",
          "Change user passwords.",
          "Delete Active Directory objects.",
        ],
      },
      {
        label: "Which command can list SPNs in AD?",
        name: "q2",
        options: [
          "setspn -T domain -Q */*",
          "net user /domain",
          "ldapsearch -x",
          "ipconfig /all",
        ],
      },
      {
        label: "What type of accounts are typically targeted in Kerberoasting?",
        name: "q3",
        options: [
          "Service accounts with SPNs.",
          "Guest accounts.",
          "Standard user accounts.",
          "Administrator accounts without SPNs.",
        ],
      },
      {
        label: "Which tool is commonly used to perform Kerberoasting?",
        name: "q4",
        options: [
          "Impacket’s GetUserSPNs.py",
          "nmap",
          "Wireshark",
          "Metasploit",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Module 4: Credential Hunting and GPP",
    summary:
      "Explore methods to find stored credentials via Group Policy Preferences and SYSVOL shares.",
    questions: [
      {
        label: "Where are Group Policy Preference password XML files stored?",
        name: "q1",
        options: [
          "In the SYSVOL share on Domain Controllers.",
          "In the user’s profile directory.",
          "In the Program Files folder.",
          "On local workstations only.",
        ],
      },
      {
        label: "Which tool helps extract credentials from GPP XML files?",
        name: "q2",
        options: ["Get-GPPPassword", "lsass.exe", "netsh", "nmap"],
      },
      {
        label: "Why are GPP stored passwords considered a security risk?",
        name: "q3",
        options: [
          "They are stored with reversible encryption or cleartext.",
          "They expire quickly.",
          "They require multi-factor authentication.",
          "They are not accessible remotely.",
        ],
      },
      {
        label: "How can attackers access SYSVOL share?",
        name: "q4",
        options: [
          "Via SMB protocol on Domain Controllers.",
          "Through VPN only.",
          "Using RDP sessions.",
          "By privilege escalation on workstations.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Module 5: Lateral Movement Techniques",
    summary:
      "Identify common lateral movement methods like Pass-the-Hash and SMB relay utilized in Windows AD environments.",
    questions: [
      {
        label: "What is Pass-the-Hash?",
        name: "q1",
        options: [
          "Using hashed credentials to authenticate without cracking passwords.",
          "Intercepting clear text passwords.",
          "Resetting user passwords.",
          "Bypassing firewall rules.",
        ],
      },
      {
        label: "Which ports are commonly used for SMB communication?",
        name: "q2",
        options: ["445", "80", "22", "3389"],
      },
      {
        label: "Which tool can be used to perform SMB relay attacks?",
        name: "q3",
        options: ["Responder", "Nmap", "Wireshark", "Metasploit"],
      },
      {
        label: "What PowerShell cmdlet is used to invoke lateral movement?",
        name: "q4",
        options: [
          "Invoke-Command",
          "Get-Process",
          "Set-ExecutionPolicy",
          "New-Item",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Module 6: Post-Exploitation in Windows AD",
    summary:
      "Learn post-exploitation techniques specific to Windows AD for maintaining access and escalating privileges.",
    questions: [
      {
        label: "What does the 'Golden Ticket' attack enable?",
        name: "q1",
        options: [
          "Forging Kerberos tickets for persistent domain access.",
          "Dumping SAM hashes.",
          "Changing domain group memberships.",
          "Disabling antivirus software.",
        ],
      },
      {
        label: "Which tool can generate Golden Tickets?",
        name: "q2",
        options: ["Mimikatz", "Metasploit", "Nmap", "Wireshark"],
      },
      {
        label: "What is DCSync in AD post-exploitation?",
        name: "q3",
        options: [
          "Simulating Domain Controller replication to steal credentials.",
          "Changing user passwords.",
          "Creating new user accounts.",
          "Manipulating Group Policies.",
        ],
      },
      {
        label: "How can persistence be achieved in Windows AD environments?",
        name: "q4",
        options: [
          "Creating new service accounts or scheduled tasks.",
          "Patching the Windows OS.",
          "Disabling the firewall.",
          "Disconnecting from the network.",
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
              src="/assets/img/home-1/shop/Extreme Level 2.png" alt=""
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
              <h1
                style={{
                  fontSize: "2.2rem",
                  marginBottom: "8px",
                  color: "#39FF14",
                  textTransform: "none"
                }}
              >
                BlackBox 2 – Windows AD Sim
              </h1>
              <p style={{ fontSize: "1.15rem", color: "#fff", margin: 0 , textTransform: "none"}}>
                A comprehensive Windows Active Directory simulation focusing on
                enumeration, exploitation, and post-exploitation techniques.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Accordion Section */}
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
                  textTransform: "none"
                }}
              >
                <span
                  style={{ color: "#39FF14", fontWeight: 700, marginRight: 12 , textTransform: "none"}}
                >
                  Module {module.id}
                </span>
                <span style={{ color: "#fff", fontWeight: 600 , textTransform: "none"}}>
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
                                  handleInputChange(
                                    module.id,
                                    q.name,
                                    e.target.value
                                  )
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
                                disabled={submittedAnswers[module.id]?.[q.name]}
                              />
                            )}
                            <button
                              onClick={() =>
                                handleSubmitQuestion(module.id, q.name)
                              }
                              style={{
                                background: submittedAnswers[module.id]?.[
                                  q.name
                                ]
                                  ? "#2ecc71"
                                  : "#0FA30F",
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
              Well Done! You've completed the BlackBox 2 – Windows AD Sim Lab.
              <br />
              Ready to take the next step? Head to{" "}
              <b>Windows Post-Exploitation</b>.
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
          textTransform : "none"
        }}
      >
        <Link
          to="/labs/13" className="lab-nav-btn">
          &larr; Previous Lab
        </Link>
        <Link
          to="/labs/15" className="lab-nav-btn">
          Next Lab &rarr;
        </Link>
      </div>
      </Layout>
    </>
  );
};

export default LabsOutlinePage;
