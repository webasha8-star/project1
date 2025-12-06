
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./AuthContext";
import { AnnouncementProvider } from "./context/AnnouncementContext";
import ScrollToTop from "./ScrollToTop";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// User & Public Pages
import NotificationPage from "./pages/NotificationPage";
import DashboardPage from "./pages/DashboardPage";
import OSCPStyleExercise from "./pages/OSCPStyleExercise";
import OscpCertificate from "./pages/OSCP_Certificate"; // FIXED
import Profile from "./pages/Profile";
import EpicGallery from "./pages/EpicGallery";
import OurFAQ from "./pages/OurFAQ";
import Testimonial from "./pages/Testimonial";
import UpcomingChallenges from "./pages/UpcomingChallenges";
import HistoricalChallenges from "./pages/HistoricalChallenges";
import Leaderboard from "./pages/Leaderboard";
import TrainingPath from "./pages/TrainingPath";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Levels from "./pages/Levels";
import LabPage from "./pages/LabPage";
import ContactUs from "./pages/ContactUs";

// Admin Imports
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ManageUsers from "./admin/users/ManageUsers";
import ManageLabs from "./admin/labs/ManageLabs";
import CreateLab from "./admin/labs/CreateLab";
import EditLab from "./admin/labs/EditLab";
import AdminSubmissions from "./admin/submissions/AdminSubmissions";
// import UpcomingChallengesAdmin from "./admin/challenges/UpcomingChallenges"; // REMOVED
import HistoricalChallengesAdmin from "./admin/challenges/HistoricalChallenges";
import AnalyticsDashboard from "./admin/analytics/AnalyticsDashboard";
import Announcements from "./admin/communication/Announcements";
import SystemSettings from "./admin/settings/SystemSettings";
import AdminContactQueries from "./admin/admincontactqueries/AdminContactQueries";
import AdminFAQManager from "./admin/AdminFAQManager/AdminFAQManager";
import AdminChallengeManager from "./admin/adminChallengeManager/AdminChallengeManager";
import MyFAQ from "./pages/MyFAQ";

function App() {
  return (
    <AuthProvider>
      <AnnouncementProvider>
        <Router>
          <ScrollToTop />
          <Toaster position="bottom-right" />
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />

          <Routes>
            {/* User Routes */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="/labs/:id" element={<LabPage />} />
            <Route path="/oscp-style-exercise" element={<OSCPStyleExercise />} />
            <Route path="/OSCP_Certificate" element={<OscpCertificate />} /> {/* FIXED */}
            <Route path="/upcoming-challenges" element={<UpcomingChallenges />} />
            <Route path="/historical-challenges" element={<HistoricalChallenges />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/training-path" element={<TrainingPath />} />
            <Route path="/gallery" element={<EpicGallery />} />
            <Route path="/faq" element={<OurFAQ />} />
            <Route path="/testimonial" element={<Testimonial />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/my-faq" element={<MyFAQ />} />

            {/* Admin Panel */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="submissions" element={<AdminSubmissions />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="labs" element={<ManageLabs />} />
              <Route path="labs/create" element={<CreateLab />} />
              <Route path="labs/edit/:id" element={<EditLab />} />
              <Route path="challenges" element={<AdminChallengeManager />} />
              <Route path="challenges/history" element={<HistoricalChallengesAdmin />} />
              <Route path="analytics" element={<AnalyticsDashboard />} />
              <Route path="communication" element={<Announcements />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route path="contact-queries" element={<AdminContactQueries />} />
              <Route path="manage-faqs" element={<AdminFAQManager />} />
            </Route>

            {/* Redirects */}
            <Route path="/admin-dashboard" element={<Navigate to="/admin" replace />} />
            <Route path="/admin-login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AnnouncementProvider>
    </AuthProvider>
  );
}

export default App;
