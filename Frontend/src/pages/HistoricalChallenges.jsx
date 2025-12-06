// import React from "react";
// import Layout from "../components/Layout";

// const HistoricalChallenges = () => {
//   const containerStyle = {
//     maxWidth: "1120px",
//     margin: "0 auto",
//     padding: "0 16px 80px",
//     display: "grid",
//     gridTemplateColumns: "repeat(1, 1fr)",
//     gap: "32px",
//   };

//   const heroSectionStyle = {
//     padding: "80px 24px 48px 24px",
//     textAlign: "center",
//     color: "#fff",
//   };

//   const heroTitleStyle = {
//     fontSize: "2.5rem",
//     fontWeight: "800",
//     marginBottom: "16px",
//   };

//   const heroParagraphStyle = {
//     fontSize: "1.25rem",
//     color: "#d1d5db",
//     maxWidth: "768px",
//     margin: "0 auto",
//     textTransform: "none",
//   };

//   const cardStyle = {
//     backgroundColor: "#1f2937",
//     padding: "24px",
//     borderRadius: "12px",
//     boxShadow: "0 10px 15px rgba(0,0,0,0.3)",
//     border: "1px solid #1f2937",
//     color: "#e5e7eb",
//     display: "grid",
//     gridTemplateColumns: "2fr 1fr",
//     gap: "24px",
//     alignItems: "center",
//     textTransform: "none",
//   };

//   const cardContentStyle = {
//     display: "flex",
//     flexDirection: "column",
//   };

//   const cardTitleStyle = {
//     fontSize: "1.5rem",
//     fontWeight: "600",
//     marginBottom: "8px",
//     color: "#f9fafb",
//     textTransform: "none",
//   };

//   const cardDateStyle = {
//     fontSize: "0.875rem",
//     color: "#9ca3af",
//     marginBottom: "12px",
//     textTransform: "none",
//   };

//   const cardDescriptionStyle = {
//     fontSize: "0.875rem",
//     color: "#d1d5db",
//     marginBottom: "16px",
//     flexGrow: 1,
//     textTransform: "none",
//     lineHeight: "1.6",
//   };

//   const cardLinkStyle = {
//     fontSize: "0.875rem",
//     color: "#ef4444",
//     textDecoration: "none",
//     cursor: "pointer",
//     textTransform: "none",
//     fontWeight: "500",
//   };

//   const imageStyle = {
//     width: "100%",
//     height: "200px",
//     objectFit: "cover",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//   };

//   const ctaSectionStyle = {
//     backgroundColor: "#000",
//     padding: "64px 24px",
//     textAlign: "center",
//     color: "#fff",
//     textTransform: "none",
//   };

//   const ctaTitleStyle = {
//     fontSize: "1.875rem",
//     fontWeight: "700",
//     marginBottom: "16px",
//   };

//   const ctaTextStyle = {
//     color: "#d1d5db",
//     maxWidth: "640px",
//     margin: "0 auto 24px",
//     fontSize: "1rem",
//     textTransform: "none",
//   };

//   const ctaButtonStyle = {
//     backgroundColor: "#dc2626",
//     color: "#fff",
//     padding: "12px 32px",
//     borderRadius: "9999px",
//     fontSize: "1.125rem",
//     fontWeight: "600",
//     border: "none",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease",
//     textTransform: "none",
//   };

//   const footerStyle = {
//     backgroundColor: "#1f2937",
//     padding: "24px 0",
//     textAlign: "center",
//     fontSize: "0.875rem",
//     color: "#6b7280",
//     textTransform: "none",
//   };

//   const [ctaBtnHover, setCtaBtnHover] = React.useState(false);

