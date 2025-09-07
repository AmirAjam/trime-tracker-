import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://time-tracker.liara.run",
  headers: {
    "Content-Type": "application/json"
  }
})

export default axiosInstance