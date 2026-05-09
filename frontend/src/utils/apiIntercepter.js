import axios from "axios"
import { SERVER } from "../constants/constant.js"

const api = axios.create({ // create axios instance
    baseURL:SERVER,
    withCredentials:true, //cookie are sent
});

export default api;
