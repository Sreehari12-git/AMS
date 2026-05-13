import { useEffect, useState } from "react";
import { getMyAttendance } from "../api/attendanceApi";
import "./RecentLogs.css";

const RecentLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getMyAttendance();
        setLogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLogs();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "--:--";
    return new Date(timeStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "PRESENT": return "badge-present";
      case "APPROVED": return "badge-approved";
      case "ABSENT": return "badge-absent";
      default: return "badge-present";
    }
  };

  return (
    <div className="logs-wrapper">
      <div className="logs-header">
        <h2 className="logs-title">Recent Logs</h2>
      </div>

      <div className="logs-table-wrapper">
        <table className="logs-table">
          <thead>
            <tr>
              <th>DATE</th>
              <th>CHECK IN</th>
              <th>CHECK OUT</th>
              <th>TOTAL TIME</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{formatDate(log.date)}</td>
                <td className="checkin-time">{formatTime(log.clockIn)}</td>
                <td>{log.clockOut ? formatTime(log.clockOut) : "--:--"}</td>
                <td>{log.clockOut ? log.duration : "In Progress"}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(log.status)}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan="6" className="no-data">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLogs;