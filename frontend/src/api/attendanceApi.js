import api from "./axios";

export const markAttendance = async() => {
    const response = await api.post("/attendance/check-in");
    return response.data;
}

export const markOutAttendance = async() => {
    const response = await api.post("/attendance/check-out");
    return response.data;
}

export const today = async() => {
    const response = await api.get("/attendance/today");
    return response.data;
}


export const getMyAttendance = async() => {
    const response = await api.get("/attendance/my");
    return response.data;
}


export const getCurrentSession = async() => {
   const response = await api.get("/attendance/current");
   return response.data;
}