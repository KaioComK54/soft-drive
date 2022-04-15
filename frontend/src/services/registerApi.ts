import axios from "./api.cofig";

interface DataType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const registerUser = async (data: DataType) =>
  await axios.post("/user", { ...data }).then((response) => response);

export { registerUser };
