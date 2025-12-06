import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { Users, FlaskConical, FolderKanban } from "lucide-react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./AdminDashboard.css";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);

  const [stats, setStats] = useState({
    users: 0,
    admins: 0,
    labs: 0,
    challenges: 0,
  });

  const [weeklyData, setWeeklyData] = useState([0, 0, 0, 0, 0, 0, 0]); // Mon–Sun
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // USERS
        const userRes = await axios.get(
          "http://localhost:5000/api/users/admin/users",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const users = userRes.data || [];
        const adminCount = users.filter(
          (u) => u.role?.toUpperCase() === "ADMIN"
        ).length;
        const userCount = users.filter(
          (u) => u.role?.toUpperCase() !== "ADMIN"
        ).length;

        // LAB COUNT
        const labRes = await axios.get("http://localhost:5000/api/labs");
        const labs = Array.isArray(labRes.data) ? labRes.data.length : 0;

        // CHALLENGES COUNT (optional)
        let challenges = 0;
        try {
          const chalRes = await axios.get(
            "http://localhost:5000/api/challenges"
          );
          challenges = Array.isArray(chalRes.data)
            ? chalRes.data.length
            : 0;
        } catch {}

        setStats({
          users: userCount,
          admins: adminCount,
          labs,
          challenges,
        });

        // WEEKLY SUBMISSIONS
        const weekRes = await axios.get(
          "http://localhost:5000/api/labs/submissions",
          { headers: { Authorization: `Bearer ${token}` } }      
        );

        const submissions = weekRes.data || [];

        // Count submissions by day
        const weeklyCounts = [0, 0, 0, 0, 0, 0, 0]; // Mon–Sun

        submissions.forEach((s) => {
          const day = new Date(s.createdAt).getDay(); // 0=Sun
          const index = day === 0 ? 6 : day - 1; // convert → Mon=0
          weeklyCounts[index]++;
        });

        setWeeklyData(weeklyCounts);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  // 📊 Dynamic Bar Chart
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Labs Completed",
        data: weeklyData,
        backgroundColor: "#22c55e",
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ["Admins", "Users"],
    datasets: [
      {
        data: [stats.admins, stats.users],
        backgroundColor: ["#22c55e", "#1e293b"],
        borderColor: "#22c55e",
      },
    ],
  };

  if (loading) {
    return (
      <div className="admin-loading">Loading admin dashboard...</div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">
          Welcome back, Admin — here's your live platform overview.
        </p>
      </header>

      {/* Stats */}
      <div className="admin-card-grid">
        <div className="admin-card">
          <div>
            <p className="admin-card-title">Total Users</p>
            <h2 className="admin-card-value">{stats.users}</h2>
          </div>
          <Users size={40} color="#22c55e" />
        </div>

        <div className="admin-card">
          <div>
            <p className="admin-card-title">Admins</p>
            <h2 className="admin-card-value">{stats.admins}</h2>
          </div>
          <Users size={40} color="#22c55e" />         
        </div>

        <div className="admin-card">
          <div>
            <p className="admin-card-title">Active Labs</p>
            <h2 className="admin-card-value">{stats.labs}</h2>
          </div>
          <FlaskConical size={40} color="#22c55e" />
        </div>

        <div className="admin-card">
          <div>
            <p className="admin-card-title">Challenges</p>
            <h2 className="admin-card-value">{stats.challenges}</h2>
          </div>
          <FolderKanban size={40} color="#22c55e" />
        </div>
      </div>

      {/* Charts */}
      <div className="admin-chart-grid">
        <div className="admin-chart-box">
          <h2 className="admin-chart-title">Weekly Lab Completions</h2>
          <Bar data={barData} />
        </div>
        <div className="admin-chart-box">
          <h2 className="admin-chart-title">User Role Distribution</h2>
          <div className="admin-chart-center">
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
