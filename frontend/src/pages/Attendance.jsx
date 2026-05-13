import React, { useState } from 'react'
import SessionTimer from '../components/SessionTimer'
import RecentLogs from '../components/RecentLogs'
import ApplyLeave from './ApplyLeave'

const  Attendance = () => {


  return (
    <>
      <SessionTimer/>
      <RecentLogs/>
    </>
  )
}

export default Attendance
