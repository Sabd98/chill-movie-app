import axios from "axios";

const api = axios.create({
  baseURL: "https://chill-api-default-rtdb.asia-southeast1.firebasedatabase.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
