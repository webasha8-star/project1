import React, { useMemo } from "react";
import Layout from "../components/Layout";

const OSCP_Certificates = [
{
title: "Foundational",
desc: "Start your cybersecurity journey with core hacking concepts.",
items: ["Info Gathering", "Web Basics (SQLi/XSS)", "Enumeration Tools", "Beginner Shells"],
},
{
title: "Intermediate",
desc: "Refine practical skills in realistic lab scenarios.",
items: ["Privilege Escalation", "Manual Exploitation", "Metasploit & Enumeration", "Buffer Overflows (32-bit)"],
},
{
title: "Advanced",
desc: "Master real-world red teaming and OSCP exam tactics.",
items: ["AD & Kerberoasting", "AV Evasion & Shellcode", "C2 Channels", "Manual Buffer Overflows"],
},
];

const benefits = [
{
title: "Career Growth",
desc: "87% of certified learners secure job interviews or promotions within 6 months.",
link: "/testimonial",
tooltip: "2024 user survey data.",
},
{
title: "Global Recognition",
desc: "Earn Credly-compatible certifications trusted by cybersecurity recruiters worldwide.",
link: "/training-path",
tooltip: "Share badges on LinkedIn.",
},
{
title: "Hacker Community",
desc: "Join a global network of ethical hackers to collaborate and compete.",
link: "/upcoming-challenges",
tooltip: "Join CTF events and forums.",
},
];

