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
};

const initial = {
  createdAt: "",
  email: "",
  firstName: "",
  id: "",
  lastName: "",
  updatedAt: "",
};

const UserContext = createContext<UserData>(initial);

const UserContexProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(initial);
  const [userDataFetch, userDataRequest] = useAsyncFn(getUserInfo);

  useEffect(() => {
    userDataRequest();
  }, []);

  useEffect(() => {
    if (userDataFetch.loading) return;

    if (userDataFetch.value?.data) {
      setUserData(userDataFetch.value?.data);
    }
  }, [userDataFetch]);

  return (
    <UserContext.Provider
      value={{
        ...userData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContexProvider };
export default UserContext;
