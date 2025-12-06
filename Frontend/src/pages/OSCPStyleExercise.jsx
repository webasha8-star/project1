import React from "react";
import Layout from "../components/Layout";

const oscpLabs = [
{
title: "Information Gathering",
desc: "Understand your target with tools like Nmap, Gobuster, and Whois.",
items: [
"Passive Reconnaissance",
"Subdomain Enumeration",
"Port & Service Scanning",
],
},
{
title: "Exploitation",
desc: "Trigger known vulnerabilities using both manual and Metasploit-based methods.",
items: [
"Remote Code Execution",
"File Upload Bypass",
"Exploitation Automation",
],
},
{
title: "Privilege Escalation",
desc: "Gain root/admin rights on compromised machines using real-world techniques.",
items: [
"Linux Enumeration Scripts",
"Windows Service Misconfigurations",
"Scheduled Tasks & Token Impersonation",
],
},
{
title: "Buffer Overflows",
desc: "Learn to identify and exploit 32-bit stack-based buffer overflow vulnerabilities.",
items: [
"Fuzzing & Pattern Offsets",
"Crafting Shellcode",
"SEH Bypass Techniques",
],
},
{
title: "Active Directory",
desc: "Target domain environments with Kerberoasting, Pass-the-Hash, and more.",
items: [
"AD Enumeration with BloodHound",
"Kerberoasting & AS-REP Roasting",
"SMB Relay & Credential Dumping",
],
},
{
title: "Post-Exploitation",
desc: "Maintain access, dump passwords, and exfiltrate data without getting caught.",
items: [
"Persistence Techniques",
"Token Impersonation",
"Data Collection & Cleanup",
],
},
];

function OSCPStyleExercise() {
return (
<>
<Layout>
<div style={{ paddingTop: "10px" }}>

{/* Breadcrumb */}
<div
className="gt-breadcrumb-wrapper bg-cover"
style={{ backgroundImage: `url('/assets/img/breadcrumb.png')` }}
>
<div className="gt-left-shape">
<img src="/assets/img/shape-1.png" alt="img" />
</div>
<div className="gt-right-shape">
<img src="/assets/img/shape-2.png" alt="img" />
</div>
<div className="gt-blur-shape">
<img src="/assets/img/breadcrumb-shape.png" alt="img" />
</div>
<div className="container">
<div className="gt-page-heading">
<div className="gt-breadcrumb-sub-title">
<h1
className="wow fadeInUp"
data-wow-delay=".3s"
style={{ color: "#39FF14" }}
>
OSCP Style Exercise
</h1>
</div>
</div>
</div>
</div>

{/* Hero Section */}
<section
className="oscp-hero-section section-padding fix"
style={{
background: "linear-gradient(90deg, #0B0E13 60%, #232d3f 100%)",
}}
>
<div className="container">
<div className="row align-items-center">
<div className="col-lg-7">
<h2
className="tx-title sec_title tz-itm-title tz-itm-anim"
style={{
color: "#39FF14",
fontSize: "2.8rem",
letterSpacing: "2px",
}}
>
OSCP-Style Exercise Labs
</h2>
<p
style={{
color: "#eaffd0",
fontSize: "1.2rem",
marginTop: "18px",
maxWidth: "600px",
}}
>
Practice like it's exam day! Master real-world hacking with our OSCP-style virtual labs. Each challenge covers a critical exam skill, from enumeration to buffer overflows and AD attacks.
</p>
</div>
<div className="col-lg-5 d-none d-lg-block">
<img
src="/assets/img/home-1/OSCP/1.jpg"
alt="OSCP Simulation"
style={{
width: "300px",
height: "300px",
borderRadius: "2px",
boxShadow: "0 0 2px #39FF14",
objectFit: "cover"
}}
/>
</div>

</div>
</div>
</section>

{/* Labs/Challenges List */}
<section
className="oscp-labs-list section-padding fix"
style={{ background: "#181c23" }}
>
<div className="container">
<div className="row g-4">
{oscpLabs.map((lab) => (
<div className="col-md-6 col-lg-4" key={lab.title}>
<div
className="oscp-lab-card"
style={{
background: "#232d3f",
borderRadius: "10px",
border: "1px solid #38bdf8",
boxShadow: "0 0 4px rgba(56, 189, 248, 0.2)",
padding: "28px 22px",
minHeight: "180px",
transition: "transform 0.2s",
}}
>
<h4
style={{
color: "#39FF14",
fontWeight: 700,
marginBottom: "10px",
}}
>
{lab.title}
</h4>
<p style={{ color: "#eaffd0", marginBottom: "16px" }}>
{lab.desc}
</p>
<ul
style={{
color: "#bfc9da",
fontSize: "1rem",
marginBottom: "16px",
paddingLeft: "18px",
}}
>
{lab.items.map((item) => (
<li key={item}>{item}</li>
))}
</ul>
{/* Removed Start Lab button */}
</div>
</div>
))}
</div>
</div>
</section>
</div>
</Layout>
</>
);
}

export default OSCPStyleExercise;
