import axios from "axios";
import api from "./axios";

export const loginUser = async(email,password) => {
    try {
        const response = await api.post("/login", {
            email,
            password
        })

        return response.data
    } catch(error) {
        console.log(error);
        
        throw new Error(
            error.response?.data?.message || "Server Error"
        )
    }
}
