import React from "react";
import Layout from "../components/Layout";
import {
FaGlobe,
FaSearch,
FaBug,
FaShieldAlt,
FaNetworkWired,
FaUsers,
FaFileAlt,
FaCamera,
FaChartPie,
FaKeyboard,
FaFlask,
FaLock,
FaKey,
FaProjectDiagram,
FaEnvelopeOpenText,
FaLaptopCode,
FaBook,
} from "react-icons/fa";
import { HiDatabase } from "react-icons/hi";
import { MdSecurity } from "react-icons/md";
import { AiOutlineTrophy } from "react-icons/ai";

const stages = [
{
title: "Stage 1: Foundations",
desc: "Learn reconnaissance and information gathering essentials.",
icons: [
{ icon: <FaGlobe />, text: "Information Gathering" },
{ icon: <FaSearch />, text: "Passive Recon" },
{ icon: <FaNetworkWired />, text: "Active Recon" },
],
},
{
title: "Stage 2: Vulnerability Discovery",
desc: "Identify system weaknesses using manual and automated tools.",
icons: [
{ icon: <FaBug />, text: "Manual Vuln Analysis" },
{ icon: <HiDatabase />, text: "Automated Tools" },
],
},
{
title: "Stage 3: Exploitation",
desc: "Exploit vulnerabilities to gain access and understand attack vectors.",
icons: [
{ icon: <FaKeyboard />, text: "Web Exploitation" },
{ icon: <FaLock />, text: "Buffer Overflow" },
{ icon: <FaShieldAlt />, text: "Privilege Escalation" },
],
},
{
title: "Stage 4: Post-Exploitation",
desc: "Learn persistence and lateral movement across compromised networks.",
icons: [
{ icon: <FaKey />, text: "Credential Dumping" },
{ icon: <FaProjectDiagram />, text: "Pivoting" },
],
},
{
title: "Stage 5: Social Engineering & Phishing",
desc: "Master human-targeted attacks and awareness.",
icons: [
{ icon: <FaEnvelopeOpenText />, text: "Phishing Simulation" },
{ icon: <FaUsers />, text: "Social Engineering" },
],
},
{
title: "Stage 6: Reporting & Real-World Practice",
desc: "Develop professional-grade reporting and tackle red team challenges.",
icons: [
{ icon: <FaFileAlt />, text: "Reporting" },
{ icon: <AiOutlineTrophy />, text: "CTF Practice" },
],
},
{
title: "Stage 7: Active Directory & Red Teaming",
desc: "Dive deep into AD environments, lateral movement, and red team simulation.",
icons: [
{ icon: <MdSecurity />, text: "AD Enumeration" },
{ icon: <FaLaptopCode />, text: "Red Team Ops" },
],
},
{
title: "Stage 8: Client-Side Attacks",
desc: "Understand browser, payload, and user-targeted attacks.",
icons: [
{ icon: <FaCamera />, text: "Browser Exploits" },
{ icon: <FaFlask />, text: "Payload Crafting" },
],
},
{
title: "Stage 9: Continuous Learning",
desc: "Stay updated with evolving threats and techniques.",
icons: [
{ icon: <FaBook />, text: "Knowledge Expansion" },
{ icon: <FaChartPie />, text: "Performance Review" },
],
},
];

const TrainingPath = () => {
return (
<Layout>
<main style={{ paddingTop: "130px", fontFamily: "'Poppins', sans-serif" }}>
<div style={{ background: "#0B0E13", minHeight: "100vh", padding: "40px 0" }}>
<div style={{ textAlign: "center", marginBottom: "40px" }}>
<h1
style={{
color: "#38bdf8",
fontSize: "2.2rem",
fontWeight: "800",
marginBottom: "10px",
letterSpacing: "2px",
}}
>
STRUCTURED OSCP-STYLE TRAINING PATH
</h1>
<p
style={{
color: "#9ca3af",
maxWidth: "700px",
margin: "0 auto",
fontSize: "1rem",
}}
>
Follow this roadmap to progress through each phase of your OSCP preparation —
from reconnaissance to real-world red teaming mastery.
</p>
</div>

<div className="timeline-container">
{stages.map((stage, index) => (
<div
key={index}
className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
>
<div className="content">
<h2>{stage.title}</h2>
<p>{stage.desc}</p>
<div className="icons">
{stage.icons.map((i, n) => (
<div key={n} className="icon-badge">
<span className="icon">{i.icon}</span>
<span className="text">{i.text}</span>
</div>
))}
</div>
</div>
</div>
))}
<div className="timeline-line"></div>
</div>
</div>

<style>{`
.timeline-container {
position: relative;
max-width: 1200px;
margin: 0 auto;
padding: 20px;
}

/* Desktop Timeline Line */
.timeline-line {
position: absolute;
width: 2px;
background-color: #1f2937;
top: 0;
bottom: 0;
left: 50%;
transform: translateX(-50%);
}

.timeline-item {
padding: 20px 0;
position: relative;
width: 50%;
}

.timeline-item.left {
left: 0;
text-align: right;
}

.timeline-item.right {
left: 50%;
}

.timeline-item .content {
background-color: #111827;
border: 1px solid #1f2937;
color: #e5e7eb;
border-radius: 12px;
padding: 20px;
position: relative;
width: 95%;
}

.timeline-item.left .content {
margin-left: auto;
margin-right: 10px;
}

.timeline-item.right .content {
margin-left: 10px;
}

.timeline-item h2 {
color: #38bdf8;
font-size: 1.2rem;
margin-bottom: 8px;
font-weight: 700;
}

.timeline-item p {
color: #9ca3af;
margin-bottom: 12px;
font-size: 0.95rem;
line-height: 1.5;
}

.icons {
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
gap: 8px;
}

.icon-badge {
display: flex;
align-items: center;
gap: 6px;
background: #1e293b;
border: 1px solid #2d3748;
border-radius: 8px;
padding: 6px 10px;
font-size: 0.85rem;
color: #cbd5e1;
}

.icon {
color: #38bdf8;
font-size: 1rem;
}

/* Dots for desktop */
.timeline-item::before {
content: "";
position: absolute;
width: 14px;
height: 14px;
background-color: #38bdf8;
border-radius: 50%;
top: 28px;
}

.timeline-item.left::before {
right: -7px;
}

.timeline-item.right::before {
left: -7px;
}

/* --- MOBILE VIEW --- */
@media screen and (max-width: 900px) {
/* Remove dots & line */
.timeline-item::before,
.timeline-line {
display: none;
}

/* Stack all cards */
.timeline-item {
width: 100%;
text-align: left !important;
left: 0 !important;
padding: 15px 0;
}

.timeline-item .content {
width: 100%;
margin: 0;
padding: 18px;
border-radius: 10px;
}

.timeline-container {
padding: 15px 25px;
}

.timeline-item h2 {
font-size: 1rem;
margin-bottom: 6px;
text-align: left;
}

.timeline-item p {
font-size: 0.9rem;
line-height: 1.4;
margin-bottom: 10px;
text-align: left;
}

.icons {
flex-wrap: wrap;
gap: 6px;
justify-content: flex-start;
}

.icon-badge {
font-size: 0.8rem;
padding: 5px 8px;
}
}
`}</style>
</main>
</Layout>
);
};

export default TrainingPath;
