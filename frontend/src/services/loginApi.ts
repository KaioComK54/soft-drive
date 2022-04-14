import axios from "./api.cofig";

export interface DataType {
  email: string;
  password: string;
}

const loginApi = (data: DataType) =>
  axios.post("/login", { data }).then((response) => response);

export default loginApi;
