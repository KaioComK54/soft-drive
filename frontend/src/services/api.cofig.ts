import axios from "axios";

const token = "any";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: { Authorization: `Basic ${token}` },
});

export default instance;