//   const challenges = [
//     {
//       title: "🛠 Web Exploitation - SQL Injection",
//       date: "Completed on: Jan 12, 2025",
//       description: "This challenge focused on identifying and exploiting SQL Injection vulnerabilities in a simulated web app login portal.",
//       image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop",
//       link: "View Solution"
//     },
//     {
//       title: "🐚 Reverse Shell - Linux PrivEsc",
//       date: "Completed on: Feb 5, 2025",
//       description: "Users escalated privileges by leveraging SUID misconfigurations and custom binaries.",
//       image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
//       link: "View Walkthrough"
//     },
//     {
//       title: "📂 File Upload Exploitation",
//       date: "Completed on: Mar 8, 2025",
//       description: "Challenge covered uploading and executing malicious scripts through insecure file validation.",
//       image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
//       link: "View Solution"
//     },
//     {
//       title: "🔐 Windows Active Directory - Credential Dump",
//       date: "Completed on: Apr 10, 2025",
//       description: "Simulated dumping NTLM hashes and lateral movement across a small AD network.",
//       image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
//       link: "View Write-up"
//     },
//     {
//       title: "💾 Buffer Overflow - Windows x86",
//       date: "Completed on: May 1, 2025",
//       description: "Participants learned to fuzz, locate EIP offsets, and craft custom shellcode.",
//       image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
//       link: "Review Exploit Steps"
//     },
//     {
//       title: "🧪 XSS & CSRF Attacks",
//       date: "Completed on: June 22, 2025",
//       description: "Covered reflected and stored XSS, as well as CSRF bypass in a JavaScript-heavy app.",
//       image: "https://images.unsplash.com/photo-1555949963-ff9b8d23a4c0?w=400&h=200&fit=crop",
//       link: "Read Report"
//     }
//   ];

//   return (
//     <>
//       <Layout>
//         <main style={{ paddingTop: "80px" }}>
//           <section style={heroSectionStyle}>
//             <h1 style={heroTitleStyle}>🏁 Historical Challenges</h1>
//             <p style={heroParagraphStyle}>
//               Explore past CTF challenges completed by the community. Analyze, learn,
//               and improve your hacking skills by reviewing past scenarios.
//             </p>
//           </section>

//           <section style={containerStyle}>
//             {challenges.map((challenge, index) => (
//               <div key={index} style={cardStyle}>
//                 <div style={cardContentStyle}>
//                   <h2 style={cardTitleStyle}>{challenge.title}</h2>
//                   <p style={cardDateStyle}>{challenge.date}</p>
//                   <p style={cardDescriptionStyle}>
//                     {challenge.description}
//                   </p>
//                   <a
//                     href="#"
//                     style={cardLinkStyle}
//                     onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
//                     onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
//                   >
//                     {challenge.link}
//                   </a>
//                 </div>
//                 <img 
//                   src={challenge.image} 
//                   alt={challenge.title}
//                   style={imageStyle}
//                 />
//               </div>
//             ))}
//           </section>

//           <section style={ctaSectionStyle}>
//             <h2 style={ctaTitleStyle}>Missed a Challenge?</h2>
//             <p style={ctaTextStyle}>
//               Catch up on missed challenges and learn from detailed solutions prepared by
//               top players in the CTF Academy community.
//             </p>
//             <button
//               type="button"
//               style={{
//                 ...ctaButtonStyle,
//                 backgroundColor: ctaBtnHover ? "#b91c1c" : ctaButtonStyle.backgroundColor,
//               }}
//               onMouseEnter={() => setCtaBtnHover(true)}
//               onMouseLeave={() => setCtaBtnHover(false)}
//               onClick={() => alert("Start Learning from Archives clicked!")}
//             >
//               Start Learning from Archives
//             </button>
//           </section>
//         </main>
//       </Layout>
//     </>
//   );
// };

// export default HistoricalChallenges;




import React from "react";
import Layout from "../components/Layout";

