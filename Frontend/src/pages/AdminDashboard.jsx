import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Users, ClipboardList, FilePlus } from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role || role.toUpperCase() !== "ADMIN") {
      navigate("/");
      return;
    }

    if (!token) return;


    const fetchData = async () => {
      try {
        if (activeTab === "users") {
          const response = await axios.get(
            "http://localhost:5000/api/users/admin/users",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUsers(response.data);
        } else if (activeTab === "submissions") {
          const response = await axios.get(
            "http://localhost:5000/api/labs/submissions",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setSubmissions(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate, activeTab]);

  if (loading)
    return (
      <h2 style={{ color: "#22c55e", textAlign: "center", marginTop: "100px" }}>
        Loading {activeTab}...
      </h2>
    );

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0f0f10",
          color: "white",
          padding: "40px",
          fontFamily: '"Poppins", sans-serif',
          paddingTop: "120px",
        }}
      >
        <h1
          style={{
            color: "#22c55e",
            textAlign: "center",
            marginBottom: "30px",
            textTransform: "uppercase",
            fontSize: "2.5rem",
          }}
        >
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
            gap: "20px",
          }}
        >
          <button
            onClick={() => setActiveTab("users")}
            style={{
              background: activeTab === "users" ? "#22c55e" : "#1b1b1f",
              color: activeTab === "users" ? "#000" : "white",
              border: "none",
              padding: "10px 22px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
              boxShadow: activeTab === "users" ? "0 0 15px #22c55e" : "none",
            }}
          >
            <Users size={18} /> Users
          </button>

          <button
            onClick={() => setActiveTab("submissions")}
            style={{
              background: activeTab === "submissions" ? "#22c55e" : "#1b1b1f",
              color: activeTab === "submissions" ? "#000" : "white",
              border: "none",
              padding: "10px 22px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
              boxShadow:
                activeTab === "submissions" ? "0 0 15px #22c55e" : "none",
            }}
          >
            <ClipboardList size={18} /> Submissions
          </button>

          <button
            onClick={() => setActiveTab("createLab")}
            style={{
              background: activeTab === "createLab" ? "#22c55e" : "#1b1b1f",
              color: activeTab === "createLab" ? "#000" : "white",
              border: "none",
              padding: "10px 22px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
              boxShadow:
                activeTab === "createLab" ? "0 0 15px #22c55e" : "none",
            }}
          >
            <FilePlus size={18} /> Create Lab
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "users" && <UserTable users={users} />}
        {activeTab === "submissions" && <SubmissionTable submissions={submissions} />}
        {activeTab === "createLab" && <CreateLabForm token={token} />}

      </div>
    </>
  );
};

export default AdminDashboard;

// ==================== COMPONENTS ====================

