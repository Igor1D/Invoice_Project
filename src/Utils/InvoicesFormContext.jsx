import React, { useState } from "react";
import { createContext, useContext } from "React";
import { UseInvoicesContext } from "./InvoicesContextProvider.jsx";
import { useParams } from "react-router-dom";
import { useImmer } from "use-immer";

const FormContext = createContext();
function InvoicesFormContext({ children }) {
  const { invoices } = UseInvoicesContext();

  const [selectedDate, setSelectedDate] = useState(null);

  const { id } = useParams();

  const filteredInvoice = invoices
    ? invoices.filter((invoice) => invoice.id === id)[0]
    : null;

  const [form, setForm] = useImmer({
    createdAt: "",
    paymentDue: filteredInvoice ? filteredInvoice.paymentDue : "",
    description: filteredInvoice ? filteredInvoice.description : "",
    paymentTerms: filteredInvoice ? filteredInvoice.paymentTerms : 1,
    clientName: filteredInvoice ? filteredInvoice.clientName : "",
    clientEmail: filteredInvoice ? filteredInvoice.clientEmail : "",
    status: filteredInvoice ? filteredInvoice.status : "pending",
    senderAddress: filteredInvoice
      ? filteredInvoice.senderAddress
      : {
          street: "",
          city: "",
          postCode: "",
          country: "",
        },
    clientAddress: filteredInvoice
      ? filteredInvoice.clientAddress
      : {
          street: "",
          city: "",
          postCode: "",
          country: "",
        },
    items: filteredInvoice
      ? filteredInvoice.items
      : [
          {
            name: "",
            quantity: 1,
            price: "",
          },
        ],
  });

  return (
    <FormContext.Provider
      value={{ form, setForm, filteredInvoice, selectedDate, setSelectedDate }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default InvoicesFormContext;

export const UseInvoicesFormContext = () => useContext(FormContext);
