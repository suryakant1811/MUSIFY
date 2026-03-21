// import axios from "axios"

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.MODE === "development" ? "http://localhost:7000/api" : "/api",
  
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })


import axios from "axios";

// Use environment variable first, fallback to localhost for dev
const BASE_URL = import.meta.env.VITE_API_URL || 
                 (import.meta.env.MODE === "development" ? "http://localhost:7000/api" : "/api");

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
