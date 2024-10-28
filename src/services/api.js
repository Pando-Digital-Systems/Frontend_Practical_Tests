import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_WORKSPECTATION,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
export default apiClient;
