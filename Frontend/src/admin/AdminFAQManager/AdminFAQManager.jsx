
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { Trash2, Send } from "lucide-react";

const AdminFAQManager = () => {
const { token } = useContext(AuthContext);
const [questions, setQuestions] = useState([]);
const [replies, setReplies] = useState({});

// 


const fetchQuestions = async () => {
try {
const res = await axios.get("http://localhost:5000/api/faq/admin/all", {
headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
setQuestions(res.data);
} catch (err) {
console.error(err);
alert("Error loading FAQs");
}
};

useEffect(() => {
fetchQuestions();
}, []);

const handleReplyChange = (id, text) => {
setReplies({ ...replies, [id]: text });
};

const handleReply = async (id) => {
const reply = replies[id];
if (!reply?.trim()) return alert("Reply cannot be empty");

try {
await axios.post(
`http://localhost:5000/api/faq/admin/reply/${id}`,
{ reply },
{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
);
setReplies({ ...replies, [id]: "" });
fetchQuestions();
} catch (err) {
console.error(err);
alert("Failed to send reply");
}
};

const handleDelete = async (id) => {
if (!window.confirm("Delete this question?")) return;

try {
await axios.post(
`http://localhost:5000/api/faq/admin/delete/${id}`,
{},
{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
);
fetchQuestions();
} catch (err) {
console.error(err);
alert("Error deleting question");
}
};

return (
<>
<div
className="faq-container"
style={{
backgroundColor: "#000",
minHeight: "100vh",
paddingTop: "100px", // ✅ Adjusted for header height
paddingLeft: "120px",
paddingRight: "120px",
paddingBottom: "50px",
fontFamily: "'Poppins', sans-serif",
color: "white",
transition: "all 0.3s ease",
}}
>
<h1
style={{
textAlign: "center",
color: "#22c55e",
fontSize: "32px",
marginBottom: "40px",
fontWeight: "700",
}}
>
USER QUESTIONS
</h1>

{questions.length === 0 ? (
<p style={{ textAlign: "center", fontSize: "18px" }}>No questions yet.</p>
) : (
questions.map((q) => (
<div
key={q.id}
className="faq-box"
style={{
border: "1px solid #22c55e",
padding: "20px",
borderRadius: "10px",
marginBottom: "25px",
background: "#0a0a0a",
boxShadow: "0 0 8px rgba(34,197,94,0.2)",
}}
>
<div style={{ marginBottom: "10px" }}>
<p style={{ fontSize: "14px" }}>
<strong style={{ color: "#22c55e" }}>EMAIL:</strong>
<span style={{ textTransform: "none" }}> {q.email}</span>
</p>
<p style={{ fontSize: "16px", fontWeight: "bold" }}>
<strong style={{ color: "#22c55e" }}>QUESTION:</strong>
<span style={{ textTransform: "none" }}> {q.question}</span>
</p>
</div>

{/* Status Badge */}
<span
style={{
padding: "4px 10px",
borderRadius: "6px",
fontSize: "12px",
fontWeight: "bold",
backgroundColor: q.status === "pending" ? "#fbbf24" : "#22c55e",
color: "#000",
marginBottom: "10px",
display: "inline-block",
}}
>
{q.status.toUpperCase()}
</span>

{/* Reply Display */}
{q.reply && (
<p
style={{
color: "#22c55e",
marginTop: "8px",
fontSize: "14px",
}}
>
<strong>REPLY:</strong> {q.reply}
</p>
)}1 

{/* Reply Input */}
{q.status === "pending" && (
<div style={{ marginTop: "15px" }}>
<textarea
placeholder="Type reply..."
value={replies[q.id] || ""}
onChange={(e) => handleReplyChange(q.id, e.target.value)}
style={{
width: "100%",
height: "80px",
padding: "12px",
borderRadius: "6px",
background: "#111",
border: "1px solid #22c55e",
color: "white",
marginBottom: "10px",
resize: "none",
}}
/>

<button
onClick={() => handleReply(q.id)}
style={{
background: "#22c55e",
padding: "10px 18px",
borderRadius: "6px",
cursor: "pointer",
fontWeight: "bold",
display: "flex",
alignItems: "center",
gap: "6px",
border: "none",
}}
>
<Send size={16} /> Send Reply
</button>
</div>
)}

{/* Delete Button */}
<button
onClick={() => handleDelete(q.id)}
style={{
background: "#ff4444",
padding: "10px 14px",
borderRadius: "6px",
cursor: "pointer",
fontWeight: "bold",
display: "flex",
alignItems: "center",
gap: "6px",
marginTop: "12px",
border: "none",
}}
>
<Trash2 size={16} /> Delete
</button>
</div>
))
)}

{/* ✅ Responsive Styles */}
<style>{`
@media (max-width: 1200px) {
.faq-container {
padding-left: 80px !important;
padding-right: 80px !important;
}
}

@media (max-width: 992px) {
.faq-container {
padding-left: 60px !important;
padding-right: 60px !important;
padding-top: 90px !important;
}

.faq-box {
padding: 18px !important;
}

h1 {
font-size: 26px !important;
margin-bottom: 30px !important;
}

p {
font-size: 13px !important;
}
}

@media (max-width: 768px) {
.faq-container {
padding-left: 25px !important;
padding-right: 25px !important;
padding-top: 85px !important;
}

.faq-box {
padding: 15px !important;
}

h1 {
font-size: 22px !important;
margin-bottom: 25px !important;
}

button {
font-size: 13px !important;
padding: 8px 12px !important;
}

textarea {
font-size: 13px !important;
height: 70px !important;
}
}

@media (max-width: 480px) {
.faq-container {
padding-left: 15px !important;
padding-right: 15px !important;
padding-top: 80px !important;
}

h1 {
font-size: 18px !important;
}

.faq-box {
padding: 12px !important;
}

p {
font-size: 12px !important;
}

button {
font-size: 12px !important;
padding: 7px 10px !important;
}

textarea {
font-size: 12px !important;
padding: 8px !important;
}
}
`}</style>
</div>
</>
);
};

export default AdminFAQManager;