import React, { createContext, useEffect, useState } from "react";
import { useAsyncFn } from "react-use";
import { getUserInfo } from "services/userApi";
import useRedirectLogin from "utils/useRedirectLogin";

type UserData = {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  updatedAt: string;
  fetchUserData: Function;
};

const initial = {
  createdAt: "",
  email: "",
  firstName: "",
  id: "",
  lastName: "",
  updatedAt: "",
  fetchUserData: () => {},
};

const UserContext = createContext<UserData>(initial);

const UserContexProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(initial);
  const [userDataFetch, userDataRequest] = useAsyncFn(getUserInfo);
  const { redirectToLogin } = useRedirectLogin();

  useEffect(() => {
    if (userDataFetch.loading) return;

    if (userDataFetch.value?.data) {
      setUserData(userDataFetch.value?.data);
    }

    if (userDataFetch.value?.response?.status === 401) {
      redirectToLogin();
    }
  }, [userDataFetch]);

  const fetchUserData = () => userDataRequest();

  return (
    <UserContext.Provider
      value={{
        ...userData,
        fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContexProvider };
export default UserContext;
