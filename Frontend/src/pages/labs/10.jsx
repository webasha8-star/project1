import React, { useState } from "react";
import "./LabOutline.css";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const modules = [
  {
    id: 1,
    title: "Module 1: What is Active Directory?",
    summary: "Active Directory (AD) is a directory service developed by Microsoft for Windows domain networks. Understanding its structure and components is key to enumerating and attacking Windows environments.",
    questions: [
      {
        label: "What is the purpose of Active Directory?",
        name: "q1",
        options: [
          "To manage users and computers in a Windows network.",
          "To store website files.",
          "To run Linux services.",
          "To host databases."
        ]
      },
      {
        label: "What is a domain controller?",
        name: "q2",
        options: [
          "A server that handles authentication and enforces policies.",
          "A user account with admin rights.",
          "A database server.",
          "A firewall device."
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Module 2: LDAP and Kerberos Basics",
    summary: "Lightweight Directory Access Protocol (LDAP) and Kerberos are core protocols used in AD. Understanding them helps with enumeration and lateral movement.",
    questions: [
      {
        label: "Which protocol is used to query directory information?",
        name: "q1",
        options: ["LDAP", "DNS", "SMB", "HTTP"]
      },
      {
        label: "What does Kerberos use for authentication?",
        name: "q2",
        options: ["Tickets", "Passwords only", "Tokens", "Certificates"]
      }
    ]
  },
  {
    id: 3,
    title: "Module 3: Enumerating AD Users and Groups",
    summary: "Identifying AD users, groups, and their privileges is essential in post-compromise scenarios.",
    questions: [
      { label: "Which tool can enumerate AD users via command-line?", name: "q1" },
      { label: "How to identify members of the Domain Admins group?", name: "q2" }
    ]
  },
  {
    id: 4,
    title: "Module 4: SPNs and Kerberoasting",
    summary: "Service Principal Names (SPNs) can be abused to perform Kerberoasting attacks and extract hashes.",
    questions: [
      { label: "What command/tool lists SPNs in AD?", name: "q1" },
      { label: "What is the goal of Kerberoasting?", name: "q2" }
    ]
  },
  {
    id: 5,
    title: "Module 5: GPP and Credential Hunting",
    summary: "Group Policy Preferences (GPP) may contain stored credentials, which can be retrieved from SYSVOL shares.",
    questions: [
      { label: "Where can GPP passwords be found?", name: "q1" },
      { label: "Which tool helps extract these credentials?", name: "q2" }
    ]
  },
  {
    id: 6,
    title: "Module 6: Lateral Movement Techniques",
    summary: "Understanding and identifying lateral movement techniques like Pass-the-Hash or SMB Relay in AD networks.",
    questions: [
      { label: "Name a tool used for Pass-the-Hash attacks.", name: "q1" },
      { label: "Which ports are commonly used for SMB communication?", name: "q2" }
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
      <section className="lab-info-section" style={{ background: '#232d3f', color: '#fff', padding: '32px 0', textAlign: 'center', paddingTop: '150px' }}>
        <div className="container" style={{ margin: '0 auto', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <img src="/assets/img/home-1/shop/Hard Level 4.png" alt="" style={{ width: 110, height: 110, marginRight: 32, borderRadius: 12, background: '#f03e2aff', padding: 8, objectFit: 'contain' }} />
            <div>
              <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', color: '#39FF14' , textTransform: "none"}}>Active Directory Enumeration</h1>
              <p style={{ fontSize: '1.15rem', color: '#fff', margin: 0 , textTransform: "none"}}>
                Learn how to enumerate Active Directory environments. Topics include LDAP, Kerberos, users, groups, SPNs, and lateral movement techniques.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section style={{ background: '#181c2a', minHeight: '60vh', padding: '32px 0' }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {modules.map(module => (
            <div key={module.id} style={{ marginBottom: 18, borderRadius: 8, background: '#232d3f', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
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
                }}
              >
                <span style={{ color: '#39FF14', fontWeight: 700, marginRight: 12 , textTransform: "none"}}>Module {module.id}</span>
                <span style={{ color: '#fff', fontWeight: 600 , textTransform: "none"}}>{module.title.replace(/^Module \d+: /, '')}</span>
                <span style={{ marginLeft: 'auto', color: '#fff', fontSize: 22 }}>{openModule === module.id ? '\u25B2' : '\u25B6'}</span>
              </div>
              {openModule === module.id && (
                <div style={{ padding: '24px 32px', color: '#fff', fontSize: '1.08rem', background: '#232d3f' , textTransform: "none" }}>
                  <div style={{ marginBottom: 8, color: '#bfc9da' }}>{module.summary}</div>
                  {isLoggedIn ? (
                    <div>
                      {module.questions.map((q, idx) => (
                        <div key={q.name} style={{ marginBottom: 24, background: '#1a1f2e', padding: 16, borderRadius: 8 , textTransform: "none" }}>
                          <label style={{ color: '#39FF14', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                            Question {idx + 1}. {q.label}
                          </label>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            {q.options ? (
                              <div style={{ flex: 1 }}>
                                {q.options.map((opt, i) => (
                                  <label key={i} style={{ display: 'block', marginBottom: 6, color: '#fff', fontWeight: 400 }}>
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
                                value={answers[module.id]?.[q.name] || ''}
                                onChange={e => handleInputChange(module.id, q.name, e.target.value)}
                                style={{
                                  flex: 1,
                                  padding: '10px',
                                  borderRadius: 4,
                                  border: '1px solid #34495e',
                                  background: '#181c2a',
                                  color: '#fff'
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
                                minWidth: '100px'
                              }}
                              disabled={submittedAnswers[module.id]?.[q.name]}
                            >
                              {submittedAnswers[module.id]?.[q.name] ? 'Submitted' : 'Submit'}
                            </button>
                          </div>
                        </div>
                      ))}
                      {isModuleComplete(module.id) && (
                        <div style={{ marginTop: 16, padding: 12, background: '#2ecc71', color: '#fff', borderRadius: 4, textAlign: 'center' , textTransform: "none"}}>
                          Module Completed! 🎉
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      style={{ background: '#0FA30F', color: '#fff', border: 'none', borderRadius: 4, padding: '12px 32px', fontWeight: 700, fontSize: '1.1rem', marginTop: 18, cursor: 'pointer' , textTransform: "none"}}
                      onClick={() => window.location.href = '/login'}
                    >
                      Login to Answer
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
          {allModulesCompleted && (
            <div style={{ marginTop: 48, background: '#0FA30F', color: '#fff', padding: '18px 24px', borderRadius: 8, textAlign: 'center', fontWeight: 600, fontSize: '1.2rem' }}>
              <span role="img" aria-label="trophy">🏆</span> Well Done! You've completed the Active Directory Enumeration Lab.
            </div>
          )}
        </div>
      </section>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 1200, margin: '24px auto 0', padding: '0 24px' }}>
        <Link to="/labs/9"  className="lab-nav-btn">
          ← Previous Lab
        </Link>
        <Link to="/labs/11"  className="lab-nav-btn">
          Next Lab →
        </Link>
      </div>
      </Layout>
    </>
  );
};

export default LabsOutlinePage;
