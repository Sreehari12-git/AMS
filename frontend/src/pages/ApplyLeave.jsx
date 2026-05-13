import React, { useState } from 'react'
import { applyLeave } from '../api/leaveApi';
import "./ApplyLeave.css"

const ApplyLeave = () => {

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
      
    }catch(error) {
      setMessage(
        error.response?.data?.message
      );
    }
  };

   return (

    <div className="leave-container">

      <div className="leave-card">

        <h1 className="leave-title">
          Apply Leave
        </h1>

        <form
          className="leave-form"
          onSubmit={handleSubmit}
        >

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

            <option value="CASUAL">
              Paid Leave
            </option>

            <option value="PAID">
              Annual Leave
            </option>

          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
          />


          <button type="submit">
            Apply Leave
          </button>

        </form>

        <p>{message}</p>

      </div>

    </div>
  );
};


export default ApplyLeave
