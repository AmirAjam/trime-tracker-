import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://clockin.liara.run/",
  headers: {
    "Content-Type": "application/json"
  }
})

export default axiosInstance