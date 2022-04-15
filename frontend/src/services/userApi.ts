import axios from "./api.cofig";

const getUserInfo = async () =>
  await axios.get("/user/me").then((response) => response);

export { getUserInfo };
