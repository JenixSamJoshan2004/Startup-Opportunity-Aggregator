import axios from "axios";

const API = axios.create({
  baseURL: "https://startup-opportunity-aggregator-backend.onrender.com/api",
});

export default API;
