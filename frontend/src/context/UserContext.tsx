import React, { createContext, useEffect, useState } from "react";
import { useAsyncFn } from "react-use";
import { getUserInfo } from "services/userApi";

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

  useEffect(() => {
    if (userDataFetch.loading) return;

    if (userDataFetch.value?.data) {
      setUserData(userDataFetch.value?.data);
    }
  }, [userDataFetch]);

  const fetchUserData = async () => await userDataRequest();

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
