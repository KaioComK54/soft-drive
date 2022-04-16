import axios from "./api.cofig";

export interface DataTypeComplete {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type DataType = Omit<DataTypeComplete, "confirmPassword">;

const registerApi = async (data: DataType) =>
  await axios
    .post("/user", { ...data })
    .then((response) => response)
    .catch((error) => error.response.status);

export default registerApi;
