import React from "react";

import { UserContexProvider } from "./UserContext";

const GlobalContext: React.FC = ({ children }) => {
  return <UserContexProvider>{children}</UserContexProvider>;
};

export default GlobalContext;
