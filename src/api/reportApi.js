import axios from "../api/axiosConfig"


const getAllUsersDailyTime = async (day,token) => {
    try {
        const response = await axios.get(`reports/daily`, {
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

const getAllUsersWeeklyTime = async (saturday,currentDay,token) => {
    console.log("saturday => ",saturday)
    console.log("currentDay => ",currentDay)
    try {
        const response = await axios.get(`reports/`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: { startDate:saturday,endDate:currentDay }
        });
        return response;
    } catch (err) {
        console.log(err);
        return err.response;
    }
};

export {getAllUsersDailyTime,getAllUsersWeeklyTime}
