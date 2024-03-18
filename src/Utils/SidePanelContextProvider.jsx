import React from "react";
import { createContext, useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import NewInvoice from "../NewInvoice.jsx";
import { UseInvoicesContext } from "./InvoicesContextProvider.jsx";
import InvoiceInfo from "../InvoiceInfo.jsx";

const SidePanelContext = createContext();

function SidePanelContextProvider({ children }) {
  const [isSidePanelOpen, setSidePanelOpen] = useState(false);
  const { createInvoice } = UseInvoicesContext();
  // const [isEditMode, setIsEditMode] = useState(false);
  // const [currentInvoiceData, setCurrentInvoiceData] = useState();

  return (
    <SidePanelContext.Provider
      value={{
        isSidePanelOpen,
        setSidePanelOpen,
      }}
    >
      <Drawer
        anchor="left"
        open={isSidePanelOpen}
        onClose={() => setSidePanelOpen(false)}
      >
        <NewInvoice createInvoice={createInvoice} />
      </Drawer>
      {children}
    </SidePanelContext.Provider>
  );
}

export default SidePanelContextProvider;

export const UseSidePanelContext = () => useContext(SidePanelContext);
