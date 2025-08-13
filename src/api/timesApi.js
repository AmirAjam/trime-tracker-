import axios from "../api/axiosConfig"

const getTimes = async (day, token) => {
    console.log(token)
    try {
        const response = await axios.get("/time-entries", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: { day }
        });
        return response;
    } catch (err) {
        console.log(err);
        return err.response;
    }
};

export { getTimes }