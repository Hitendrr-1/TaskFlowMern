import axios from "axios";

const API = axios.create({
  baseURL: "https://taskflow-1-e08k.onrender.com/api",
});

export default API;