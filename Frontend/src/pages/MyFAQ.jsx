// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../AuthContext";
// import Header from "../components/Header";

// const MyFAQ = () => {
//     const { token } = useContext(AuthContext);
//     const [questions, setQuestions] = useState([]);

//     useEffect(() => {
//         const fetchMyQuestions = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     console.error("No token found!");
//                     return;
//                 }

//                 const res = await axios.get("http://localhost:5000/api/faq/user/my", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 setQuestions(res.data);
//             } catch (err) {
//                 console.error(err);
//                 alert("Failed to load your questions");
//             }
//         };

//         fetchMyQuestions();
//     }, []);

//     return (
//         <>
//             <Header />
//             <div style={{
//                 paddingTop: "210px",
//                 backgroundColor: "#000",
//                 minHeight: "100vh",
//                 padding: "90px 120px",
//                 fontFamily: "'Poppins', sans-serif",
//                 color: "white"
//             }}>

//                 <h1 style={{ textAlign: "center", color: "#22c55e", fontSize: "32px", marginBottom: "40px" }}>
//                     My Questions & Replies
//                 </h1>

//                 {questions.length === 0 ? (
//                     <p style={{ textAlign: "center", fontSize: "18px" }}>You haven't asked any questions yet.</p>
//                 ) : (
//                     questions.map((q) => (
//                         <div key={q.id} style={{
//                             border: "1px solid #22c55e",
//                             padding: "20px",
//                             borderRadius: "10px",
//                             marginBottom: "25px",
//                             background: "#0a0a0a",
//                             boxShadow: "0 0 8px rgba(34,197,94,0.2)",
//                         }}>
//                             <p><strong style={{ color: "#22c55e" }}>Question:</strong> {q.question}</p>
//                             <span style={{
//                                 padding: "4px 10px",
//                                 borderRadius: "6px",
//                                 fontSize: "12px",
//                                 fontWeight: "bold",
//                                 backgroundColor: q.status === "pending" ? "#fbbf24" : "#22c55e",
//                                 color: "#000",
//                                 marginTop: "10px",
//                                 display: "inline-block"
//                             }}>
//                                 {q.status.toUpperCase()}
//                             </span>

//                             {q.reply && (
//                                 <p style={{ marginTop: "10px", color: "#22c55e" }}>
//                                     <strong>Admin Reply:</strong> {q.reply}
//                                 </p>
//                             )}
//                         </div>
//                     ))
//                 )}
//             </div>
//         </>
//     );
// };

// export default MyFAQ;



import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import Header from "../components/Header";

const MyFAQ = () => {
    useContext(AuthContext); // context stays mounted even if not used
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchMyQuestions = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found!");
                    return;
                }

                const res = await axios.get("http://localhost:5000/api/faq/user/my", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setQuestions(res.data);
            } catch (err) {
                console.error(err);
                alert("Failed to load your questions");
            }
        };

        fetchMyQuestions();
    }, []);

    return (
        <>
            <Header />
            <div
                style={{
                    paddingTop: "210px",
                    backgroundColor: "#000",
                    minHeight: "100vh",
                    padding: "90px 120px",
                    fontFamily: "'Poppins', sans-serif",
                    color: "white",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        color: "#22c55e",
                        fontSize: "32px",
                        marginBottom: "40px",
                    }}
                >
                    My Questions & Replies
                </h1>

                {questions.length === 0 ? (
                    <p style={{ textAlign: "center", fontSize: "18px" }}>
                        You haven't asked any questions yet.
                    </p>
                ) : (
                    questions.map((q) => (
                        <div
                            key={q.id}
                            style={{
                                border: "1px solid #22c55e",
                                padding: "20px",
                                borderRadius: "10px",
                                marginBottom: "25px",
                                background: "#0a0a0a",
                                boxShadow: "0 0 8px rgba(34,197,94,0.2)",
                            }}
                        >
                            <p>
                                <strong style={{ color: "#22c55e" }}>
                                    Question:
                                </strong>{" "}
                                {q.question}
                            </p>
                            <span
                                style={{
                                    padding: "4px 10px",
                                    borderRadius: "6px",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    backgroundColor:
                                        q.status === "pending"
                                            ? "#fbbf24"
                                            : "#22c55e",
                                    color: "#000",
                                    marginTop: "10px",
                                    display: "inline-block",
                                }}
                            >
                                {q.status.toUpperCase()}
                            </span>

                            {q.reply && (
                                <p
                                    style={{
                                        marginTop: "10px",
                                        color: "#22c55e",
                                    }}
                                >
                                    <strong>Admin Reply:</strong> {q.reply}
                                </p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default MyFAQ;