function OSCP_Certificate() {
const memoizedBenefits = useMemo(() => benefits, []);
const isMobile = window.innerWidth <= 768;
const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

// Define reusable container style for mobile spacing
const containerStyle = {
paddingLeft: isMobile ? "26px" : "10px",
paddingRight: isMobile ? "26px" : "10px",
};

return (
<>
<Layout>
<div
style={{
paddingTop: "10px",
fontFamily: "'Roboto Mono', Arial, sans-serif",
}}
>
{/* Breadcrumb */}
<div
className="gt-breadcrumb-wrapper bg-cover"
style={{
backgroundImage: `url('/assets/img/breadcrumb.png')`,
padding: "40px 0 20px 0",
}}
>
<div className="container" style={containerStyle}>
<div className="gt-page-heading" style={{ textAlign: "center" }}>
<h1
className="wow fadeInUp"
data-wow-delay=".3s"
style={{
color: "#39FF14",
fontWeight: 800,
fontSize: isMobile ? "2rem" : "2.5rem",
marginBottom: "10px",
letterSpacing: "2px",
}}
>
Get OSCP Certified
</h1>
</div>
</div>
</div>

{/* Hero Section */}
<section
className="linuxprivesc-hero-section section-padding fix"
style={{
background: "linear-gradient(90deg, #0B0E13 60%, #232d3f 100%)",
padding: isMobile ? "40px 0" : "60px 0 40px 0",
}}
>
<div className="container" style={containerStyle}>
<div className="row align-items-center">
<div className="col-lg-7">
<h2
className="tx-title sec_title tz-itm-title tz-itm-anim"
style={{
color: "#39FF14",
fontSize: isMobile ? "1.8rem" : "2.3rem",
fontWeight: 700,
letterSpacing: "2px",
marginBottom: "18px",
}}
>
Get OSCP Certified
</h2>
<p
style={{
color: "#eaffd0",
fontSize: isMobile ? "1rem" : "1.15rem",
marginBottom: "0",
maxWidth: "600px",
lineHeight: "1.7",
}}
>
Prove your hacking skills with globally recognized offensive
security certifications.
</p>
</div>
<div className="col-lg-5 d-none d-lg-block">
<div style={{ textAlign: "center" }}>
<img
src="/assets/img/home-1/OSCP/2.jpg"
alt="Linux PrivEsc"
style={{
borderRadius: "18px",
boxShadow: "0 0 2px #39FF14",
maxWidth: "340px",
}}
/>
</div>
</div>
</div>
</div>
</section>

{/* Labs Section */}
<section
className="linuxprivesc-labs-list section-padding fix"
style={{
background: "#181c23",
padding: isMobile ? "32px 0" : "48px 0",
}}
>
<div className="container" style={containerStyle}>
<div className="row g-4">
{OSCP_Certificates.map((lab) => (
<div className="col-md-6 col-lg-4" key={lab.title}>
<div
className="linuxprivesc-lab-card"
style={{
background: "#232d3f",
borderRadius: "16px",
boxShadow: "0 0 2px #39FF14",
padding: isMobile
? "24px 16px"
: isTablet
? "28px 20px"
: "32px 24px",
minHeight: "210px",
transition: "transform 0.2s",
display: "flex",
flexDirection: "column",
justifyContent: "flex-start",
}}
>
<div>
<h4
style={{
color: "#39FF14",
fontWeight: 700,
marginBottom: "12px",
fontSize: isMobile ? "1.1rem" : "1.25rem",
letterSpacing: "1px",
}}
>
{lab.title}
</h4>
<p
style={{
color: "#eaffd0",
marginBottom: "18px",
fontSize: isMobile ? "0.95rem" : "1.05rem",
}}
>
{lab.desc}
</p>
<ul
style={{
color: "#bfc9da",
fontSize: isMobile ? "0.9rem" : "1rem",
marginBottom: "18px",
paddingLeft: "18px",
lineHeight: "1.7",
}}
>
{lab.items.map((item) => (
<li key={item}>{item}</li>
))}
</ul>
</div>
</div>
</div>
))}
</div>
</div>
</section>

{/* Benefits Section */}
<section
className="benefits-section section-padding fix"
style={{
background: "linear-gradient(135deg, #0B0E13 60%, #232d3f 100%)",
padding: isMobile ? "40px 0" : "60px 0",
position: "relative",
overflow: "hidden",
}}
>
<div
className="container"
style={{
...containerStyle,
position: "relative",
zIndex: 1,
background: "rgba(56, 189, 248, 0.05)",
}}
>
<h2
style={{
color: "#38bdf8",
fontSize: isMobile ? "1.8rem" : "2.3rem",
fontWeight: 700,
textAlign: "center",
marginBottom: isMobile ? "24px" : "40px",
letterSpacing: "2px",
}}
>
Why Choose OSCP-Aligned Certification?
</h2>
<div
className="row g-4"
style={{
display: "grid",
gridTemplateColumns: isMobile
? "1fr"
: isTablet
? "repeat(2, 1fr)"
: "repeat(3, 1fr)",
gap: isMobile ? "16px" : "20px",
}}
>
{memoizedBenefits.map((benefit, index) => (
<article
key={benefit.title}
className="benefit-card"
style={{
background: "#1e2636",
borderRadius: "12px",
border: "1px solid #38bdf8",
boxShadow: "0 0 6px rgba(56, 189, 248, 0.2)",
padding: isMobile
? "16px"
: isTablet
? "20px"
: "24px",
transition: "transform 0.2s, box-shadow 0.3s",
position: "relative",
}}
onMouseOver={(e) => {
e.currentTarget.style.transform = "scale(1.02)";
e.currentTarget.style.boxShadow =
"0 0 10px rgba(56, 189, 248, 0.3)";
}}
onMouseOut={(e) => {
e.currentTarget.style.transform = "scale(1)";
e.currentTarget.style.boxShadow =
"0 0 6px rgba(56, 189, 248, 0.2)";
}}
>
<h3
id={`benefit-title-${index}`}
style={{
color: "#f0f4e8",
fontSize: isMobile ? "1rem" : "1.1rem",
fontWeight: 600,
marginBottom: "8px",
}}
>
{benefit.title}
</h3>
<p
style={{
color: "#bfc9da",
fontSize: isMobile ? "0.85rem" : "0.9rem",
lineHeight: "1.6",
marginBottom: "8px",
}}
>
{benefit.desc}
</p>
<a
href={benefit.link}
style={{
color: "#38bdf8",
fontSize: isMobile ? "0.8rem" : "0.85rem",
textDecoration: "none",
fontWeight: 500,
transition: "color 0.3s",
}}
onMouseOver={(e) => (e.currentTarget.style.color = "#60a5fa")}
onMouseOut={(e) => (e.currentTarget.style.color = "#38bdf8")}
>
Learn More
</a>
</article>
))}
</div>
</div>
</section>
</div>
</Layout>
</>
);
}

export default OSCP_Certificate;
