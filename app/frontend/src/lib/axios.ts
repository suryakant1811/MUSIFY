import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "https://musify-1-nxyi.onrender.com",
  
  headers: {
    'Content-Type': 'application/json'
  }
})