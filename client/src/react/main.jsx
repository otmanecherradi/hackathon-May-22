import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import EmpApp from "./EmpApp";

if (document.getElementById("reactRoot")) {
  ReactDOM.createRoot(document.getElementById("reactRoot")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
if (document.getElementById("reactEmployees")) {
  ReactDOM.createRoot(document.getElementById("reactEmployees")).render(
    <React.StrictMode>
      <EmpApp />
    </React.StrictMode>
  );
}
