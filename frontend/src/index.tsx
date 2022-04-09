import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { GlobalStyles } from "styles/_global.style";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
