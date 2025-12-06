import React, { useEffect, useRef } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // auto-registers ChartJS globally (no unused imports)
import "./Analytics.css";

const AnalyticsDashboard = () => {
  // Chart Refs to safely destroy instances (React 18 fix)
  const chartRefs = useRef([]);

  useEffect(() => {
    return () => {
      // Cleanup all chart instances on unmount
      chartRefs.current.forEach((chart) => {
        if (chart) chart.destroy();
      });
    };
  }, []);

  // DUMMY DATA — completely frontend only
  const summary = {
    totalAttempts: 312,
    avgSuccessRate: 74,
    avgCompletionTime: 10,
    activeUsers: 27,
  };

  const userGrowthData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "New Users",
        data: [8, 14, 21, 27],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.3)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const labPopularityData = {
    labels: ["SQL Injection", "XSS", "Privilege Escalation", "File Upload"],
    datasets: [
      {
        label: "Attempts",
        data: [45, 38, 26, 32],
        backgroundColor: "#22c55e",
      },
    ],
  };

  const challengeRateData = {
    labels: ["Success", "Failed"],
    datasets: [
      {
        data: [74, 26],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  const dailyActivityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Submissions",
        data: [12, 18, 25, 22, 29, 20, 15],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.3)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="analytics-page">
      <h2 className="analytics-title">Platform Analytics Overview</h2>

      {/* Summary Cards */}
      <div className="analytics-summary">
        <div className="summary-card">
          <h4>Total Lab Attempts</h4>
          <p>{summary.totalAttempts}</p>
        </div>

        <div className="summary-card">
          <h4>Avg Success Rate</h4>
          <p>{summary.avgSuccessRate}%</p>
        </div>

        <div className="summary-card">
          <h4>Avg Completion Time</h4>
          <p>{summary.avgCompletionTime} min</p>
        </div>

        <div className="summary-card">
          <h4>Active Users (7d)</h4>
          <p>{summary.activeUsers}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        <div className="chart-card">
          <h3>User Growth Over Time</h3>
          <Line
            data={userGrowthData}
            options={{ maintainAspectRatio: false, responsive: true }}
            ref={(el) => (chartRefs.current[0] = el)}
          />
        </div>

        <div className="chart-card">
          <h3>Most Popular Labs</h3>
          <Bar
            data={labPopularityData}
            options={{ maintainAspectRatio: false, responsive: true }}
            ref={(el) => (chartRefs.current[1] = el)}
          />
        </div>

        <div className="chart-card">
          <h3>Challenge Success Rate</h3>
          <Doughnut
            data={challengeRateData}
            options={{ maintainAspectRatio: false, responsive: true }}
            ref={(el) => (chartRefs.current[2] = el)}
          />
        </div>

        <div className="chart-card">
          <h3>Daily Platform Activity</h3>
          <Line
            data={dailyActivityData}
            options={{ maintainAspectRatio: false, responsive: true }}
            ref={(el) => (chartRefs.current[3] = el)}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
