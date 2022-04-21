import axios from "./api.cofig";

export interface DataType {
  email: string;
  password: string;
}

const loginApi = async (data: DataType) =>
  await axios
    .post("/auth/signin", { ...data })
    .then((response) => response)
    .catch((error) => error.response.status);

export default loginApi;
