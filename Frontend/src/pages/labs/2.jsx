import React, { useState } from "react";
import Layout from "../../components/Layout";
import "./LabOutline.css";
import { Link } from "react-router-dom";

const modules = [
  {
    id: 1,
    title: "Module 1: What is Enumeration?",
    summary:
      "Enumeration is the process of gathering information about the target system—users, groups, services, and more—that helps build a path to escalate privileges.",
    questions: [
      {
        label: "What is the purpose of enumeration?",
        name: "q1",
        options: [
          "To gather information about the target system.",
          "To exploit vulnerabilities directly.",
          "To patch the system.",
          "To install new software."
        ]
      },
      {
        label: "Why is enumeration more critical in post-exploitation?",
        name: "q2",
        options: [
          "It helps escalate privileges and maintain access.",
          "It is not important after exploitation.",
          "It only helps in initial access.",
          "It is used to clean up logs."
        ]
      },
      {
        label: "What Linux command can list current users?",
        name: "q3",
        options: ["who", "ls", "chmod", "cat /etc/shadow"]
      },
      {
        label: "What does the command uname -a show?",
        name: "q4",
        options: [
          "System information including kernel version.",
          "List of users.",
          "Network interfaces.",
          "Running processes."
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Module 2: Checking System Information",
    summary:
      "Gathering system info helps in identifying kernel exploits and system-specific misconfigurations.",
    questions: [
      {
        label: "What is the Linux distribution name? (Select all that apply)",
        name: "q1",
        options: ["Ubuntu", "CentOS", "Debian", "Fedora"],
        multi: true
      },
      {
        label: "What is the kernel version? (Select all that apply)",
        name: "q2",
        options: [
          "5.4.0-42-generic",
          "4.15.0-20-generic",
          "3.10.0-1127.el7.x86_64",
          "2.6.32-754.el6.x86_64"
        ],
        multi: true
      }
    ]
  },
  {
    id: 3,
    title: "Module 3: Finding Users and Groups",
    summary:
      "User accounts, especially those in privileged groups, are targets for escalation. Listing users and groups gives insight into potential access points.",
    questions: [
      { label: "What is the name of the first user listed in /etc/passwd?", name: "q1" },
      { label: "Is there a user with UID 0 other than root?", name: "q2" }
    ]
  },
  {
    id: 4,
    title: "Module 4: Scheduled Tasks and Crons",
    summary:
      "Scheduled cron jobs run with the permission of the user who owns them. Misconfigured crons can be exploited.",
    questions: [
      { label: "How many cron jobs are listed in /etc/crontab?", name: "q1" },
      { label: "Which command can be used to list cron jobs for all users?", name: "q2" }
    ]
  },
  {
    id: 5,
    title: "Module 5: PATH Misconfiguration Basics",
    summary:
      "If scripts run from cron do not use absolute paths, they may execute unintended binaries.",
    questions: [
      { label: "What environment variable is responsible for command lookup?", name: "q1" },
      { label: "How can this be exploited if a root-owned script calls a binary without a full path?", name: "q2" }
    ]
  },
  {
    id: 6,
    title: "Module 6: Understanding Linux Filesystem Hierarchy",
    summary:
      "Understanding the filesystem hierarchy and locating sensitive files is crucial in privilege escalation and post-exploitation.",
    questions: [
      { label: "What does /etc directory usually contain?", name: "q1" },
      { label: "Which directory contains user-specific files?", name: "q2" },
      { label: "What is the importance of /var/log/ in enumeration?", name: "q3" },
      { label: "List the path to the passwd file.", name: "q4" },
      { label: "How many user directories are present in /home?", name: "q5" }
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
    const moduleQuestions = modules.find((m) => m.id === moduleId)?.questions || [];
    const submittedCount = Object.keys(submittedAnswers[moduleId] || {}).length;
    return moduleQuestions.length === submittedCount;
  };

  const allModulesCompleted = modules.every((module) => isModuleComplete(module.id));

  return (
    <>
      <Layout>     {/* Module Header */}
        <section
          className="lab-info-section"
          style={{
            background: '#232d3f',
            color: '#fff',
            padding: '32px 0',
            textAlign: 'center',
            paddingTop: '150px',
            textTransform: "none"
          }}
        >
          <div className="container" style={{ margin: '0 auto', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <img
                src="/assets/img/home-1/shop/Easy Level 2.png" alt=""
                style={{ width: 110, height: 110, marginRight: 32, borderRadius: 12, background: '#34495e', padding: 8, objectFit: 'contain' }}
              />
              <div>
                <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', color: '#39FF14', textTransform: "none" }}>
                  Introduction to Linux Enumeration
                </h1>
                <p style={{ fontSize: '1.15rem', color: '#fff', margin: 0, textTransform: "none" }}>
                  Before diving deep into the world of privilege escalation and exploitation, it's critical to understand how to enumerate Linux systems. Enumeration is the process of gathering information about the target system—users, groups, services, and more—that helps build a path to escalate privileges.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Accordion Section */}
        <section style={{ background: '#181c2a', minHeight: '60vh', padding: '32px 0' }}>
          <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>
            {modules.map((module) => (
              <div
                key={module.id}
                style={{
                  marginBottom: 18,
                  borderRadius: 8,
                  background: '#232d3f',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  textTransform: "none"
                }}
              >
                <div
                  onClick={() => setOpenModule(openModule === module.id ? null : module.id)}
                  style={{
                    cursor: 'pointer',
                    padding: '22px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: openModule === module.id ? '1px solid #39FF14' : 'none',
                    background: '#232d3f',
                    color: '#39FF14',
                    fontWeight: 700,
                    fontSize: '1.18rem',
                    transition: 'background 0.2s',
                    textTransform: "none"
                  }}
                >
                  <span style={{ color: '#39FF14', fontWeight: 700, marginRight: 12, textTransform: "none" }}>
                    Module {module.id}
                  </span>
                  <span style={{ color: '#fff', fontWeight: 600, textTransform: "none" }}>
                    {module.title.replace(/^Module \d+: /, '')}
                  </span>
                  <span style={{ marginLeft: 'auto', color: '#fff', fontSize: 22 }}>{openModule === module.id ? '\u25B2' : '\u25B6'}</span>
                </div>
                {openModule === module.id && (
                  <div style={{ padding: '24px 32px', color: '#fff', fontSize: '1.08rem', background: '#232d3f', textTransform: "none" }}>
                    <div style={{ marginBottom: 8, color: '#bfc9da', textTransform: "none" }}>{module.summary}</div>
                    {isLoggedIn ? (
                      <div>
                        {module.questions.map((q, idx) => (
                          <div key={q.name} style={{ marginBottom: 24, background: '#1a1f2e', padding: 16, borderRadius: 8, textTransform: "none" }}>
                            <label style={{ color: '#39FF14', fontWeight: 600, display: 'block', marginBottom: 6, textTransform: "none" }}>
                              Question {idx + 1}. {q.label}
                            </label>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', textTransform: "none" }}>
                              {/* MCQ Radio */}
                              {q.options ? (
                                q.multi ? (
                                  // Multi-select checkboxes
                                  <div style={{ flex: 1 }}>
                                    {q.options.map((opt, i) => (
                                      <label key={i} style={{ display: 'block', marginBottom: 6, color: '#fff', fontWeight: 400, textTransform: "none" }}>
                                        <input
                                          type="checkbox"
                                          name={`module${module.id}-${q.name}`}
                                          value={opt}
                                          checked={Array.isArray(answers[module.id]?.[q.name]) && answers[module.id][q.name].includes(opt)}
                                          onChange={e => {
                                            const prev = Array.isArray(answers[module.id]?.[q.name]) ? answers[module.id][q.name] : [];
                                            if (e.target.checked) {
                                              handleInputChange(module.id, q.name, [...prev, opt]);
                                            } else {
                                              handleInputChange(module.id, q.name, prev.filter(v => v !== opt));
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
                                      <label key={i} style={{ display: 'block', marginBottom: 6, color: '#fff', fontWeight: 400, textTransform: "none" }}>
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
                                )
                              ) : (
                                // Text input
                                <input
                                  type="text"
                                  value={answers[module.id]?.[q.name] || ''}
                                  onChange={(e) => handleInputChange(module.id, q.name, e.target.value)}
                                  style={{
                                    flex: 1,
                                    padding: '10px',
                                    borderRadius: 4,
                                    border: '1px solid #34495e',
                                    background: '#181c2a',
                                    color: '#fff',
                                    textTransform: "none"
                                  }}
                                  placeholder="Answer Here"
                                  disabled={submittedAnswers[module.id]?.[q.name]}
                                />
                              )}
                              <button
                                onClick={() => handleSubmitQuestion(module.id, q.name)}
                                style={{
                                  background: submittedAnswers[module.id]?.[q.name] ? '#2ecc71' : '#0FA30F',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: 4,
                                  padding: '10px 24px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  minWidth: '100px',
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
                          <div
                            style={{
                              marginTop: 16,
                              padding: 12,
                              background: '#2ecc71',
                              color: '#fff',
                              borderRadius: 4,
                              textAlign: 'center',
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
                          background: '#0FA30F',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 4,
                          padding: '12px 32px',
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          marginTop: 18,
                          cursor: 'pointer',
                          textTransform: "none"
                        }}
                        onClick={() => (window.location.href = '/login')}
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
                  background: '#0FA30F',
                  color: '#fff',
                  padding: '18px 24px',
                  borderRadius: 8,
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  textTransform: "none"
                }}
              >
                <span role="img" aria-label="trophy">🏆</span> Well Done! You've completed the Linux Enumeration Lab.<br />
                Ready to take the next step? Head to <b>File & Directory Enumeration</b>.
              </div>
            )}
          </div>
        </section>
        {/* Lab Navigation Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: 1200,
            margin: '24px auto 0',
            padding: '0 24px',
            textTransform: 'none'
          }}
          >
          <Link to="/labs/1" className="lab-nav-btn">
            &larr; Previous Lab
          </Link>
          <Link to="/labs/3" className="lab-nav-btn">
            Next Lab &rarr;
          </Link>
        </div>

      </Layout>
    </>
  );
};

export default LabsOutlinePage;
