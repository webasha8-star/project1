import React, { useState } from "react";
import Layout from "../../components/Layout";
import "./LabOutline.css";
import { Link } from "react-router-dom";

const modules = [
  {
    id: 1,
    title: "Module 1: Advanced Exploitation & Post-Exploitation",
    summary: "This module covers advanced exploitation techniques and post-exploitation strategies for complex environments.",
    questions: [
      {
        label: "Which of the following best describes a format string vulnerability?",
        name: "q1",
        options: [
          "A bug that allows reading/writing arbitrary memory via user-controlled format specifiers.",
          "A bug in SQL queries.",
          "A bug in file upload logic.",
          "A bug in authentication logic."
        ]
      },
      {
        label: "Which tool is commonly used for pass-the-hash attacks in Windows Active Directory?",
        name: "q2",
        options: [
          "Mimikatz",
          "Burp Suite",
          "Nmap",
          "Metasploit"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Module 2: Web Application Security Deep Dive",
    summary: "Explore advanced web application vulnerabilities, including chained exploits and bypassing modern security controls.",
    questions: [
      {
        label: "Which of the following are common web application vulnerabilities? (Select all that apply)",
        name: "q1",
        options: [
          "SQL Injection",
          "Cross-Site Scripting (XSS)",
          "Buffer Overflow",
          "File Inclusion"
        ],
        multi: true
      },
      {
        label: "Which techniques can help bypass a WAF? (Select all that apply)",
        name: "q2",
        options: [
          "Payload obfuscation",
          "Encoding",
          "Changing HTTP methods",
          "Using a VPN"
        ],
        multi: true
      }
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
    const moduleQuestions = modules.find(m => m.id === moduleId)?.questions || [];
    const submittedCount = Object.keys(submittedAnswers[moduleId] || {}).length;
    return moduleQuestions.length === submittedCount;
  };

  const allModulesCompleted = modules.every(module => isModuleComplete(module.id));

  return (
    <>
      <Layout>
        {/* Module Header */}
        <section className="lab-info-section" style={{
          background: '#232d3f',
          color: '#fff',
          padding: '32px 0',
          textAlign: 'center',
          paddingTop: '150px',
          textTransform: "none"
        }}>
          <div className="container" style={{ margin: '0 auto', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <img src="/assets/img/home-1/shop/Medium Level 1.png" alt="" style={{ width: 110, height: 110, marginRight: 32, borderRadius: 12, background: '#ffcc33', padding: 8, objectFit: 'contain' }} />
              <div>
                <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', color: '#39FF14', textTransform: "none" }}>
                  Advanced Exploitation Lab
                </h1>
                <p style={{ fontSize: '1.15rem', color: '#fff', margin: 0, textTransform: "none" }}>
                  Tackle complex exploitation and post-exploitation scenarios, including chained web attacks and advanced Windows/Active Directory techniques.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Accordion Section */}
        <section style={{ background: '#181c2a', minHeight: '60vh', padding: '32px 0', textTransform: "none" }}>
          <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>
            {modules.map(module => (
              <div key={module.id} style={{
                marginBottom: 18,
                borderRadius: 8,
                background: '#232d3f',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textTransform: "none"
              }}>
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
                  <span style={{
                    color: '#39FF14',
                    fontWeight: 700,
                    marginRight: 12,
                    textTransform: "none"
                  }}>
                    Module {module.id}
                  </span>
                  <span style={{
                    color: '#fff',
                    fontWeight: 600,
                    textTransform: "none"
                  }}>
                    {module.title.replace(/^Module \d+: /, '')}
                  </span>
                  <span style={{ marginLeft: 'auto', color: '#fff', fontSize: 22 }}>
                    {openModule === module.id ? '\u25B2' : '\u25B6'}
                  </span>
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
                                // Textarea for open-ended answers
                                <textarea
                                  value={answers[module.id]?.[q.name] || ''}
                                  onChange={e => handleInputChange(module.id, q.name, e.target.value)}
                                  style={{
                                    flex: 1,
                                    minHeight: 80,
                                    padding: '10px',
                                    borderRadius: 4,
                                    border: '1px solid #34495e',
                                    background: '#181c2a',
                                    color: '#fff',
                                    resize: 'vertical',
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
                          <div style={{
                            marginTop: 16,
                            padding: 12,
                            background: '#2ecc71',
                            color: '#fff',
                            borderRadius: 4,
                            textAlign: 'center',
                            textTransform: "none"
                          }}>
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
                        onClick={() => window.location.href = '/login'}
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
              <div style={{
                marginTop: 48,
                background: '#0FA30F',
                color: '#fff',
                padding: '18px 24px',
                borderRadius: 8,
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '1.2rem',
                textTransform: "none"
              }}>
                <span role="img" aria-label="trophy">🏆</span> Well Done! You've completed the Advanced Exploitation Lab.<br />
                Ready to take the next step? Head to <b>Windows Privilege Escalation</b>.
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
          <Link to="/labs/2" className="lab-nav-btn">
            &larr; Previous Lab
          </Link>
          <Link to="/labs/4" className="lab-nav-btn">
            Next Lab &rarr;
          </Link>
        </div>
      
    </Layout >
    </>
  );
};

export default LabsOutlinePage;
