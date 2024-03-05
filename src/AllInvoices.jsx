import React from "react";
import "./AllInvoices.css";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { UseInvoicesContext } from "./Utils/InvoicesContextProvider.jsx";

function AllInvoices() {
  const { invoices, setInvoices } = UseInvoicesContext();
  console.log(invoices);
  return (
    <div className="invoices-container">
      {invoices ? (
        invoices.map((invoice, index) => {
          return (
            <div className="invoice-div" key={invoice.id}>
              <div className="invoice-leftSide-div">
                <p className="invoice-info">#{invoice.id}</p>
                <p className="invoice-info">{invoice.paymentDue}</p>
                <p className="invoice-info">{invoice.clientName}</p>
              </div>
              <div className="invoice-rightSide-div">
                <p className="invoice-info">${invoice.total}</p>
                <div className="invoice-status">
                  <p>Paid</p>
                </div>
                <Link
                  to={`/invoice/${invoice.id}`}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  <IconButton color="primary" aria-label="info">
                    <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
}

export default AllInvoices;
