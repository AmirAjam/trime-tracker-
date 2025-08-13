import axios from "../api/axiosConfig"

const loginUser = async (data) => {
    try {
        const response = await axios.post("/auth/login", {
            email:data.email,
            password:data.password
        })
        return response
    } catch (err) {
        return err.response
    }
}

export { loginUser }