
import React, { useEffect, useState } from "react";	
import { io } from "socket.io-client";	
import axios from "axios";	
import { User, Mail, CheckCircle, XCircle, AlertTriangle } from "lucide-react";	
import { toast } from "react-toastify";	
	
const socket = io("http://localhost:5000");	
	
const AdminContactQueries = () => {	
const [queries, setQueries] = useState([]);	
	
// Fetch existing queries on mount	
useEffect(() => {	
const fetchQueries = async () => {	
try {	
const res = await axios.get("http://localhost:5000/api/contact");	
setQueries(res.data.reverse());	
	
toast.success("Queries loaded successfully.", {	
icon: <CheckCircle size={18} color="#22c55e" />,	
});	
	
} catch (err) {	
toast.error("Failed to load contact queries.", {	
icon: <XCircle size={18} color="#ef4444" />,	
});	
console.error("Error fetching queries:", err);	
}	
};	
fetchQueries();	
}, []);	
	
// Real-time new messages	
useEffect(() => {	
socket.on("newContactMessage", (newMsg) => {	
setQueries((prev) => [newMsg, ...prev]);	
	
toast.info("New user query received!", {	
icon: <AlertTriangle size={18} color="#eab308" />,	
});	
});	
	
return () => socket.off("newContactMessage");	
}, []);	
	
return (	
<div style={{ color: "white" }}>	
<h1	
style={{
textAlign: "center",
color: "#22c55e",
fontSize: "32px",
marginBottom: "40px",
fontWeight: "700",
}}	
>	
User Queries (Live)	
</h1>	

{queries.length === 0 ? (
  <div
    style={{
      textAlign: "center",
      marginTop: "120px",
      color: "#6b7280",
      fontSize: "20px",
      fontWeight: "500",
      letterSpacing: "1px",
    }}
  >
    No user queries yet.
  </div>
) : (

<div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>	
{queries.map((q) => (	
<div	
key={q.id}	
style={{	
background: "#1f1f23",	
padding: "15px",	
borderRadius: "8px",	
border: "1px solid #333",	
}}	
>	
<div	
style={{	
display: "flex",	
alignItems: "center",	
gap: "8px",	
color: "#22c55e",	
}}	
>	
<User size={16} />	
<span>{q.name}</span>	
</div>	
	
<div	
style={{	
display: "flex",	
alignItems: "center",	
gap: "8px",	
color: "#9ca3af",	
marginTop: "2px",	
}}	
>	
<Mail size={16} />	
<span>{q.email}</span>	
</div>	
	
<p style={{ marginTop: "10px", color: "#f3f4f6" }}>{q.message}</p>	
	
<p	
style={{	
fontSize: "13px",	
color: "#6b7280",	
marginTop: "5px",	
}}	
>	
{new Date(q.createdAt).toLocaleString()}	
</p>	
</div>	
))}	
</div>	
)}	
</div>	
);	
};	
	
export default AdminContactQueries;	