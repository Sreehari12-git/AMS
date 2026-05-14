import api from "./axios";

export const applyLeave = async(leaveData) => {
    const response = await api.post("/leave/apply", leaveData);
    return response.data;
}

export const getLeaveBalance = async() => {
    const response = await api.get("/leave/leave-balance")
    return response.data;
}

export const allLeaves = async() => {
    const response = await api.get("/leave/all");
    return response.data;
}

export const updateLeave = async(leaveId,status) => {
    const response = await api.put("/leave/update", {
        leaveId,
        status
    });
    return response.data;
}

export const getMyLeaves = async() => {
    const response = await api.get("/leave/myleaves");
    return response.data;
}