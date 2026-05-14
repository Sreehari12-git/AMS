import { useEffect, useState } from "react";
import { getMyLeaves } from "../api/leaveApi";
import "./MyLeave.css";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await getMyLeaves();
      setLeaves(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-wrapper">
      <h2 className="ml-title">My Leave Requests</h2>

      <div className="ml-card">
        <table className="ml-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.type}</td>

                <td>
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>

                <td>
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>

                <td>
                  <span className={`ml-status ${leave.status}`}>
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLeaves;