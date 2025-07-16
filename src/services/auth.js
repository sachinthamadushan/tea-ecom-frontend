import API from "./api";

export const register = (userData) => {
    try {
       const response = API.post("users/register", userData);
       return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (credentials) => {
    try {
       const response = await API.post("users/login", credentials);
       return response.data; 
    } catch (error) {
        throw error.response.data;
    }
};

export const getProfile = async () => {
    try {
       const response = await API.get("users/profile");
       return response.data; 
    } catch (error) {
        throw error.response.data;
    }
};
