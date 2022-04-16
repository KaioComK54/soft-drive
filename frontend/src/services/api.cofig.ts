import axios from "axios";
import { getAuthToken } from "utils/useAuth";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: { Authorization: `Bearer ${getAuthToken()}` },
});

export default instance;