const HistoricalChallenges = () => {
  const containerStyle = {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "0 16px 80px",
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "32px",
  };

  const heroSectionStyle = {
    padding: "80px 24px 48px 24px",
    textAlign: "center",
    color: "#fff",
  };

  const heroTitleStyle = {
    fontSize: "2.5rem",
    fontWeight: "800",
    marginBottom: "16px",
  };

  const heroParagraphStyle = {
    fontSize: "1.25rem",
    color: "#d1d5db",
    maxWidth: "768px",
    margin: "0 auto",
  };

  const cardStyle = {
    backgroundColor: "#1f2937",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 10px 15px rgba(0,0,0,0.3)",
    border: "1px solid #1f2937",
    color: "#e5e7eb",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
    alignItems: "center",
  };

  const cardContentStyle = { display: "flex", flexDirection: "column" };

  const cardTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#f9fafb",
  };

  const cardDateStyle = {
    fontSize: "0.875rem",
    color: "#9ca3af",
    marginBottom: "12px",
  };

  const cardDescriptionStyle = {
    fontSize: "0.875rem",
    color: "#d1d5db",
    marginBottom: "16px",
    lineHeight: "1.6",
  };

  const cardLinkButtonStyle = {
    fontSize: "0.875rem",
    color: "#ef4444",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textAlign: "left",
    fontWeight: "500",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  };

  const ctaSectionStyle = {
    backgroundColor: "#000",
    padding: "64px 24px",
    textAlign: "center",
    color: "#fff",
  };

  const ctaTitleStyle = {
    fontSize: "1.875rem",
    fontWeight: "700",
    marginBottom: "16px",
  };

  const ctaTextStyle = {
    color: "#d1d5db",
    maxWidth: "640px",
    margin: "0 auto 24px",
    fontSize: "1rem",
  };

  const ctaButtonStyle = {
    backgroundColor: "#dc2626",
    color: "#fff",
    padding: "12px 32px",
    borderRadius: "9999px",
    fontSize: "1.125rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const [ctaBtnHover, setCtaBtnHover] = React.useState(false);

  const challenges = [
    {
      title: "🛠 Web Exploitation - SQL Injection",
      date: "Completed on: Jan 12, 2025",
      description:
        "This challenge focused on identifying and exploiting SQL Injection vulnerabilities in a simulated web app login portal.",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop",
      link: "View Solution",
    },
    {
      title: "🐚 Reverse Shell - Linux PrivEsc",
      date: "Completed on: Feb 5, 2025",
      description:
        "Users escalated privileges by leveraging SUID misconfigurations and custom binaries.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
      link: "View Walkthrough",
    },
    {
      title: "📂 File Upload Exploitation",
      date: "Completed on: Mar 8, 2025",
      description:
        "Challenge covered uploading and executing malicious scripts through insecure file validation.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
      link: "View Solution",
    },
    {
      title: "🔐 Windows Active Directory - Credential Dump",
      date: "Completed on: Apr 10, 2025",
      description:
        "Simulated dumping NTLM hashes and lateral movement across a small AD network.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
      link: "View Write-up",
    },
    {
      title: "💾 Buffer Overflow - Windows x86",
      date: "Completed on: May 1, 2025",
      description:
        "Participants learned to fuzz, locate EIP offsets, and craft custom shellcode.",
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
      link: "Review Exploit Steps",
    },
    {
      title: "🧪 XSS & CSRF Attacks",
      date: "Completed on: June 22, 2025",
      description:
        "Covered reflected and stored XSS, as well as CSRF bypass in a JavaScript-heavy app.",
      image:
        "https://images.unsplash.com/photo-1555949963-ff9b8d23a4c0?w=400&h=200&fit=crop",
      link: "Read Report",
    },
  ];

  return (
    <Layout>
      <main style={{ paddingTop: "80px" }}>
        <section style={heroSectionStyle}>
          <h1 style={heroTitleStyle}>🏁 Historical Challenges</h1>
          <p style={heroParagraphStyle}>
            Explore past CTF challenges completed by the community. Analyze,
            learn, and improve your hacking skills by reviewing past scenarios.
          </p>
        </section>

        <section style={containerStyle}>
          {challenges.map((challenge, index) => (
            <div key={index} style={cardStyle}>
              <div style={cardContentStyle}>
                <h2 style={cardTitleStyle}>{challenge.title}</h2>
                <p style={cardDateStyle}>{challenge.date}</p>
                <p style={cardDescriptionStyle}>{challenge.description}</p>

                {/* replaced <a href="#"> with accessible button */}
                <button
                  style={cardLinkButtonStyle}
                  onClick={() => alert(`${challenge.link} clicked!`)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  {challenge.link}
                </button>
              </div>

              <img
                src={challenge.image}
                alt={challenge.title}
                style={imageStyle}
              />
            </div>
          ))}
        </section>

        <section style={ctaSectionStyle}>
          <h2 style={ctaTitleStyle}>Missed a Challenge?</h2>
          <p style={ctaTextStyle}>
            Catch up on missed challenges and learn from detailed solutions
            prepared by top players in the CTF Academy community.
          </p>
          <button
            type="button"
            style={{
              ...ctaButtonStyle,
              backgroundColor: ctaBtnHover ? "#b91c1c" : ctaButtonStyle.backgroundColor,
            }}
            onMouseEnter={() => setCtaBtnHover(true)}
            onMouseLeave={() => setCtaBtnHover(false)}
            onClick={() => alert("Start Learning from Archives clicked!")}
          >
            Start Learning from Archives
          </button>
        </section>
      </main>
    </Layout>
  );
};

export default HistoricalChallenges;
