import React, { useState } from 'react'
import { applyLeave } from '../api/leaveApi';
import "./ApplyLeave.css"
import ResidueLeave from '../components/ResidueLeaves';
import MyLeaves from '../components/MyLeaves';
import { Navigate, useNavigate } from 'react-router-dom';

const ApplyLeave = () => {

  const navigate = useNavigate();

  const[leaveType, setLeaveType] = useState("");
  const[startDate, setStartDate] = useState("");
  const[endDate, setEndDate] = useState("");
  const[message,setMessage] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const leaveData =  {
        type: leaveType,
        startDate,
        endDate
      }

      const data = await applyLeave(leaveData);
      setMessage(data.message);
       setLeaveType("");
      setStartDate("");
      setEndDate("");
      navigate("/leave-status");

      
    }catch(error) {
      setMessage(
        error.response?.data?.message
      );
    }
  };

  return (
  <div className="leave-container">

    <ResidueLeave />

    <div className="leave-card">

      <div className="leave-header">
        <h1 className="leave-title">
          Apply Leave
        </h1>

        <p className="leave-subtitle">
          Submit your leave request easily
        </p>
      </div>

      {message && (
        <div className="leave-message">
          {message}
        </div>
      )}

      <form
        className="leave-form"
        onSubmit={handleSubmit}
      >

        <div className="leave-field">
          <label>Leave Type</label>

          <select
            value={leaveType}
            onChange={(e) =>
              setLeaveType(e.target.value)
            }
          >

            <option value="">
              Select Leave
            </option>

            <option value="SICK">
              Sick Leave
            </option>

            <option value="REMOTE">
              Remote Leave
            </option>

            <option value="ANNUAL">
              Annual Leave
            </option>

          </select>
        </div>

        <div className="date-grid">

          <div className="leave-field">
            <label>Start Date</label>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
            />
          </div>

          <div className="leave-field">
            <label>End Date</label>

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(e.target.value)
              }
            />
          </div>

        </div>

        <button type="submit">
          Apply Leave
        </button>

      </form>

    </div>
  </div>
);
};


export default ApplyLeave
