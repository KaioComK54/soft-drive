import axios from "./api.cofig";

interface DataTypeComplete {
  firstName: string;
  lastName: string;
  oldPassword: string;
  newPassword: string;
}

export type IMyData = Omit<DataTypeComplete, "oldPassword" | "newPassword">;

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

const saveUserProfile = async (data: IMyData) =>
  await axios
    .patch("/user/profile", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response)
    .catch((error) => error.response.status);

const saveUserPassword = async (data: IMyPassword) =>
  await axios
    .patch("/user/change-password", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response)
    .catch((error) => error.response.status);

export { getUserInfo, saveUserData, saveUserProfile, saveUserPassword };