// Users Table
const UserTable = ({ users }) => (
  <div
    style={{
      background: "#1b1b1f",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      overflowX: "auto",
    }}
  >
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: "2px solid #22c55e" }}>
          <th style={{ padding: "10px" }}>ID</th>
          <th style={{ padding: "10px" }}>Username</th>
          <th style={{ padding: "10px" }}>Email</th>
          <th style={{ padding: "10px" }}>Role</th>
          <th style={{ padding: "10px" }}>Joined</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #333" }}>
              <td style={{ padding: "10px" }}>{user.id}</td>
              <td style={{ padding: "10px", textTransform: "capitalize" }}>
                {user.username}
              </td>
              {/* Removed .toLowerCase() to show email as entered */}
              <td style={{ padding: "10px", textTransform: "none" }}>
                {user.email}
              </td>
              <td
                style={{
                  padding: "10px",
                  color: user.role === "admin" ? "#22c55e" : "#aaa",
                  textTransform: "uppercase",
                }}
              >
                {user.role}
              </td>
              <td style={{ padding: "10px" }}>
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// Submissions Table
const SubmissionTable = ({ submissions }) => (
  <div
    style={{
      background: "#1b1b1f",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      overflowX: "auto",
    }}
  >
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: "2px solid #22c55e" }}>
          <th style={{ padding: "10px" }}>User</th>
          <th style={{ padding: "10px" }}>Lab</th>
          <th style={{ padding: "10px" }}>Module</th>
          <th style={{ padding: "10px" }}>Question</th>
          <th style={{ padding: "10px" }}>Answer</th>
          <th style={{ padding: "10px" }}>Submitted</th>
        </tr>
      </thead>
      <tbody>
        {submissions.length > 0 ? (
          submissions.map((sub, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #333" }}>
              <td style={{ padding: "10px" }}>{sub.user.username}</td>
              <td style={{ padding: "10px" }}>
                {sub.question.module.lab.title}
              </td>
              <td style={{ padding: "10px" }}>{sub.question.module.title}</td>
              <td style={{ padding: "10px" }}>{sub.question.text}</td>
              <td style={{ padding: "10px", color: "#22c55e" }}>
                {sub.selected}
              </td>
              <td style={{ padding: "10px" }}>
                {new Date(sub.createdAt).toLocaleString()}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
              No submissions found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
const CreateLabForm = ({ token }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [modules, setModules] = useState([
    { title: "", questions: [{ text: "", type: "mcq", options: ["", ""], answer: "" }] },
  ]);

  // ➕ Add a new module
  const addModule = () =>
    setModules([...modules, { title: "", questions: [{ text: "", type: "mcq", options: ["", ""], answer: "" }] }]);

  // ➕ Add a new question inside a module
  const addQuestion = (mIndex) => {
    const copy = [...modules];
    copy[mIndex].questions.push({ text: "", type: "mcq", options: ["", ""], answer: "" });
    setModules(copy);
  };

  // ➕ Add a new option to a question
  const addOption = (mIndex, qIndex) => {
    const copy = [...modules];
    copy[mIndex].questions[qIndex].options.push("");
    setModules(copy);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title,
        summary,
        image,
        modules: modules.map((m) => ({
          title: m.title,
          questions: m.questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.type === "mcq" ? q.options : [],
            answer: q.answer,
          })),
        })),
      };

      await axios.post("http://localhost:5000/api/labs/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Lab created successfully!");
      setTitle("");
      setSummary("");
      setImage("");
      setModules([{ title: "", questions: [{ text: "", type: "mcq", options: ["", ""], answer: "" }] }]);
    } catch (error) {
      console.error("Error creating lab:", error);
      alert("Failed to create lab");
    }
  };

  return (
    <div
      style={{
        background: "#1b1b1f",
        padding: "30px",
        borderRadius: "12px",
        maxWidth: "950px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ color: "#22c55e", marginBottom: "20px", textAlign: "center" }}>
        Create New Lab
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Lab Info */}
        <label style={{ color: "#22c55e", fontWeight: "bold" }}>Lab Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter lab title"
          style={{
            width: "100%",
            marginBottom: "12px",
            padding: "10px",
            background: "#181c2a",
            color: "#fff",
            border: "1px solid #39FF14",
            borderRadius: "6px",
            outline: "none",
          }}
          required
        />

        <label style={{ color: "#22c55e", fontWeight: "bold" }}>Summary</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Brief summary of the lab"
          style={{
            width: "100%",
            marginBottom: "12px",
            padding: "10px",
            background: "#181c2a",
            color: "#fff",
            border: "1px solid #39FF14",
            borderRadius: "6px",
            outline: "none",
            resize: "vertical",
          }}
        />

        <label style={{ color: "#22c55e", fontWeight: "bold" }}>Image URL (optional)</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.png"
          style={{
            width: "100%",
            marginBottom: "20px",
            padding: "10px",
            background: "#181c2a",
            color: "#fff",
            border: "1px solid #39FF14",
            borderRadius: "6px",
            outline: "none",
          }}
        />

        {/* Modules */}
        {modules.map((mod, mIndex) => (
          <div
            key={mIndex}
            style={{
              border: "1px solid #333",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ color: "#22c55e" }}>MODULE {mIndex + 1}</h3>

            <input
              placeholder="Module Title"
              value={mod.title}
              onChange={(e) => {
                const copy = [...modules];
                copy[mIndex].title = e.target.value;
                setModules(copy);
              }}
              style={{
                width: "100%",
                marginBottom: "12px",
                padding: "10px",
                background: "#181c2a",
                color: "#fff",
                border: "1px solid #39FF14",
                borderRadius: "6px",
                outline: "none",
              }}
              required
            />

            {mod.questions.map((q, qIndex) => (
              <div
                key={qIndex}
                style={{
                  background: "#232323",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  position: "relative",
                }}
              >
                {/* Remove Question Button */}
                <button
                  type="button"
                  onClick={() => {
                    const copy = [...modules];
                    copy[mIndex].questions.splice(qIndex, 1);
                    setModules(copy);
                  }}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    background: "#ff3b3b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  title="Remove Question"
                >
                  ×
                </button>

                {/* Question Input */}
                <input
                  placeholder="Question Text"
                  value={q.text}
                  onChange={(e) => {
                    const copy = [...modules];
                    copy[mIndex].questions[qIndex].text = e.target.value;
                    setModules(copy);
                  }}
                  style={{
                    width: "100%",
                    marginBottom: "12px",
                    padding: "10px",
                    background: "#181c2a",
                    color: "#fff",
                    border: "1px solid #39FF14",
                    borderRadius: "6px",
                    outline: "none",
                  }}
                  required
                />

                {/* Question Type */}
                <label style={{ color: "#22c55e", fontWeight: "bold" }}>Question Type:</label>
                <select
                  value={q.type}
                  onChange={(e) => {
                    const copy = [...modules];
                    copy[mIndex].questions[qIndex].type = e.target.value;
                    setModules(copy);
                  }}
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "10px",
                    background: "#181c2a",
                    color: "#fff",
                    border: "1px solid #39FF14",
                    borderRadius: "6px",
                    outline: "none",
                  }}
                >
                  <option value="mcq">Multiple Choice (MCQ)</option>
                  <option value="text">Descriptive (Sentence)</option>
                </select>

                {/* Options for MCQs */}
                {q.type === "mcq" &&
                  q.options.map((opt, optIndex) => (
                    <div key={optIndex} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input
                        placeholder={`Option ${optIndex + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const copy = [...modules];
                          copy[mIndex].questions[qIndex].options[optIndex] = e.target.value;
                          setModules(copy);
                        }}
                        style={{
                          flex: 1,
                          marginBottom: "8px",
                          padding: "10px",
                          background: "#181c2a",
                          color: "#fff",
                          border: "1px solid #39FF14",
                          borderRadius: "6px",
                          outline: "none",
                        }}
                      />
                      {/* Remove Option Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const copy = [...modules];
                          copy[mIndex].questions[qIndex].options.splice(optIndex, 1);
                          setModules(copy);
                        }}
                        style={{
                          background: "#ff3b3b",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          cursor: "pointer",
                        }}
                        title="Remove Option"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                {q.type === "mcq" && (
                  <button
                    type="button"
                    onClick={() => addOption(mIndex, qIndex)}
                    style={{
                      background: "#22c55e",
                      color: "#000",
                      border: "none",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                  >
                     Add Option
                  </button>
                )}

                {/* Correct Answer */}
                <input
                  placeholder="Correct Answer"
                  value={q.answer}
                  onChange={(e) => {
                    const copy = [...modules];
                    copy[mIndex].questions[qIndex].answer = e.target.value;
                    setModules(copy);
                  }}
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    padding: "10px",
                    background: "#181c2a",
                    color: "#fff",
                    border: "1px solid #39FF14",
                    borderRadius: "6px",
                    outline: "none",
                  }}
                  required
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                const copy = [...modules];
                copy.splice(mIndex, 1);
                setModules(copy);
              }}
              style={{
                background: "#ff3b3b",
                color: "#fff",
                padding: "8px 14px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
               Remove Module
            </button>



            <button
              type="button"
              onClick={() => addQuestion(mIndex)}
              style={{
                background: "#22c55e",
                color: "#000",
                padding: "8px 14px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add Question
            </button>

          </div>
        ))}

        {/* Add Module + Submit */}
        <button
          type="button"
          onClick={addModule}
          style={{
            background: "#22c55e",
            color: "#000",
            marginRight: "10px",
            padding: "10px 18px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
           Add Module
        </button>

        <button
          type="submit"
          style={{
            background: "#22c55e",
            color: "#000",
            padding: "10px 18px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
           Save Lab
        </button>
      </form>

    </div>
  );
};

