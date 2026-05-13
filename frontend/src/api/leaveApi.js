import api from "./axios";

export const applyLeave = async(leaveData) => {
    const response = await api.post("/leave/apply", leaveData);
    return response.data;
}