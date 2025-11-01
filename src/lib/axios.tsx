import axios from "axios";

const CNPJA_API_KEY = import.meta.env.VITE_CNPJA_KEY;


export const api = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        "Content-Type": "application/json"
    }
})
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("Token_TickDesk");
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

export const consultaCNPJ = axios.create({
    baseURL: "https://api.cnpja.com/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": CNPJA_API_KEY
    }
})