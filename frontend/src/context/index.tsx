import React from "react";

import { UserContexProvider } from "./UserContext";
import { UserFileContexProvider } from "./UserFileContext";

const GlobalContext: React.FC = ({ children }) => {
  return (
    <UserContexProvider>
      <UserFileContexProvider>{children}</UserFileContexProvider>
    </UserContexProvider>
  );
};

export default GlobalContext;
