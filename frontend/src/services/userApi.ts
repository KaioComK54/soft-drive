import axios from "./api.cofig";

const getUserInfo = async () =>
  await axios
    .get("/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);

export { getUserInfo };
