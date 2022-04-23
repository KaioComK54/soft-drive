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

const getAFile = async (id: string) => {
  await axios
    .get(`/file/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      responseType: "blob",
    })
    .then((response) => {
      const file = new Blob([response.data], {
        type: "application/octet-stream",
      });

      const fileURL = URL.createObjectURL(file);
      const anchor = document.createElement("a");
      anchor.download = response.headers["filename"];
      anchor.href = fileURL;
      anchor.click();
    })
    .catch((error) => error);
};

const sendUserFile = async (data: FormData) =>
  await axios
    .post("file/upload", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response)
    .catch((error) => error.response);

const deleteAFile = async (id: string) => {
  await axios
    .delete(`file/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => response)
    .catch((error) => new Error(error));
};

export { getUserFiles, getAFile, sendUserFile, deleteAFile };
