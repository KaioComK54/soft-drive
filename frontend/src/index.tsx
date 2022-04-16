import React from "react";
import ReactDOM from "react-dom";

import { GlobalStyles } from "styles/_global.style";
import { BrowserRouter } from "react-router-dom";

import AlertTemplate from "react-alert-template-basic";
import alertConfig from "utils/alertConfig";
import { Provider as AlertProvider } from "react-alert";
import GlobalContext from "context";

import RoutesContent from "./views/Routes";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <AlertProvider template={AlertTemplate} {...alertConfig}>
      <BrowserRouter>
        <GlobalContext>
          <RoutesContent />
        </GlobalContext>
      </BrowserRouter>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
