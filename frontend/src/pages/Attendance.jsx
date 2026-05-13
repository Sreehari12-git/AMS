import React, { useEffect, useState } from 'react'
import SessionTimer from '../components/SessionTimer'
import RecentLogs from '../components/RecentLogs'
import ApplyLeave from './ApplyLeave'
import { getMyAttendance } from '../api/attendanceApi'

const  Attendance = () => {
  const[logs,setLogs] = useState([]);
  const fetchLogs = async() => {
    try {
      const data = await getMyAttendance();
      setLogs(data);
      }
      catch(error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchLogs();
  },[]);


  return (
    <>
      <SessionTimer fetchLogs={fetchLogs}/>
      <RecentLogs logs={logs}/>
    </>
  )
}

export default Attendance
