// // Announcements.jsx — Admin real-time announcements (Enhanced)
// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../AuthContext";
// import { io } from "socket.io-client";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Announcements.css";

// const MySwal = withReactContent(Swal);

// const Announcements = () => {
//   const { token } = useContext(AuthContext);
//   const [announcements, setAnnouncements] = useState([]);
//   const [newAnnouncement, setNewAnnouncement] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Fetch announcements from backend
//   const fetchAnnouncements = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/announcements", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAnnouncements(res.data);
//     } catch (err) {
//       toast.error("Failed to load announcements", { className: "center-toast" });
//       console.error("Error fetching announcements:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Connect Socket.IO + Fetch Initial Data
//   useEffect(() => {
//     fetchAnnouncements();

//     const socket = io("http://localhost:5000");
//     socket.on("connect", () => console.log("Connected to Socket.IO"));

//     socket.on("announcement:new", (data) => {
//       setAnnouncements((prev) => [data, ...prev]);
//       toast.info("New announcement received!", { className: "center-toast" });
//     });

//     socket.on("announcement:deleted", (id) => {
//       setAnnouncements((prev) => prev.filter((a) => a.id !== id));
//     });

//     return () => socket.disconnect();
//   }, []);

//   // Add new announcement
//   const handleAddAnnouncement = async () => {
//     if (!newAnnouncement.trim()) {
//       toast.warning("Please enter an announcement message", {
//         className: "center-toast",
//       });
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:5000/api/announcements",
//         { message: newAnnouncement },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Announcement posted successfully!", {
//         className: "center-toast",
//       });
//       setNewAnnouncement("");
//     } catch (err) {
//       toast.error("Failed to post announcement", { className: "center-toast" });
//       console.error("Error adding announcement:", err);
//     }
//   };

//   // Delete with SweetAlert2 Confirmation
//   const deleteAnnouncement = async (id) => {
//     const result = await MySwal.fire({
//       title: "Are you sure?",
//       text: "This announcement will be permanently deleted.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#22c55e",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//       background: "#1b1b1f",
//       color: "#fff",
//       customClass: {
//         popup: "rounded-xl shadow-lg",
//         title: "text-lg font-semibold",
//       },
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         toast.success("Announcement deleted successfully", {
//           className: "center-toast",
//         });
//       } catch (err) {
//         toast.error("Failed to delete announcement", { className: "center-toast" });
//       }
//     }
//   };

//   if (loading) return <h2 className="loading-text">Loading announcements...</h2>;

//   return (
//     <div className="announcement-container">
//       {/* Toastify Container */}
//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar
//         theme="dark"
//         transition={Slide}
//         className="Toastify__toast-container--center"
//         toastClassName="Toastify__toast--animated"
//       />

//       <h1 className="announcement-title">Admin Announcements</h1>

//       {/* Input Form */}
//       <div className="announcement-form">
//         <input
//           type="text"
//           placeholder="Enter new announcement..."
//           value={newAnnouncement}
//           onChange={(e) => setNewAnnouncement(e.target.value)}
//         />
//         <button onClick={handleAddAnnouncement}>Post</button>
//       </div>

//       {/* Announcement List */}
//       <div className="announcement-list">
//         {announcements.length > 0 ? (
//           announcements.map((a) => (
//             <div key={a.id} className="announcement-item">
//               <div className="announcement-content">
//                 <p className="announcement-text">{a.message}</p>
//                 <p className="announcement-date">
//                   {new Date(a.createdAt).toLocaleString()}
//                 </p>
//               </div>
//               <button
//                 onClick={() => deleteAnnouncement(a.id)}
//                 className="delete-btn"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="empty-text">No announcements yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Announcements;



// Announcements.jsx — Admin real-time announcements (Enhanced)
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Announcements.css";

const MySwal = withReactContent(Swal);

const Announcements = () => {
  const { token } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [loading, setLoading] = useState(true);

  // Connect Socket.IO + Fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/announcements", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnnouncements(res.data);
      } catch (err) {
        toast.error("Failed to load announcements", { className: "center-toast" });
        console.error("Error fetching announcements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();

    const socket = io("http://localhost:5000");

    socket.on("announcement:new", (data) => {
      setAnnouncements((prev) => [data, ...prev]);
      toast.info("New announcement received!", { className: "center-toast" });
    });

    socket.on("announcement:deleted", (id) => {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    });

    return () => socket.disconnect();
  }, [token]);

  // Add new announcement
  const handleAddAnnouncement = async () => {
    if (!newAnnouncement.trim()) {
      toast.warning("Please enter an announcement message", {
        className: "center-toast",
      });
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/announcements",
        { message: newAnnouncement },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Announcement posted successfully!", {
        className: "center-toast",
      });

      setNewAnnouncement("");
    } catch (err) {
      toast.error("Failed to post announcement", { className: "center-toast" });
      console.error("Error adding announcement:", err);
    }
  };

  // Delete with SweetAlert2 Confirmation
  const deleteAnnouncement = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "This announcement will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#1b1b1f",
      color: "#fff",
      customClass: {
        popup: "rounded-xl shadow-lg",
        title: "text-lg font-semibold",
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Announcement deleted successfully", {
          className: "center-toast",
        });
      } catch (err) {
        toast.error("Failed to delete announcement", { className: "center-toast" });
      }
    }
  };

  if (loading) {
    return <h2 className="loading-text">Loading announcements...</h2>;
  }

  return (
    <div className="announcement-container">
      {/* Toastify Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        theme="dark"
        transition={Slide}
        className="Toastify__toast-container--center"
        toastClassName="Toastify__toast--animated"
      />

      <h1 className="announcement-title">Admin Announcements</h1>

      {/* Input Form */}
      <div className="announcement-form">
        <input
          type="text"
          placeholder="Enter new announcement..."
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
        />
        <button onClick={handleAddAnnouncement}>Post</button>
      </div>

      {/* Announcement List */}
      <div className="announcement-list">
        {announcements.length > 0 ? (
          announcements.map((a) => (
            <div key={a.id} className="announcement-item">
              <div className="announcement-content">
                <p className="announcement-text">{a.message}</p>
                <p className="announcement-date">
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => deleteAnnouncement(a.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="empty-text">No announcements yet.</p>
        )}
      </div>
    </div>
  );
};

export default Announcements;
