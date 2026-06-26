import { useEffect } from "react";
import { useState } from "react"
import { getLeaveBalance } from "../api/leaveApi";
import "./ResidueLeave.css"

const ResidueLeave = () => {
    const[leaveBalance,setLeaveBalance] = useState(null);

    useEffect(() => {
        const fetchLeaveBalance = async() => {
            const data = await getLeaveBalance();
            setLeaveBalance(data);
        }
        fetchLeaveBalance();
    },[]);

     return (
        <div className="leave-grid">

            <div className="leave-card blue">
                <div className="card-header">
                    <h3 className="card-label">ANNUAL LEAVE</h3>
                    <span className="card-remaining">{leaveBalance?.annual.remaining} Remaining</span>
                </div>
                <div className="card-meta">
                    <p>Total: {leaveBalance?.annual.total}</p>
                    <p>Used: {leaveBalance?.annual.used}</p>
                </div>
            </div>

            <div className="leave-card green">
                <div className="card-header">
                    <h3 className="card-label">SICK LEAVE</h3>
                    <span className="card-remaining">{leaveBalance?.sick.remaining} Remaining</span>
                </div>
                <div className="card-meta">
                    <p>Total: {leaveBalance?.sick.total}</p>
                    <p>Used: {leaveBalance?.sick.used}</p>
                </div>
            </div>

            <div className="leave-card amber">
                <div className="card-header">
                    <h3 className="card-label">REMOTE LEAVE</h3>
                    <span className="card-remaining">{leaveBalance?.remote.remaining} Remaining</span>
                </div>
                <div className="card-meta">
                    <p>Total: {leaveBalance?.remote.total}</p>
                    <p>Used: {leaveBalance?.remote.used}</p>
                </div>
            </div>

        </div>
    );

}

export default ResidueLeave