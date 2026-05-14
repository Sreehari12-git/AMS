import { useEffect } from "react";
import { useState } from "react";
import { allLeaves, updateLeave } from "../api/leaveApi";
import "./LeaveRequest.css";

const LeaveRequest = () => {
  const [LeaveRequest, setLeaveRequest] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await allLeaves();
        setLeaveRequest(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequests();
  }, []);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });

  const handleStatus = async (leaveId, status) => {
    try {
      await updateLeave(leaveId, status);
      const data = await allLeaves();
      setLeaveRequest(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lr-wrapper">
      <h2 className="lr-title">Leave Requests</h2>

      {LeaveRequest.length === 0 ? (
        <p className="lr-empty">No leave requests</p>
      ) : (
        LeaveRequest.map((leave) => {
          const start = new Date(leave.startDate);
          const end = new Date(leave.endDate);
          const days = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

          return (
            <div key={leave.id} className="lr-card">
              <p className="lr-field"><span className="lr-key">Name</span>{leave.user.full_name}</p>
              <p className="lr-field"><span className="lr-key">Type</span>{leave.type}</p>
              <p className="lr-field">
                <span className="lr-key">Status</span>
                <span className={`lr-badge lr-badge-${leave.status.toLowerCase()}`}>
                  {leave.status}
                </span>
              </p>
              <p className="lr-field">
                <span className="lr-key">Dates</span>
                {formatDate(start)} — {formatDate(end)} ({days} {days === 1 ? "Day" : "Days"})
              </p>
              {leave.status === "PENDING" && (
                <div className="lr-actions">
                  <button className="lr-btn lr-approve" onClick={() => handleStatus(leave.id, "APPROVED")}>Approve</button>
                  <button className="lr-btn lr-reject" onClick={() => handleStatus(leave.id, "REJECTED")}>Reject</button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default LeaveRequest;