import axios from "./api.cofig";

interface DataTypeComplete {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export type IMyData = Omit<DataTypeComplete, "password" | "confirmPassword">;

export type IMyPassword = Omit<DataTypeComplete, "firstName" | "lastName">;

const getUserInfo = async () =>
  await axios
    .get("/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);

const saveUserData = async (data: IMyData) =>
  await axios
    .post("/user/me", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);

const saveUserPassword = async (data: IMyPassword) =>
  await axios
    .post("/user/me", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);

export { getUserInfo, saveUserData, saveUserPassword };
