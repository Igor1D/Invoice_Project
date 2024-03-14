import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import InvoicesContextProvider from "./Utils/InvoicesContextProvider.jsx";
import SidePanelContextProvider from "./Utils/SidePanelContextProvider.jsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/de";
import InvoicesFormContext from "./Utils/InvoicesFormContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Router>
        <InvoicesContextProvider>
          <InvoicesFormContext>
            <SidePanelContextProvider>
              <App />
            </SidePanelContextProvider>
          </InvoicesFormContext>
        </InvoicesContextProvider>
      </Router>
    </LocalizationProvider>
  </React.StrictMode>,
);
