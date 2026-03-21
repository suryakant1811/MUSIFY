import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://musify-1-nxyi.onrender.com/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})