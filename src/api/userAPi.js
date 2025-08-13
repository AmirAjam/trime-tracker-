import axios from "../api/axiosConfig"

const getAllUsers = async (token) => {
    try {
        const response = await axios.get("/users", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response;
    } catch (err) {
        return err.response;
    }
};

const getUser = async (token) => {
    try {
        const response = await axios.get("/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response;
    } catch (err) {
        console.log(err);
        return err.response;
    }
};

export { getAllUsers,getUser }