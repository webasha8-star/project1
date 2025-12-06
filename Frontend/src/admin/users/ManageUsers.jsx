import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

const ManageUsers = () => {
const [users, setUsers] = useState([]);
const { token } = useContext(AuthContext);

useEffect(() => {
const fetchUsers = async () => {
try {
const res = await axios.get("http://localhost:5000/api/users/admin/users", {
headers: { Authorization: `Bearer ${token}` },
});
setUsers(res.data);
} catch (err) {
console.error("Error fetching users:", err);
}
};
fetchUsers();
}, [token]);

const styles = {
container: {
background: "#1b1b1f",
padding: "24px",
borderRadius: "12px",
fontFamily: "Poppins, sans-serif",
color: "#fff",
overflowX: "auto",
},
title: {
color: "#22c55e",
textAlign: "center",
marginBottom: "20px",
fontWeight: 700,
fontSize: "1.8rem",
},
table: {
width: "100%",
borderCollapse: "collapse",
minWidth: "700px",
},
th: {
textAlign: "center",
padding: "12px",
borderBottom: "2px solid #22c55e",
color: "#22c55e",
fontSize: "0.95rem",
},
td: {
textAlign: "center",
padding: "10px",
borderBottom: "1px solid #333",
fontSize: "0.9rem",
color: "#ddd",
},
};

return (
<div style={styles.container}>
<h2 style={styles.title}>Manage Users</h2>

<table style={styles.table}>
<thead>
<tr>
<th style={styles.th}>ID</th>
<th style={styles.th}>Username</th>
<th style={styles.th}>Email</th>
<th style={styles.th}>Role</th>
<th style={styles.th} className="hide-mobile">
Joined
</th>
</tr>
</thead>
<tbody>
{users.length > 0 ? (
users.map((u) => (
<tr key={u.id}>
<td style={styles.td}>{u.id}</td>
<td style={{ ...styles.td, textTransform: "capitalize" }}>{u.username}</td>
<td style={styles.td}>{u.email}</td>
<td
style={{
...styles.td,
color: u.role === "admin" ? "#22c55e" : "#aaa",
fontWeight: u.role === "admin" ? "600" : "400",
}}
>
{u.role}
</td>
<td style={{ ...styles.td }} className="hide-mobile">
{new Date(u.createdAt).toLocaleDateString()}
</td>
</tr>
))
) : (
<tr>
<td style={styles.td} colSpan="5">
No users found
</td>
</tr>
)}
</tbody>
</table>

{/* Responsive CSS */}
<style>{`
@media (max-width: 768px) {
.hide-mobile {
display: none !important;
}
th, td {
font-size: 0.85rem !important;
padding: 8px !important;
}
table {
min-width: 100% !important;
}
}
`}</style>
</div>
);
};

export default ManageUsers;