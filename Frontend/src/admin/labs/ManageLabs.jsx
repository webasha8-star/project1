import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ManageLabs = () => {
  const { token } = useContext(AuthContext);
  const [labs, setLabs] = useState([]);
  const [expandedLab, setExpandedLab] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/labs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLabs(res.data);
    } catch (error) {
      toast.error("Failed to load labs", { className: "center-toast" });
    }
  };

  // SweetAlert2 Delete Confirmation
  const confirmDelete = async (type, id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: `You are about to delete this ${type}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#1b1b1f",
      color: "#fff",
      customClass: {
        popup: "rounded-xl shadow-lg",
        title: "text-lg font-semibold",
      },
    });

    if (result.isConfirmed) {
      try {
        let url = "";
        if (type === "lab") url = `/api/labs/${id}`;
        if (type === "module") url = `/api/labs/modules/${id}`;
        if (type === "question") url = `/api/labs/questions/${id}`;

        await axios.delete(`http://localhost:5000${url}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success(`${type} deleted successfully`, {
          className: "center-toast",
        });
        fetchLabs();
      } catch {
        toast.error("Failed to delete — check admin authorization.", {
          className: "center-toast",
        });
      }
    }
  };

  return (
    <div
      style={{
        background: "#1b1b1f",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      {/* Toastify Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        theme="dark"
        transition={Slide}
        className="Toastify__toast-container--center"
        toastClassName="Toastify__toast--animated"
      />

      <div style={{ textAlign: "right", marginBottom: "15px" }}>
        <button onClick={() => navigate("/admin/labs/create")} style={createBtn}>
          Create New Lab
        </button>
      </div>

      <h2 style={{ color: "#22c55e", textAlign: "center" }}>Manage Labs</h2>

      {labs.length === 0 ? (
        <p style={{ textAlign: "center", color: "#aaa" }}>No labs found.</p>
      ) : (
        labs.map((lab) => (
          <div key={lab.id} style={labBox}>
            <div
              onClick={() =>
                setExpandedLab(expandedLab === lab.id ? null : lab.id)
              }
              style={labHeader}
            >
              <h3 style={{ color: "#22c55e" }}>{lab.title}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  confirmDelete("lab", lab.id);
                }}
                style={deleteBtn}
              >
                Delete Lab
              </button>
            </div>

            {expandedLab === lab.id && (
              <div style={{ marginTop: "10px" }}>
                <p style={{ color: "#ccc" }}>{lab.summary}</p>
                {lab.modules.map((mod) => (
                  <div key={mod.id} style={moduleBox}>
                    <div
                      onClick={() =>
                        setExpandedModule(
                          expandedModule === mod.id ? null : mod.id
                        )
                      }
                      style={moduleHeader}
                    >
                      <h4 style={{ color: "#39FF14" }}>📘 {mod.title}</h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDelete("module", mod.id);
                        }}
                        style={deleteBtn}
                      >
                        Delete Module
                      </button>
                    </div>

                    {expandedModule === mod.id && (
                      <div style={{ marginTop: "10px" }}>
                        {mod.questions.map((q) => (
                          <div key={q.id} style={questionBox}>
                            <p style={{ color: "#fff" }}>
                              <strong>Q:</strong> {q.text}
                            </p>
                            <ul>
                              {Array.isArray(q.options) &&
                                q.options.map((opt, i) => (
                                  <li key={i} style={{ color: "#aaa" }}>
                                    {opt}
                                  </li>
                                ))}
                            </ul>
                            <p style={{ color: "#22c55e" }}>
                              Correct: {q.answer}
                            </p>
                            <button
                              onClick={() => confirmDelete("question", q.id)}
                              style={questionDeleteBtn}
                            >
                              Delete Question
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ManageLabs;

// Styles
const createBtn = {
  background: "#22c55e",
  color: "#000",
  border: "none",
  borderRadius: "6px",
  padding: "10px 18px",
  cursor: "pointer",
  fontWeight: "600",
};
const deleteBtn = {
  background: "#ff3b3b",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "6px 12px",
  cursor: "pointer",
  fontWeight: "600",
};
const labBox = {
  border: "1px solid #333",
  borderRadius: "8px",
  marginBottom: "20px",
  padding: "15px",
  background: "#181c2a",
};
const labHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
};
const moduleBox = {
  border: "1px solid #333",
  borderRadius: "8px",
  marginTop: "10px",
  padding: "10px",
  background: "#0f0f10",
};
const moduleHeader = {
  display: "flex",
  justifyContent: "space-between",
  cursor: "pointer",
};
const questionBox = {
  borderBottom: "1px solid #333",
  padding: "8px 0",
  position: "relative",
};
const questionDeleteBtn = {
  position: "absolute",
  right: 0,
  top: "5px",
  fontSize: "12px",
  background: "#ff3b3b",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  padding: "4px 8px",
  cursor: "pointer",
};
