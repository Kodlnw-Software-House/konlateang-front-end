import axios from "axios";

let userToken = localStorage.getItem("user");

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_MAIN_URL,
  headers: { Authorization: `Bearer ${userToken}` },
});
