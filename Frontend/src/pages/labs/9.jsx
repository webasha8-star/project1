import React, { useState } from "react";
import Layout from "../../components/Layout";
import "./LabOutline.css";
import { Link } from "react-router-dom";

const modules = [
  {
    id: 1,
    title: "Module 1: Post-Exploitation Basics",
    summary: "Understand the key steps after initial access—gathering credentials, persistence, and privilege escalation.",
    questions: [
      {
        label: "Which command helps in collecting stored credentials in memory?",
        name: "q1",
        options: ["mimikatz", "netstat", "whoami", "ssh"]
      },
      {
        label: "Why is post-exploitation important?",
        name: "q2",
        options: [
          "To establish persistence and escalate privileges",
          "To log out users",
          "To format the drive",
          "To reset the machine"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Module 2: Lateral Movement Techniques",
    summary: "Learn how attackers move across systems in a network using tools like PsExec, WinRM, and SSH.",
    questions: [
      {
        label: "Which tool can be used for remote command execution on Windows?",
        name: "q1",
        options: ["PsExec", "Nmap", "Hydra", "John"]
      },
      {
        label: "What protocol does WinRM use?",
        name: "q2",
        options: ["HTTP", "RDP", "SMB", "FTP"]
      }
    ]
  },
  {
    id: 3,
    title: "Module 3: Privilege Escalation",
    summary: "Explore methods to escalate privileges using kernel exploits, misconfigurations, and credential reuse.",
    questions: [
      { label: "Which file often stores password hashes in Linux?", name: "q1" },
      { label: "Which command can reveal sudo rights?", name: "q2" }
    ]
  },
  {
    id: 4,
    title: "Module 4: Persistence Techniques",
    summary: "Establishing persistence ensures continued access after a reboot or network interruption.",
    questions: [
      { label: "Name a common persistence technique on Windows.", name: "q1" },
      { label: "Which file can be modified in Linux to auto-execute scripts?", name: "q2" }
    ]
  },
  {
    id: 5,
    title: "Module 5: Clearing Tracks",
    summary: "Learn methods to remove evidence from the target system after exploitation.",
    questions: [
      { label: "Which command clears bash history?", name: "q1" },
      { label: "What is the importance of clearing logs?", name: "q2" }
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
            <img
  src="/assets/img/home-1/shop/Hard Level 3.png"
  alt="Hard Level 3"
  style={{
    width: 110,
    height: 110,
    marginRight: 32,
    borderRadius: 12,
    background: '#f03e2aff',
    padding: 8,
    objectFit: 'contain'
  }}
/>

            <div>
              <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', color: '#39FF14' , textTransform: "none"}}>Post-Exploitation & Lateral Move</h1>
              <p style={{ fontSize: '1.15rem', color: '#fff', margin: 0 , textTransform: "none"}}>
                After gaining initial access, post-exploitation and lateral movement techniques help attackers maintain access, gather sensitive information, and pivot through networks. This module explores those key steps.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section style={{ background: '#181c2a', minHeight: '60vh', padding: '32px 0' }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto' , textTransform: "none" }}>
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
                <div style={{ padding: '24px 32px', color: '#fff', fontSize: '1.08rem', background: '#232d3f' }}>
                  <div style={{ marginBottom: 8, color: '#bfc9da' , textTransform: "none"}}>{module.summary}</div>
                  {isLoggedIn ? (
                    <div>
                      {module.questions.map((q, idx) => (
                        <div key={q.name} style={{ marginBottom: 24, background: '#1a1f2e', padding: 16, borderRadius: 8 }}>
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
                                      name={`module-${module.id}-${q.name}`}
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
                      style={{ background: '#0FA30F', color: '#fff', border: 'none', borderRadius: 4, padding: '12px 32px', fontWeight: 700, fontSize: '1.1rem', marginTop: 18, cursor: 'pointer' , textTransform: "none" }}
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
              <span role="img" aria-label="trophy">🏆</span> Well Done! You've completed the Post-Exploitation & Lateral Move Lab.<br />
              Ready to take the next step? Head to <b>Credential Dumping & Pass-the-Hash</b>.
            </div>
          )}
        </div>
      </section>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 1200, margin: '24px auto 0', padding: '0 24px' }}>
        <Link to="/labs/8" className="lab-nav-btn">
          &larr; Previous Lab
        </Link>
        <Link to="/labs/10" className="lab-nav-btn">
          Next Lab &rarr;
        </Link>
      </div>
      </Layout>
    </>
  );
};

export default LabsOutlinePage;