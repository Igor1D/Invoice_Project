import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

const InvoicesContext = createContext();
function InvoicesContextProvider({ children }) {
  const [invoices, setInvoices] = useState();

  useEffect(() => {
    async function getInvoices() {
      let results = await fetch(
        `https://kanban-backend-server.onrender.com/invoices`,
      );
      let invoices = await results.json();
      setInvoices(invoices);
    }

    getInvoices();
  }, []);

  useEffect(() => {
    // console.log(invoices, 'useEffect here')
  }, [invoices]);

  const createInvoice = async (invoice) => {
    const response = await fetch(
      `https://kanban-backend-server.onrender.com/invoices`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(invoice),
      },
    );
    console.log("created");
    location.reload();
  };

  const updateInvoice = async (id, invoice) => {
    // console.log(id, task)

    const results = await fetch(
      `https://kanban-backend-server.onrender.com/invoices/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
      },
    );
    location.reload();
  };

  const patchInvoice = async (id, invoice) => {
    // console.log(id, task)

    const results = await fetch(
      `https://kanban-backend-server.onrender.com/invoices/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
      },
    );
    location.reload();
  };

  const deleteInvoice = async (id, invoices) => {
    const results = await fetch(
      `https://kanban-backend-server.onrender.com/invoices/${id}`,

      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoices),
      },
    );
    console.log("invoice" + id + "deleted");
    location.reload();
  };

  return (
    <InvoicesContext.Provider
      value={{
        invoices,
        setInvoices,
        createInvoice,
        updateInvoice,
        deleteInvoice,
        patchInvoice,
      }}
    >
      {children}
    </InvoicesContext.Provider>
  );
}

export default InvoicesContextProvider;

export const UseInvoicesContext = () => useContext(InvoicesContext);
