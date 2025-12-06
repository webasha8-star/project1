import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Users,
  FilePlus,
  Folder,
  Bell,
  Home,
  FileText,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  const linkStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 15px",
    borderRadius: "6px",
    color: isActive ? "#000" : "white",
    background: isActive ? "#22c55e" : "transparent",
    textDecoration: "none",
    fontWeight: "500",
    transition: "all 0.2s ease",
    fontSize: "14px",
  });

  return (
    <>
      {/* Header */}
      <Header />

      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="dark"
        style={{ zIndex: 2000 }}
      />

      <div
        style={{
          display: "flex",
          background: "#0f0f10",
          color: "white",
          fontFamily: "Poppins, sans-serif",
          minHeight: "100vh",
        }}
      >
        {/* Sidebar (Overlay) */}
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: open ? "0" : "-240px",
            width: "240px",
            background: "#1b1b1f",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            height: "calc(100vh - 80px)",
            boxShadow: open ? "4px 0 12px rgba(0,0,0,0.5)" : "none",
            transition: "left 0.3s ease",
            zIndex: 1500,
          }}
        >
          <h2
            style={{
              color: "#22c55e",
              fontSize: "22px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            Admin Panel
          </h2>

          <NavLink
            to="/admin"
            end
            style={({ isActive }) => linkStyle(isActive)}
          >
            <Home size={18} /> Dashboard
          </NavLink>

          <NavLink
            to="/admin/submissions"
            style={({ isActive }) => linkStyle(isActive)}
          >
            <FileText size={18} /> Submissions
          </NavLink>

          <NavLink
            to="/admin/users"
            style={({ isActive }) => linkStyle(isActive)}
          >
            <Users size={18} /> Users
          </NavLink>

          <NavLink
            to="/admin/labs"
            style={({ isActive }) => linkStyle(isActive)}
          >
            <FilePlus size={18} /> Labs
          </NavLink>

          <NavLink
            to="/admin/challenges"
            style={({ isActive }) => linkStyle(isActive)}
          >
            <Folder size={18} /> Challenges
          </NavLink>

          <NavLink
            to="/admin/communication"
            style={({ isActive }) => linkStyle(isActive)}
          >
            <Bell size={18} /> Communication
          </NavLink>

          <NavLink
            to="/admin/contact-queries"
            style={({ isActive }) => linkStyle(isActive)}
          >
            <FileText size={18} /> User Contact
          </NavLink>

          <NavLink
            to="/admin/manage-faqs"
            style={({ isActive }) => linkStyle(isActive)}
          >
            <FileText size={18} /> User FAQs
          </NavLink>
        </div>

        {/* Arrow Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            position: "fixed",
            top: "100px",
            left: open ? "245px" : "15px",
            zIndex: 1600,
            background: "#22c55e",
            color: "#000",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "left 0.3s ease, transform 0.2s ease",
          }}
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        {/* Overlay Background (Click to Close) */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              top: "80px",
              left: 0,
              width: "100%",
              height: "calc(100vh - 80px)",
              background: "rgba(0, 0, 0, 0.4)",
              zIndex: 1000,
              transition: "opacity 0.3s ease",
            }}
          />
        )}

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: "40px",
            paddingTop: "120px",
            width: "100%",
            minHeight: "100vh",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
