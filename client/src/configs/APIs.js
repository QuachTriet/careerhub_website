import axios from "axios";
import cookie from "js-cookie";

const BASE_URL = "http://localhost:3000/api";

export const endpoints = {
    "login": "/login",
    "register": "/register",
    "profile": "/profile",
};

export const authAPIs = () => {
    const token = cookie.load('access-token');
    return axios.create({
        baseURL: BASE_URL,
        headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
};

export default axios.create({
    baseURL: BASE_URL,
});
