import axios from "../api/axiosConfig"

const getTimes = async (day, token) => {
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

const getOtherUserTimes = async (day,id,token) => {
    try {
        const response = await axios.get(`time-entries/${id}`, {
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

const putEditTime = async (id, data, token) => {
    try {
        const response = await axios.put(`/time-entries/${id}`,
            data,
            {
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

const stopTask = async (id, token) => {
    try {
        const response = await axios.post(`/time-entries/${id}/stop`,
            {},
            {
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

const addTask = async (token) => {
    try {
        const response = await axios.post(`/time-entries/start`,
            {},
            {
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

const addManualTask = async (data,token) => {
    try {
        const response = await axios.post(`/time-entries/start`,
            data,
            {
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

const deleteTask = async (id,token) => {
    try {
        const response = await axios.delete(`/time-entries/${id}`,
            {
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
export { getTimes, putEditTime, stopTask,addTask , deleteTask,addManualTask,getOtherUserTimes}