import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import {
  PlusCircle,
  Trash2,
  Save,
  XCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-toastify";

const EditLab = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch lab details
  useEffect(() => {
    const fetchLab = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/labs/${id}`, {
          headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` },
        });
        setLab(res.data);
      } catch (error) {
        console.error("Error fetching lab:", error);
        toast.error("Failed to load lab details", {
          icon: <XCircle size={18} color="#ef4444" />,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchLab();
  }, [id, token]);

  // Handlers
  const handleChange = (field, value) => setLab({ ...lab, [field]: value });

  const addModule = () => {
    setLab({
      ...lab,
      modules: [
        ...lab.modules,
        { title: "", questions: [{ text: "", type: "mcq", options: ["", ""], answer: "" }] },
      ],
    });
  };

  const removeModule = (mIndex) => {
    if (lab.modules.length === 1) {
      toast.warning("At least one module is required", {
        icon: <AlertTriangle size={18} color="#eab308" />,
      });
      return;
    }
    const updated = { ...lab };
    updated.modules.splice(mIndex, 1);
    setLab(updated);
  };

  const addQuestion = (mIndex) => {
    const updated = { ...lab };
    updated.modules[mIndex].questions.push({
      text: "",
      type: "mcq",
      options: ["", ""],
      answer: "",
    });
    setLab(updated);
  };

  const removeQuestion = (mIndex, qIndex) => {
    const updated = { ...lab };
    updated.modules[mIndex].questions.splice(qIndex, 1);
    setLab(updated);
  };

  const addOption = (mIndex, qIndex) => {
    const updated = { ...lab };
    updated.modules[mIndex].questions[qIndex].options.push("");
    setLab(updated);
  };

  const removeOption = (mIndex, qIndex, optIndex) => {
    const updated = { ...lab };
    updated.modules[mIndex].questions[qIndex].options.splice(optIndex, 1);
    setLab(updated);
  };

  // Validate before update
  const validateLab = () => {
    if (!lab.title.trim()) return "Lab title is required.";
    if (lab.modules.length === 0) return "At least one module is required.";

    for (const [mIndex, mod] of lab.modules.entries()) {
      if (!mod.title.trim()) return `Module ${mIndex + 1} needs a title.`;
      for (const [qIndex, q] of mod.questions.entries()) {
        if (!q.text.trim())
          return `Question ${qIndex + 1} in Module ${mIndex + 1} has no text.`;
        if (q.type === "mcq" && q.options.some((opt) => !opt.trim()))
          return `All options must be filled for Question ${qIndex + 1} (Module ${mIndex + 1}).`;
        if (!q.answer.trim())
          return `Question ${qIndex + 1} in Module ${mIndex + 1} needs an answer.`;
      }
    }
    return null;
  };

  // Save lab changes
  const handleSave = async (e) => {
    e.preventDefault();
    const validationError = validateLab();
    if (validationError) {
      toast.warning(validationError, {
        icon: <AlertTriangle size={18} color="#eab308" />,
      });
      return;
    }

    setSaving(true);

    // 🧹 Clean payload before sending
    const cleanLab = {
      title: lab.title,
      summary: lab.summary,
      image: lab.image,
      modules: lab.modules.map((m) => ({
        title: m.title,
        questions: m.questions.map((q) => ({
          text: q.text,
          type: q.type,
          options: q.type === "mcq" ? q.options : [],
          answer: q.answer,
        })),
      })),
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/labs/${id}`,
        cleanLab,
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Lab updated successfully", {
          icon: <CheckCircle size={18} color="#22c55e" />,
        });
        setTimeout(() => navigate("/admin/labs"), 1500);
      } else {
        toast.error("Unexpected response while updating lab.", {
          icon: <XCircle size={18} color="#ef4444" />,
        });
      }
    } catch (error) {
      console.error("Error updating lab:", error.response || error.message);
      toast.error(
        error.response?.data?.message || "Failed to update lab.",
        { icon: <XCircle size={18} color="#ef4444" /> }
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <h2 style={{ color: "#22c55e", textAlign: "center" }}>Loading Lab...</h2>;

  if (!lab)
    return <p style={{ color: "red", textAlign: "center" }}>Lab not found.</p>;

  return (
    <div style={pageContainer}>
      <h2 style={heading}>Edit Lab: {lab.title}</h2>

      <form onSubmit={handleSave}>
        <label style={labelStyle}>Lab Title</label>
        <input
          value={lab.title}
          onChange={(e) => handleChange("title", e.target.value)}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Summary</label>
        <textarea
          value={lab.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          style={textareaStyle}
        />

        <label style={labelStyle}>Image URL</label>
        <input
          value={lab.image}
          onChange={(e) => handleChange("image", e.target.value)}
          style={inputStyle}
        />

        {/* MODULES */}
        {lab.modules?.map((mod, mIndex) => (
          <div key={mIndex} style={moduleStyle}>
            <div style={moduleHeader}>
              <h3 style={moduleTitle}>Module {mIndex + 1}</h3>
              <button
                type="button"
                onClick={() => removeModule(mIndex)}
                style={iconButtonDanger}
              >
                <XCircle size={18} />
              </button>
            </div>

            <input
              placeholder="Module Title"
              value={mod.title}
              onChange={(e) => {
                const updated = { ...lab };
                updated.modules[mIndex].title = e.target.value;
                setLab(updated);
              }}
              style={inputStyle}
              required
            />

            {mod.questions.map((q, qIndex) => (
              <div key={qIndex} style={questionBox}>
                <div style={questionHeader}>
                  <h4 style={questionTitle}>Question {qIndex + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeQuestion(mIndex, qIndex)}
                    style={iconButtonDanger}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <input
                  placeholder="Question Text"
                  value={q.text}
                  onChange={(e) => {
                    const updated = { ...lab };
                    updated.modules[mIndex].questions[qIndex].text = e.target.value;
                    setLab(updated);
                  }}
                  style={inputStyle}
                  required
                />

                <label style={labelStyle}>Question Type</label>
                <select
                  value={q.type}
                  onChange={(e) => {
                    const updated = { ...lab };
                    updated.modules[mIndex].questions[qIndex].type = e.target.value;
                    setLab(updated);
                  }}
                  style={inputStyle}
                >
                  <option value="mcq">Multiple Choice</option>
                  <option value="text">Descriptive</option>
                </select>

                {q.type === "mcq" &&
                  q.options.map((opt, optIndex) => (
                    <div key={optIndex} style={optionRow}>
                      <input
                        placeholder={`Option ${optIndex + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const updated = { ...lab };
                          updated.modules[mIndex].questions[qIndex].options[optIndex] =
                            e.target.value;
                          setLab(updated);
                        }}
                        style={{ ...inputStyle, flex: 1 }}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(mIndex, qIndex, optIndex)}
                        style={iconButtonDangerSmall}
                      >
                        <XCircle size={14} />
                      </button>
                    </div>
                  ))}

                {q.type === "mcq" && (
                  <button
                    type="button"
                    onClick={() => addOption(mIndex, qIndex)}
                    style={iconButtonAdd}
                  >
                    <PlusCircle size={16} /> Add Option
                  </button>
                )}

                <input
                  placeholder="Correct Answer"
                  value={q.answer}
                  onChange={(e) => {
                    const updated = { ...lab };
                    updated.modules[mIndex].questions[qIndex].answer = e.target.value;
                    setLab(updated);
                  }}
                  style={inputStyle}
                  required
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => addQuestion(mIndex)}
              style={iconButtonAdd}
            >
              <PlusCircle size={16} /> Add Question
            </button>
          </div>
        ))}

        <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
          <button type="button" onClick={addModule} style={iconButtonAddLarge}>
            <PlusCircle size={18} /> Add Module
          </button>
          <button type="submit" style={submitButton} disabled={saving}>
            {saving ? (
              "Saving..."
            ) : (
              <>
                <Save size={18} /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLab;

// Styles — same as CreateLab
const pageContainer = {
  background: "#0f1117",
  padding: "40px",
  borderRadius: "14px",
  maxWidth: "950px",
  margin: "0 auto",
  boxShadow: "0 0 25px rgba(0, 255, 90, 0.08)",
};
const heading = {
  color: "#22c55e",
  fontSize: "28px",
  marginBottom: "25px",
  textAlign: "center",
  fontWeight: "700",
};
const labelStyle = { color: "#22c55e", fontWeight: "500", marginTop: "12px" };
const inputStyle = {
  width: "100%",
  marginBottom: "12px",
  padding: "10px",
  background: "#1a1d29",
  color: "#fff",
  border: "1px solid #3dff88",
  borderRadius: "6px",
  outline: "none",
  transition: "0.3s",
};
const textareaStyle = { ...inputStyle, resize: "vertical" };
const moduleStyle = {
  border: "1px solid #222",
  background: "#181b24",
  padding: "18px",
  marginBottom: "24px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,255,90,0.05)",
};
const moduleHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
};
const moduleTitle = { color: "#39ff88", fontSize: "18px" };
const questionBox = {
  background: "#212432",
  padding: "14px",
  borderRadius: "8px",
  marginBottom: "12px",
  position: "relative",
  boxShadow: "0 0 6px rgba(0,255,90,0.04)",
};
const questionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
};
const questionTitle = { color: "#3dff88", fontSize: "15px", fontWeight: "600" };
const optionRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "6px",
};
const iconButtonAdd = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  background: "#22c55e",
  color: "#000",
  border: "none",
  borderRadius: "6px",
  padding: "8px 14px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "0.3s",
  marginBottom: "10px",
};
const iconButtonAddLarge = {
  ...iconButtonAdd,
  fontSize: "15px",
  padding: "10px 16px",
};
const iconButtonDanger = {
  background: "transparent",
  color: "#ff4c4c",
  border: "none",
  cursor: "pointer",
  transition: "0.3s",
};
const iconButtonDangerSmall = {
  ...iconButtonDanger,
  padding: "4px",
  borderRadius: "4px",
  background: "#2a2a2a",
};
const submitButton = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  background: "#22c55e",
  color: "#000",
  fontWeight: "700",
  border: "none",
  borderRadius: "6px",
  padding: "10px 18px",
  cursor: "pointer",
  transition: "0.3s",
};
