import axios from "services/api.cofig";

const getUserFiles = async () =>
  await axios
    .get("/file", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);

const sendUserFile = async (data: FormData) =>
  await axios
    .post(
      "file/upload",
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((response) => response)
    .catch((error) => error.response.status);

export { getUserFiles, sendUserFile };
