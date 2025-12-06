
import React, { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:5000");

const ContactUs = () => {
const [form, setForm] = useState({ name: "", email: "", message: "" });
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);

try {
const res = await axios.post("http://localhost:5000/api/contact", form);
socket.emit("contactMessageSent", res.data);

toast.success("Message sent successfully!", {
position: "top-center",
autoClose: 2500,
theme: "dark",
});

setForm({ name: "", email: "", message: "" });
} catch (err) {
console.error("Error sending contact message:", err);
toast.error("Failed to send message. Please try again.", {
position: "top-center",
autoClose: 3000,
theme: "dark",
});
} finally {
setLoading(false);
}
};

return (
<>
<Header />
<ToastContainer />

<div
style={{
minHeight: "calc(100vh - 200px)",
background: "#0f1117",
display: "flex",
justifyContent: "center",
alignItems: "flex-start",
padding: "120px 20px 80px",
fontFamily: "Poppins, sans-serif",
}}
>
<div
style={{
background: "#111827",
borderRadius: "18px",
width: "100%",
maxWidth: "1000px",
display: "flex",
flexWrap: "wrap",
boxShadow: "0 0 30px rgba(34,197,94,0.08)",
overflow: "hidden",
border: "1px solid #1f2937",
}}
>
{/* Left Section */}
<div
style={{
flex: "1 1 45%",
position: "relative",
background:
"linear-gradient(135deg, #0f172a 0%, #065f46 60%, #16a34a 100%)",
color: "white",
padding: "60px 40px",
display: "flex",
flexDirection: "column",
justifyContent: "center",
overflow: "hidden",
}}
>
{/* Animated Overlay */}
<div
style={{
position: "absolute",
top: 0,
left: 0,
width: "100%",
height: "100%",
background:
"radial-gradient(circle at top left, rgba(57,255,20,0.25), transparent 60%)",
animation: "pulse 6s infinite alternate",
zIndex: 0,
}}
/>

<div style={{ position: "relative", zIndex: 1 }}>
<h1
style={{
fontSize: "38px",
fontWeight: "700",
marginBottom: "16px",
color: "#39FF14",
}}
>
Let’s chat.
</h1>
<p
style={{
fontSize: "16px",
lineHeight: "1.7",
color: "rgba(255,255,255,0.9)",
marginBottom: "24px",
maxWidth: "90%",
}}
>
Have questions, feedback, or need support?
Our team of cybersecurity experts will get back to you soon.
</p>

<div
style={{
height: "4px",
width: "80px",
backgroundColor: "#39FF14",
borderRadius: "2px",
boxShadow: "0 0 12px rgba(57,255,20,0.5)",
}}
></div>
</div>
</div>

{/* Right Section - Contact Form */}
<div
style={{
flex: "1 1 55%",
background: "#1a1f2e",
padding: "60px 50px",
display: "flex",
flexDirection: "column",
justifyContent: "center",
}}
>
<h2
style={{
color: "#39ff14",
fontSize: "24px",
fontWeight: "600",
marginBottom: "20px",
textAlign: "center",
}}
>
Send us a message
</h2>

<form
onSubmit={handleSubmit}
style={{ display: "flex", flexDirection: "column", gap: "20px" }}
>
<InputField
label="Your Name"
name="name"
placeholder="John Doe"
value={form.name}
onChange={handleChange}
/>

<InputField
label="Your Email"
name="email"
type="email"
placeholder="you@example.com"
value={form.email}
onChange={handleChange}
/>

<TextAreaField
label="Message"
name="message"
placeholder="Write your message here..."
value={form.message}
onChange={handleChange}
/>

<button
type="submit"
disabled={loading}
style={{
background: loading ? "#15803d" : "#22c55e",
color: "black",
padding: "14px",
border: "none",
borderRadius: "8px",
fontWeight: "700",
fontSize: "16px",
cursor: "pointer",
marginTop: "10px",
transition: "0.3s",
}}
onMouseEnter={(e) => (e.target.style.background = "#16a34a")}
onMouseLeave={(e) => (e.target.style.background = "#22c55e")}
>
{loading ? "Sending..." : "Send Message"}
</button>
</form>
</div>
</div>
</div>

<Footer />

{/* Subtle animation keyframes */}
<style>
{`
@keyframes pulse {
from { opacity: 0.4; transform: scale(1); }
to { opacity: 0.9; transform: scale(1.05); }
}
`}
</style>
</>
);
};

export default ContactUs;

// Reusable Input Component
const InputField = ({ label, name, type = "text", value, onChange, placeholder }) => (
<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
<label style={{ fontSize: "14px", color: "#d1d5db", fontWeight: 500 }}>
{label}
</label>
<input
type={type}
name={name}
placeholder={placeholder}
value={value}
onChange={onChange}
required
style={{
background: "#0f1623",
border: "1px solid #2dd46f",
borderRadius: "6px",
padding: "12px 14px",
fontSize: "15px",
outline: "none",
color: "white",
transition: "0.3s",
}}
onFocus={(e) => (e.target.style.border = "1px solid #39ff14")}
onBlur={(e) => (e.target.style.border = "1px solid #2dd46f")}
/>
</div>
);

// Reusable TextArea Component
const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
<label style={{ fontSize: "14px", color: "#d1d5db", fontWeight: 500 }}>
{label}
</label>
<textarea
name={name}
placeholder={placeholder}
value={value}
onChange={onChange}
required
style={{
background: "#0f1623",
border: "1px solid #2dd46f",
borderRadius: "6px",
padding: "12px 14px",
fontSize: "15px",
outline: "none",
color: "white",
minHeight: "120px",
resize: "none",
transition: "0.3s",
}}
onFocus={(e) => (e.target.style.border = "1px solid #39ff14")}
onBlur={(e) => (e.target.style.border = "1px solid #2dd46f")}
></textarea>
</div>
);