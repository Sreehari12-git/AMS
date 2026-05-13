import api from "./axios";

export const markAttendance = async() => {
    const response = await api.post("/attendance/clock-in");
    return response.data;
}

export const clockOut = async() => {
    const response = await api.post("/attendance/check-out");
    return response.data;
}