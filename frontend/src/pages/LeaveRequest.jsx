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
    new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

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
    <div className="lr-header">
      <h2 className="lr-title">Leave Requests</h2>
    </div>

    <div className="lr-table-wrap">
      <table className="lr-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>TYPE</th>
            <th>DATES</th>
            <th>DURATION</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {LeaveRequest.length === 0 ? (
            <tr>
              <td colSpan={6} className="lr-empty">No leave requests</td>
            </tr>
          ) : (
            LeaveRequest.map((leave) => {
              const start = new Date(leave.startDate);
              const end = new Date(leave.endDate);
              const days = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

              return (
                <tr key={leave.id} className="lr-row">
                  <td className="lr-name">{leave.user.full_name}</td>
                  <td>
                    <span className="lr-type">
                      <span className="lr-type-dot" />
                      {leave.type}
                    </span>
                  </td>
                  <td className="lr-date">
                    {formatDate(leave.startDate)} — {formatDate(leave.endDate)}
                  </td>
                  <td className="lr-duration">
                    {days} {days === 1 ? "Day" : "Days"}
                  </td>
                  <td>
                    <span className={`lr-badge lr-badge-${leave.status.toLowerCase()}`}>
                      <span className="lr-badge-dot" />
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    {leave.status === "PENDING" ? (
                      <div className="lr-actions">
                        <button className="lr-btn lr-approve" onClick={() => handleStatus(leave.id, "APPROVED")}>Approve</button>
                        <button className="lr-btn lr-reject" onClick={() => handleStatus(leave.id, "REJECTED")}>Reject</button>
                      </div>
                    ) : (
                      <span className="lr-no-action">—</span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default LeaveRequest;