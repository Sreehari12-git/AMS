import "./RecentLogs.css";

const RecentLogs = ({ logs }) => {

  return (
    <table className="logs-table">
      <thead>
        <tr>
          <th>DATE</th>
          <th>CHECKIN</th>
          <th>CHECKOUT</th>
          <th>TOTALTIME</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{new Date(log.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            })}</td>
            <td>{log.clockIn ? new Date(log.clockIn).toLocaleTimeString() : "-"}</td>
            <td>{log.clockOut ? new Date(log.clockOut).toLocaleTimeString() : "-"}</td>
            <td>{log.duration || "-"}</td>
            <td>{log.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentLogs;

