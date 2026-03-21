import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:7000/api" : "https://musify-1-nxyi.onrender.com",
  
  headers: {
    'Content-Type': 'application/json'
  }
})