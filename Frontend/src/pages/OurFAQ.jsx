import React, { useState, useMemo } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const FAQSection = () => {
const [activeIndex, setActiveIndex] = useState(null);
const [questionInput, setQuestionInput] = useState("");
const [emailInput, setEmailInput] = useState("");
const [errors, setErrors] = useState({ email: "", question: "" });
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitted, setSubmitted] = useState(false);

const greenColor = "#00b33c";
const hoverColor = "#0d0d0d";
const errorColor = "#ff4d4d";

const faqs = useMemo(
() => [
{
question: "What is CrackMeNow?",
answer:
"CrackMeNow is a cyber learning platform where you can sharpen your hacking skills through labs and challenges.",
},
{
question: "Is this platform free to use?",
answer:
"Yes! You can join for free and access beginner-friendly content. Some premium labs may require a subscription.",
},
{
question: "Do I need technical experience to start?",
answer:
"No prior experience is needed. Our beginner tracks guide you from the basics to advanced concepts.",
},
{
question: "How do I track my progress?",
answer:
"Your dashboard automatically updates as you complete labs and challenges.",
},
{
question: "What certifications can I prepare for?",
answer:
"We offer content for OSCP, CEH, and other cybersecurity certifications.",
},
],
[]
);

const toggle = (index) => setActiveIndex(activeIndex === index ? null : index);

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handleSubmit = async () => {
const newErrors = { email: "", question: "" };
let hasError = false;

if (!emailInput.trim()) {
newErrors.email = "Email is required.";
hasError = true;
} else if (!validateEmail(emailInput)) {
newErrors.email = "Enter a valid email address.";
hasError = true;
}

if (!questionInput.trim()) {
newErrors.question = "Question is required.";
hasError = true;
}

setErrors(newErrors);
if (hasError) return;

setIsSubmitting(true);
try {
await axios.post("http://localhost:5000/api/faq/submit", {
email: emailInput,
question: questionInput,
});

setSubmitted(true);
setEmailInput("");
setQuestionInput("");
setTimeout(() => setSubmitted(false), 3000);
} catch (err) {
console.error("FAQ Submit Error", err);
alert("Something went wrong while submitting your question.");
} finally {
setIsSubmitting(false);
}
};

const isMobile = window.innerWidth <= 768;

return (
<Layout>
<div
style={{
backgroundColor: "#000",
color: "#fff",
minHeight: "100vh",
padding: isMobile ? "20px" : "60px 20px",
fontFamily: "'Roboto Mono', Arial, sans-serif",
paddingTop: "140px",
}}
>
<h2
style={{
color: greenColor,
fontSize: isMobile ? "26px" : "36px",
textAlign: "center",
marginBottom: "40px",
fontWeight: 700,
letterSpacing: "1px",
}}
>
FREQUENTLY ASKED QUESTIONS (FAQs)
</h2>

{/* Static FAQs */}
<div style={{ maxWidth: isMobile ? "95%" : "60%", margin: "0 auto" }}>
{faqs.map((faq, index) => (
<div key={index} style={{ marginBottom: "22px" }}>
<button
onClick={() => toggle(index)}
style={{
backgroundColor: "#111",
color: "#fff",
borderRadius: "8px",
border: `1px solid ${greenColor}`,
padding: isMobile ? "12px 16px" : "16px 24px",
width: "100%",
fontWeight: "bold",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
transition: "background-color 0.3s ease",
cursor: "pointer",
}}
onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#111")}
>
<span>{faq.question}</span>
<span style={{ color: greenColor, fontSize: "18px" }}>
{activeIndex === index ? "▲" : "▼"}
</span>
</button>

{activeIndex === index && (
<div
style={{
backgroundColor: "#0a0a0a",
border: `1px solid ${greenColor}`,
borderTop: "none",
padding: "16px",
borderRadius: "0 0 8px 8px",
color: "#e0e0e0",
fontSize: "15px",
lineHeight: "1.6",
}}
>
{faq.answer}
</div>
)}
</div>
))}
</div>

{/* Ask Question Form */}
<div
style={{
marginTop: "60px",
textAlign: "center",
width: isMobile ? "90%" : "600px",
margin: "60px auto 0",
}}
>
<h3 style={{ color: greenColor, marginBottom: "20px" }}>
Didn’t find your question? Ask us!
</h3>

{/* Email */}
<label
style={{
color: "#fff",
fontSize: "14px",
display: "block",
textAlign: "left",
marginBottom: "4px",
}}
>
Email Address
</label>
<input
type="email"
value={emailInput}
onChange={(e) => setEmailInput(e.target.value)}
style={{
width: "100%",
padding: "10px",
marginBottom: errors.email ? "4px" : "14px",
border: `1px solid ${errors.email ? errorColor : greenColor}`,
borderRadius: "8px",
backgroundColor: "#111",
color: "#fff",
}}
placeholder="Your email address"
/>
{errors.email && (
<div style={{ color: errorColor, fontSize: "12px", textAlign: "left" }}>
{errors.email}
</div>
)}

{/* Question */}
<label
style={{
color: "#fff",
fontSize: "14px",
display: "block",
textAlign: "left",
marginTop: "12px",
marginBottom: "4px",
}}
>
Your Question
</label>
<textarea
value={questionInput}
onChange={(e) => setQuestionInput(e.target.value)}
style={{
width: "100%",
height: "100px",
padding: "10px",
border: `1px solid ${errors.question ? errorColor : greenColor}`,
borderRadius: "8px",
backgroundColor: "#111",
color: "#fff",
marginBottom: errors.question ? "4px" : "12px",
}}
placeholder="Type your question here..."
/>
{errors.question && (
<div style={{ color: errorColor, fontSize: "12px", textAlign: "left" }}>
{errors.question}
</div>
)}

{/* Submit Button */}
<button
onClick={handleSubmit}
disabled={isSubmitting}
style={{
marginTop: "12px",
padding: "12px 24px",
backgroundColor: isSubmitting ? "#666" : greenColor,
color: "#000",
borderRadius: "6px",
fontWeight: "bold",
border: "none",
cursor: isSubmitting ? "not-allowed" : "pointer",
width: "100%",
transition: "0.3s ease",
}}
>
{isSubmitting ? "Submitting..." : "Submit Question"}
</button>

{submitted && (
<div
style={{
marginTop: "16px",
color: greenColor,
fontWeight: "bold",
fontSize: "14px",
}}
>
Thank you! Your question has been submitted.
</div>
)}
</div>
</div>
</Layout>
);
};

export default FAQSection;
