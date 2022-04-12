import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute, { PrivateRouteProps } from "./Routes/PrivateRoute";

import Dashboard from "./Dashboard";
import Upload from "components/Dashboard/Routes/Upload";
import Drive from "components/Dashboard/Routes/Drive";

const defaultProtectedRouteProps: Omit<PrivateRouteProps, "outlet"> = {
  authenticationPath: "/entrar",
};

const RoutesContent = () => {
  return (
    <Routes>
      <Route path="/entrar" element={<div>Login</div>} />
      <Route path="/registro" element={<div>Registro</div>} />

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
