import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

const AdminSubmissions = () => {
const { token } = useContext(AuthContext);
const [submissions, setSubmissions] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedAnswer, setSelectedAnswer] = useState(null);

useEffect(() => {
const fetchSubmissions = async () => {
if (!token) {
console.error("No token found. Please log in again.");
setLoading(false);
return;
}

try {
const res = await axios.get("http://localhost:5000/api/labs/submissions", {
headers: { Authorization: `Bearer ${token}` },
});

const data = Array.isArray(res.data) ? res.data : res.data.data || [];
setSubmissions(data);
} catch (err) {
console.error("Error fetching submissions:", err.response?.data || err.message);
setSubmissions([]);
} finally {
setLoading(false);
}
};

fetchSubmissions();
}, [token]);

const styles = {
container: {
background: "#0f1115",
color: "white",
minHeight: "100vh",
padding: "30px",
fontFamily: "Poppins, sans-serif",
},
title: {
color: "#22c55e",
fontSize: "2rem",
textAlign: "center",
fontWeight: "bold",
marginBottom: "25px",
},
tableWrapper: {
width: "100%",
overflowX: "auto",
},
table: {
width: "100%",
borderCollapse: "collapse",
background: "#1f2937",
borderRadius: "10px",
overflow: "hidden",
minWidth: "650px",
},
th: {
backgroundColor: "#22c55e20",
color: "#22c55e",
padding: "12px",
textAlign: "center",
borderBottom: "2px solid #22c55e",
fontSize: "0.95rem",
},
td: {
padding: "10px",
textAlign: "center",
borderBottom: "1px solid #333",
fontSize: "0.9rem",
},
button: {
background: "#22c55e",
color: "white",
border: "none",
borderRadius: "6px",
padding: "6px 12px",
cursor: "pointer",
transition: "background 0.3s",
fontWeight: "500",
},
modal: {
position: "fixed",
top: 0,
left: 0,
width: "100vw",
height: "100vh",
backgroundColor: "rgba(0,0,0,0.8)",
display: "flex",
alignItems: "center",
justifyContent: "center",
zIndex: 1000,
},
modalContent: {
background: "#1f2937",
padding: "25px",
borderRadius: "12px",
width: "80%",
maxWidth: "600px",
color: "white",
position: "relative",
boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
},
closeButton: {
position: "absolute",
top: "10px",
right: "15px",
background: "none",
border: "none",
color: "#aaa",
fontSize: "20px",
cursor: "pointer",
},
};

if (loading) {
return (
<div style={{ textAlign: "center", padding: "50px", color: "#aaa" }}>
Loading submissions...
</div>
);
}

return (
<div style={styles.container}>
<h1 style={styles.title}>User Lab Submissions</h1>

<div style={styles.tableWrapper}>
<table style={styles.table}>
<thead>
<tr>
<th style={styles.th}>ID</th>
<th style={styles.th}>Username</th>
<th style={styles.th}>Lab</th>
<th style={styles.th} className="hide-mobile">
Submitted On
</th>
<th style={styles.th}>Status</th>
<th style={styles.th}>Action</th>
</tr>
</thead>
<tbody>
{submissions.length > 0 ? (
submissions.map((sub) => (
<tr key={sub.id}>
<td style={styles.td}>{sub.id}</td>
<td style={styles.td}>{sub.user?.username || "N/A"}</td>
<td style={styles.td}>
{sub.question?.module?.lab?.title || "N/A"}
</td>
<td style={{ ...styles.td }} className="hide-mobile">
{new Date(sub.createdAt).toLocaleString()}
</td>
<td
style={{
...styles.td,
color:
sub.status === "CORRECT"
? "#22c55e"
: sub.status === "WRONG"
? "red"
: "#facc15",
fontWeight: "bold",
}}
>
{sub.status || "PENDING"}
</td>
<td style={styles.td}>
<button
style={styles.button}
onClick={() => setSelectedAnswer(sub)}
>
View
</button>
</td>
</tr>
))
) : (
<tr>
<td style={styles.td} colSpan="6">
No submissions found
</td>
</tr>
)}
</tbody>
</table>
</div>

{selectedAnswer && (
<div style={styles.modal} onClick={() => setSelectedAnswer(null)}>
<div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
<button
style={styles.closeButton}
onClick={() => setSelectedAnswer(null)}
>
✖
</button>
<h2 style={{ color: "#22c55e", marginBottom: "10px" }}>
{selectedAnswer.question?.module?.lab?.title || "Lab"}
</h2>
<p style={{ marginBottom: "10px" }}>
<strong>User:</strong> {selectedAnswer.user?.username || "N/A"}
</p>
<p style={{ marginBottom: "15px" }}>
<strong>Submitted On:</strong>{" "}
{new Date(selectedAnswer.createdAt).toLocaleString()}
</p>
<p style={{ marginBottom: "10px" }}>
<strong>Status:</strong>{" "}
<span
style={{
color:
selectedAnswer.status === "CORRECT"
? "#22c55e"
: selectedAnswer.status === "WRONG"
? "red"
: "#facc15",
}}
>
{selectedAnswer.status}
</span>
</p>
<pre
style={{
background: "#111827",
padding: "15px",
borderRadius: "8px",
color: "#9ca3af",
whiteSpace: "pre-wrap",
wordBreak: "break-word",
}}
>
{selectedAnswer.selected || "No answer provided"}
</pre>
</div>
</div>
)}

{/* Hide column on mobile */}
<style>{`
@media (max-width: 768px) {
.hide-mobile {
display: none;
}
th, td {
font-size: 0.85rem !important;
padding: 8px !important;
}
h1 {
font-size: 1.5rem !important;
}
table {
min-width: 100% !important;
}
}
`}</style>
</div>
);
};

export default AdminSubmissions;
