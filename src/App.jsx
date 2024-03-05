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
function App({ children }) {
  const { invoices, setInvoices } = UseInvoicesContext();
  const { isSidePanelOpen, setSidePanelOpen } = UseSidePanelContext();
  const { createInvoice } = UseInvoicesContext();

  // const [invoices, setInvoices] = useState();

  // async function getInvoices() {
  //   let results = await fetch(
  //     `https://kanban-backend-server.onrender.com/invoices`,
  //   );
  //   let invoices = await results.json();
  //   setInvoices(invoices);
  // }
  //
  // useEffect(() => {
  //   getInvoices();
  // }, []);

  const theme = createTheme({
    typography: {
      fontFamily: ["League Spartan", "Arial", "sans-serif"].join(","),
    },
  });

  // const createInvoice = async (invoice) => {
  //   const response = await fetch(
  //     `https://kanban-backend-server.onrender.com/invoices`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(invoice),
  //     },
  //   );
  //   console.log("created");
  //   location.reload();
  // };

  // console.log(invoices);

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
