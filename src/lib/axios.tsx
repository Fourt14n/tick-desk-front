import axios from "axios";

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
    baseURL: "https://open.cnpja.com/office/",
    headers: {
        "Content-Type": "application/json"
    }
})