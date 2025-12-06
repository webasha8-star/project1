import React, { useState } from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "../context/NotificationContext"; // adjust path if needed

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <div className="notification-wrapper" style={{ position: "relative" }}>
      <button
        className="notification-btn"
        onClick={() => setOpen(!open)}
        title="Notifications"
      >
        <Bell size={22} />
        {unreadCount > 0 && <span className="notification-dot"></span>}
      </button>

      {open && (
        <div
          className="notification-dropdown"
          style={{
            position: "absolute",
            top: "35px",
            right: "0",
            width: "320px",
            background: "rgba(27,27,31,0.98)",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
            padding: "10px",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              paddingBottom: "5px",
              marginBottom: "10px",
            }}
          >
            <strong>Notifications</strong>
            <button
              onClick={markAllRead}
              style={{
                background: "none",
                border: "none",
                color: "#22c55e",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              Mark all
            </button>
          </div>

          {notifications.length === 0 ? (
            <p style={{ textAlign: "center", color: "#9ca3af", padding: "10px 0" }}>
              No notifications yet
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                style={{
                  padding: "10px",
                  marginBottom: "8px",
                  borderRadius: "6px",
                  background: n.isRead ? "transparent" : "rgba(34,197,94,0.05)",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
              >
                <div style={{ fontWeight: 600, color: "#22c55e" }}>
                  {n.title || "New Update"}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#f8fafc" }}>{n.message}</div>
                <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
