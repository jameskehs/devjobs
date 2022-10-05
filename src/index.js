import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </React.StrictMode>
  </BrowserRouter>
);
