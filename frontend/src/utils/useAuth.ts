const setAuthToken = (value: string) => {
  localStorage.setItem("accessToken", value);
};

const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

export { setAuthToken, getAuthToken };
