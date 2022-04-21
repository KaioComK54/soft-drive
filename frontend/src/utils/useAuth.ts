const setAuthToken = async (value: string) => {
  await localStorage.setItem("accessToken", value);
};

const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

const removeAuthToken = () => {
  localStorage.removeItem("accessToken");
};

export { setAuthToken, getAuthToken, removeAuthToken };
