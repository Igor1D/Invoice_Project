import "./App.css";
import NewInvoice from "./NewInvoice.jsx";
import "dayjs/locale/en-gb";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import InvoiceInfo from "./InvoiceInfo.jsx";
import { UseInvoicesContext } from "./Utils/InvoicesContextProvider.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { UseSidePanelContext } from "./Utils/SidePanelContextProvider.jsx";
import "moment/locale/de";
function App({ children }) {
  const { invoices, setInvoices } = UseInvoicesContext();
  const { isSidePanelOpen, setSidePanelOpen } = UseSidePanelContext();
  const { createInvoice } = UseInvoicesContext();

  const theme = createTheme({
    typography: {
      fontFamily: ["League Spartan", "Arial", "sans-serif"].join(","),
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                invoices={invoices}
                createInvoice={createInvoice}
                isSidePanelOpen={isSidePanelOpen}
                setSidePanelOpen={setSidePanelOpen}
              />
            }
          />
          <Route
            path="/invoice"
            element={
              <NewInvoice
                invoices={invoices}
                createInvoice={createInvoice}
                isSidePanelOpen={isSidePanelOpen}
                setSidePanelOpen={setSidePanelOpen}
              />
            }
          />
          <Route
            path="/invoice/:id"
            element={
              <InvoiceInfo
                invoices={invoices}
                isSidePanelOpen={isSidePanelOpen}
                setSidePanelOpen={setSidePanelOpen}
              />
            }
          />
          {children}
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
