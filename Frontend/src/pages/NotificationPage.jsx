// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import { AuthContext } from "../AuthContext";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import "./css/NotificationPage.css";

// const NotificationPage = () => {
//   const { token } = useContext(AuthContext);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch announcements from backend + listen for real-time updates
//   useEffect(() => {
//     if (!token) return;

//     const fetchNotifications = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/announcements", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setNotifications(res.data);
//       } catch (error) {
//         console.error("❌ Error fetching notifications:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();

//     // ✅ Connect to Socket.IO for live announcements
//     const socket = io("http://localhost:5000", { transports: ["websocket"] });

//     socket.on("connect", () => {
//       console.log("🟢 Connected to Socket.IO");
//     });

//     socket.on("announcement:new", (announcement) => {
//       console.log("📢 New announcement received:", announcement);
//       setNotifications((prev) => [announcement, ...prev]);
//     });

//     socket.on("disconnect", () => {
//       console.log("🔴 Disconnected from Socket.IO");
//     });

//     return () => socket.disconnect();
//   }, [token]);

//   // ✅ Mark all notifications as read
//   const markAllAsRead = async () => {
//     try {
//       await axios.put(
//         "http://localhost:5000/api/announcements/read-all",
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Update locally
//       setNotifications((prev) =>
//         prev.map((n) => ({ ...n, isRead: true }))
//       );
//     } catch (error) {
//       console.error("❌ Error marking notifications as read:", error);
//     }
//   };

//   return (
//     <>
//       {/* ✅ Header */}
//       <Header />

//       {/* ✅ Main Notifications Section */}
//       <div className="notification-page">
//         <div className="notification-header">
//           <h2>🔔 Notifications</h2>
//           {notifications.length > 0 && (
//             <button className="mark-read-btn" onClick={markAllAsRead}>
//               Mark all as read
//             </button>
//           )}
//         </div>

//         {/* ✅ Notifications List */}
//         {loading ? (
//           <p className="no-notifications">Loading notifications...</p>
//         ) : notifications.length === 0 ? (
//           <p className="no-notifications">You have no new notifications</p>
//         ) : (
//           <ul className="notification-list">
//             {notifications.map((note) => (
//               <li
//                 key={note.id}
//                 className={`notification-item ${
//                   note.isRead ? "read" : "unread"
//                 }`}
//               >
//                 <div className="notification-message">
//                   {note.title && <strong>{note.title} — </strong>}
//                   {note.message}
//                 </div>
//                 <div className="notification-time">
//                   {new Date(note.createdAt).toLocaleString()}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* ✅ Footer */}
//       <Footer />
//     </>
//   );
// };

// export default NotificationPage;


import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./css/NotificationPage.css";
import { Trash2, Bell, CheckCircle } from "lucide-react"; // using Lucide icons

const NotificationPage = () => {
  const { token } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user info from localStorage (for delete ownership check)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Fetch user notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/api/announcements", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  // ✅ Delete only user's own notifications
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      alert("Notification deleted successfully!");
    } catch (error) {
      if (error.response?.status === 403) {
        alert("You can only delete your own notifications.");
      } else {
        alert("Failed to delete notification.");
      }
      console.error("Error deleting notification:", error);
    }
  };

  // ✅ Mark all as read
  const markAllAsRead = async () => {
    try {
      await Promise.all(
        notifications.map((note) =>
          axios.put(
            `http://localhost:5000/api/announcements/${note.id}/read`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <p className="no-notifications">Loading notifications...</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="notification-page">
        <div className="notification-header">
          <h2>
            <Bell size={22} style={{ marginRight: "8px" }} />
            Notifications
          </h2>
          {notifications.length > 0 && (
            <button className="mark-read-btn" onClick={markAllAsRead}>
              <CheckCircle size={16} style={{ marginRight: "6px" }} />
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <p className="no-notifications">You have no notifications yet.</p>
        ) : (
          <ul className="notification-list">
            {notifications.map((note) => (
              <li
                key={note.id}
                className={`notification-item ${note.isRead ? "read" : "unread"}`}
              >
                <div className="notification-message">{note.message}</div>

                <div className="notification-meta">
                  <span className="notification-time">
                    {new Date(note.createdAt).toLocaleString()}
                  </span>

                  {/* Delete icon only for user's own notifications */}
                  {note.userId === user?.id && (
                    <button
                      className="delete-notification-btn"
                      onClick={() => handleDelete(note.id)}
                      title="Delete notification"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NotificationPage;
