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
        <div className="residue-grid">

            <div className="residue-stat-card">
                <div className="residue-row">
                    <h3 className="stat-label">ANNUAL LEAVE</h3>
                    <span className="residue-remaining">{leaveBalance?.annual.remaining} Remaining</span>
                </div>
                <div className="residue-meta">
                    <p>Total: {leaveBalance?.annual.total}</p>
                    <p>Used: {leaveBalance?.annual.used}</p>
                </div>
            </div>

            <div className="residue-stat-card">
                <div className="residue-row">
                    <h3 className="stat-label">SICK LEAVE</h3>
                    <span className="residue-remaining">{leaveBalance?.sick.remaining} Remaining</span>
                </div>
                <div className="residue-meta">
                    <p>Total: {leaveBalance?.sick.total}</p>
                    <p>Used: {leaveBalance?.sick.used}</p>
                </div>
            </div>

            <div className="residue-stat-card">
                <div className="residue-row">
                    <h3 className="stat-label">REMOTE LEAVE</h3>
                    <span className="residue-remaining">{leaveBalance?.remote.remaining} Remaining</span>
                </div>
                <div className="residue-meta">
                    <p>Total: {leaveBalance?.remote.total}</p>
                    <p>Used: {leaveBalance?.remote.used}</p>
                </div>
            </div>

        </div>
    );

}

export default ResidueLeave