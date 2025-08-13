const getTimes = async (day) => {
    try {
        const response = await axios.get("/auth/login", {
            day:day
        })
        console.log(response)
        return response
    } catch (err) {
        return err.response
    }
}

export {getTimes}