import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute, { PrivateRouteProps } from "./Routes/PrivateRoute";

//Open route components
import Login from "./Login";
import Register from "./Register";

//Private route components
import Dashboard from "./Dashboard";
import Upload from "components/Dashboard/Routes/Upload";
import Drive from "components/Dashboard/Routes/Drive";

const defaultProtectedRouteProps: Omit<PrivateRouteProps, "outlet"> = {
  authenticationPath: "/entrar",
};

const RoutesContent = () => {
  return (
    <Routes>
      <Route path="/entrar" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      <Route
        path="/"
        element={
          <PrivateRoute
            outlet={<Dashboard />}
            {...defaultProtectedRouteProps}
          />
        }
      >
        <Route path="meu-drive" element={<Drive />}></Route>
        <Route path="upload" element={<Upload />}></Route>
      </Route>

      <Route path="*" element={<Navigate to="/meu-drive" />} />
    </Routes>
  );
};

export default RoutesContent;
