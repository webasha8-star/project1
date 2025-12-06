import React, { useEffect, useState } from "react";

const AboutSection = () => {
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
const handleResize = () => setIsMobile(window.innerWidth <= 992);
handleResize();
window.addEventListener("resize", handleResize);
return () => window.removeEventListener("resize", handleResize);
}, []);

return (
<section
style={{
background: "#0f1116",
color: "#fff",
padding: isMobile ? "40px 16px" : "80px 60px",
textAlign: "center",
}}
>

<div
style={{
display: "flex",
flexDirection: isMobile ? "column" : "row",
alignItems: "flex-start",
justifyContent: "space-between",
gap: isMobile ? "32px" : "60px",
marginTop: "40px",
}}
>
{/* Left Section */}
<div
style={{
flex: 1,
textAlign: isMobile ? "center" : "left",
}}
>
<h6
style={{
color: "#39FF14",
fontSize: isMobile ? "1rem" : "1.1rem",
fontWeight: 600,
marginBottom: "8px",
}}
>
About Crack Me Now
</h6>
<h2
style={{
textTransform: "none",
fontSize: isMobile ? "1.6rem" : "2rem",
fontWeight: 700,
lineHeight: 1.3,
marginBottom: "12px",
}}
>
The Journey Of <br />
<span style={{ color: "#39FF14" }}>Crack Me Now</span>
</h2>

<p
style={{
color: "#bfc9da",
fontSize: isMobile ? "0.95rem" : "1rem",
lineHeight: 1.5,
marginBottom: "24px",
textTransform: "none",
}}
>
Crack Me Now isn’t just a CTF platform — it’s a battlefield for
curious minds. We craft immersive cybersecurity challenges designed
to test, train, and transform every aspiring hacker into a digital
warrior.
</p>

{/* Box Grid */}
<div
style={{
display: "grid",
gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
gap: "20px",
justifyItems: "center",
}}
>
{[
{
img: "/assets/img/home-1/icon/OSCP_Duration_Logo.png",
title: "OSCP Exam Duration",
subtitle: "⏱ 24-Hour Challenge",
desc: "Master real-world hacking and live lab environment.",
},
{
img: "/assets/img/home-1/icon/OSCP_Pricing_Logo.png",
title: "OSCP Pricing",
subtitle: "₹85,000–₹1,00,000 INR",
desc: "Includes exam, lab access, and courseware (varies by plan duration).",
},
{
img: "/assets/img/home-1/icon/Course_Content_Logo.png",
title: "Course Content",
subtitle: "Hands-On Exploitation Labs",
desc: "Covers scanning, enumeration, privilege escalation, buffer overflow, and AD attacks.",
},
{
img: "/assets/img/home-1/icon/Certification_Logo.png",
title: "Certification Goal",
subtitle: "Global Ethical Hacking Standard",
desc: "The gold-standard certification for Penetration Testers and Red Teamers.",
},
].map((box, index) => (
<div
key={index}
style={{
display: "flex",
flexDirection: isMobile ? "column" : "row",
alignItems: "center",
background: "#181c23",
borderRadius: "14px",
boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
padding: "18px",
width: "100%",
textAlign: isMobile ? "center" : "left",
}}
>
<div
style={{
marginRight: isMobile ? "0" : "16px",
marginBottom: isMobile ? "12px" : "0",
minWidth: "66px",
minHeight: "66px",
display: "flex",
alignItems: "center",
justifyContent: "center",
background: "#232d3f",
borderRadius: "50%",
}}
>
<img
src={box.img}
alt={box.title}
style={{ width: "44px", height: "44px" }}
/>
</div>
<div style={{ textTransform: "none" }}>
<h5
style={{
margin: 0,
fontWeight: 700,
fontSize: "1rem",
color: "#fff",
lineHeight: 1.2,
}}
>
{box.title}
</h5>
<h6
style={{
margin: 0,
fontWeight: 600,
fontSize: "0.93rem",
color: "#39FF14",
lineHeight: 1.2,
}}
>
{box.subtitle}
</h6>
<p
style={{
margin: 0,
color: "#bfc9da",
fontSize: "0.89rem",
lineHeight: 1.4,
}}
>
{box.desc}
</p>
</div>
</div>
))}
</div>
</div>

{/* Right Section (Images) */}
<div
style={{
flex: 1,
display: "flex",
flexDirection: isMobile ? "column" : "row",
alignItems: "center",
justifyContent: "center",
gap: "20px",
}}
>
<img
src="/assets/img/home-1/about/about1.png"
alt="About 1"
style={{
width: isMobile ? "100%" : "50%",
borderRadius: "12px",
objectFit: "cover",
}}
/>
<img
src="/assets/img/home-1/about/about2.png"
alt="About 2"
style={{
width: isMobile ? "100%" : "55%",
borderRadius: "12px",
objectFit: "cover",
}}
/>
</div>
</div>
</section>
);
};

export default AboutSection;
