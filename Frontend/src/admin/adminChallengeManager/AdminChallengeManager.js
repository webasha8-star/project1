import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

// Define base URL once (change port if needed)
const API_BASE_URL = "http://localhost:5000/api/challenges";

const AdminChallengeManager = () => {
    const [challenges, setChallenges] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        level: "easy",
        img: "",
    });
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token"); // assuming you store JWT in localStorage

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    // Fetch challenges
    const fetchChallenges = async () => {
        try {
            const { data } = await axios.get(API_BASE_URL);
            setChallenges(data);
        } catch (error) {
            console.error("Error fetching challenges", error);
        }
    };

    useEffect(() => {
        fetchChallenges();
    }, []);

    // Handle form submit (create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editId) {
                await axios.put(`${API_BASE_URL}/${editId}`, formData, axiosConfig);
                alert("Challenge updated!");
            } else {
                await axios.post(API_BASE_URL, formData, axiosConfig);
                alert("Challenge created!");
            }
            setFormData({ title: "", desc: "", level: "easy", img: "" });
            setEditId(null);
            fetchChallenges();
        } catch (error) {
            alert("Failed to save challenge. Check console.");
            console.error(error);
        }
        setLoading(false);
    };

    // Handle edit
    const handleEdit = (challenge) => {
        setEditId(challenge.id);
        setFormData({
            title: challenge.title,
            desc: challenge.desc,
            level: challenge.level,
            img: challenge.img || "",
        });
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this challenge?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/${id}`, axiosConfig);
            alert("Challenge deleted!");
            fetchChallenges();
        } catch (error) {
            alert("Failed to delete challenge.");
            console.error(error);
        }
    };
    return (
        <Layout>
            <div
                style={{
                    padding: "7rem 2rem 4rem", // ⬅ Added 7rem top padding to push below navbar
                    color: "white",
                    minHeight: "100vh",
                    backgroundColor: "#0a0a0a",
                }}
            >
                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "900",
                        marginBottom: "2rem",
                        textAlign: "center",
                        letterSpacing: "1px",
                    }}
                >
                    ADMIN — MANAGE UPCOMING CHALLENGES
                </h1>

                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        backgroundColor: "#111",
                        padding: "2.5rem",
                        borderRadius: "16px",
                        maxWidth: "850px", // ⬅ widened from 700px → 850px
                        margin: "0 auto",
                        boxShadow: "0 0 25px rgba(0,255,100,0.1)",
                        width: "90%", // ⬅ makes it responsive (fills up on big screens)
                    }}
                >
                    <input
                        type="text"
                        placeholder="Challenge Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        style={{
                            padding: "1rem",
                            borderRadius: "8px",
                            border: "1px solid #333",
                            outline: "none",
                            color: "white",
                            backgroundColor: "#1a1a1a",
                            fontSize: "1rem",
                            width: "100%", // ⬅ makes input take full form width
                            transition: "box-shadow 0.3s ease",
                        }}
                        onFocus={(e) =>
                            (e.target.style.boxShadow = "0 0 10px rgba(34,197,94,0.5)")
                        }
                        onBlur={(e) => (e.target.style.boxShadow = "none")}
                    />

                    <textarea
                        placeholder="Description"
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        required
                        style={{
                            padding: "1rem",
                            borderRadius: "8px",
                            border: "1px solid #333",
                            outline: "none",
                            color: "white",
                            backgroundColor: "#1a1a1a",
                            resize: "none",
                            height: "120px",
                            fontSize: "1rem",
                            width: "100%",
                            transition: "box-shadow 0.3s ease",
                        }}
                        onFocus={(e) =>
                            (e.target.style.boxShadow = "0 0 10px rgba(34,197,94,0.5)")
                        }
                        onBlur={(e) => (e.target.style.boxShadow = "none")}
                    />

                    <select
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        style={{
                            padding: "1rem",
                            borderRadius: "8px",
                            border: "1px solid #333",
                            outline: "none",
                            color: "white",
                            backgroundColor: "#1a1a1a",
                            fontSize: "1rem",
                            width: "100%",
                            transition: "box-shadow 0.3s ease",
                        }}
                        onFocus={(e) =>
                            (e.target.style.boxShadow = "0 0 10px rgba(34,197,94,0.5)")
                        }
                        onBlur={(e) => (e.target.style.boxShadow = "none")}
                    >
                        <option value="easy">Easy</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="hard">Hard</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Image URL"
                        value={formData.img}
                        onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                        style={{
                            padding: "1rem",
                            borderRadius: "8px",
                            border: "1px solid #333",
                            outline: "none",
                            color: "white",
                            backgroundColor: "#1a1a1a",
                            fontSize: "1rem",
                            width: "100%",
                            transition: "box-shadow 0.3s ease",
                        }}
                        onFocus={(e) =>
                            (e.target.style.boxShadow = "0 0 10px rgba(34,197,94,0.5)")
                        }
                        onBlur={(e) => (e.target.style.boxShadow = "none")}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: "1.1rem",
                            borderRadius: "8px",
                            backgroundColor: "#22c55e",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer",
                            border: "none",
                            fontSize: "1rem",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#16a34a")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#22c55e")}
                    >
                        {editId ? "Update Challenge" : "Add Challenge"}
                    </button>
                </form>


                {/* Challenge List */}
                <div style={{ marginTop: "4rem" }}>
                    <h2
                        style={{
                            marginBottom: "1.5rem",
                            textAlign: "center",
                            fontSize: "2rem",
                            fontWeight: "800",
                            letterSpacing: "1px",
                        }}
                    >
                        EXISTING CHALLENGES
                    </h2>

                    {challenges.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#9ca3af" }}>
                            No challenges found.
                        </p>
                    ) : (
                        challenges.map((challenge) => (
                            <div
                                key={challenge.id}
                                style={{
                                    backgroundColor: "#111",
                                    padding: "1.5rem",
                                    margin: "1rem auto",
                                    borderRadius: "12px",
                                    maxWidth: "800px",
                                    boxShadow: "0 0 10px rgba(0,255,100,0.15)",
                                }}
                            >
                                <h3 style={{ color: "#22c55e", fontWeight: "700" }}>
                                    {challenge.title}
                                </h3>
                                <p style={{ color: "#9ca3af", marginBottom: "0.5rem" }}>
                                    {challenge.desc}
                                </p>
                                <p>
                                    <strong style={{ color: "#22c55e" }}>Level:</strong>{" "}
                                    {challenge.level}
                                </p>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "1rem",
                                        marginTop: "1rem",
                                        justifyContent: "center",
                                    }}
                                >
                                    <button
                                        onClick={() => handleEdit(challenge)}
                                        style={{
                                            backgroundColor: "#3b82f6",
                                            border: "none",
                                            padding: "0.6rem 1.2rem",
                                            borderRadius: "8px",
                                            color: "white",
                                            cursor: "pointer",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(challenge.id)}
                                        style={{
                                            backgroundColor: "#ef4444",
                                            border: "none",
                                            padding: "0.6rem 1.2rem",
                                            borderRadius: "8px",
                                            color: "white",
                                            cursor: "pointer",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AdminChallengeManager;