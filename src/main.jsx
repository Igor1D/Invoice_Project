import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import InvoicesContextProvider from "./Utils/InvoicesContextProvider.jsx";
import SidePanelContextProvider from "./Utils/SidePanelContextProvider.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <InvoicesContextProvider>
        <SidePanelContextProvider>
          <App />
        </SidePanelContextProvider>
      </InvoicesContextProvider>
    </Router>
  </React.StrictMode>,
);
