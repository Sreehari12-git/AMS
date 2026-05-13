import { useEffect, useState } from "react";
import { markAttendance, markOutAttendance } from "../api/attendanceApi";
import "./SessionTimer.css";

const SessionTimer = () => {
  const [message, setMessage] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${sec}`;
  };

  const clockIn = async () => {
    try {
      const data = await markAttendance();
      setRunning(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error clocking in");
    }
  };

  const clockOut = async () => {
    try {
      const data = await markOutAttendance();
      setRunning(false);
      setSeconds(0);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error clocking out");
    }
  };

  return (
    <div className="timer-card">
      <div className="timer-left">
        <span className={`timer-badge ${running ? "badge-active" : "badge-idle"}`}>
          <span className="timer-dot" />
          {running ? "ACTIVE SESSION" : "NOT CHECKED IN"}
        </span>

        <p className="timer-title">
          {running ? "You are currently Checked In" : "You are not checked in"}
        </p>

        <div className="timer-actions">
          <button className="btn btn-primary" onClick={clockIn} disabled={running}>
            Clock In
          </button>
          <button className="btn btn-outline" onClick={clockOut} disabled={!running}>
            Clock Out
          </button>
        </div>

        {message && <p className="timer-msg">{message}</p>}
      </div>

      <div className="timer-right">
        <p className="dur-label">DURATION</p>
        <p className={running ? "dur-value active" : "dur-value idle"}>
          {formatTime()}
        </p>
      </div>
    </div>
  );
};

export default SessionTimer;

