import React from "react";
import "./AllInvoices.css";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Link, useParams } from "react-router-dom";
import { UseInvoicesContext } from "./Utils/InvoicesContextProvider.jsx";
import Chip from "@mui/material/Chip";
import CircleIcon from "@mui/icons-material/Circle.js";

import moment from "moment";

function AllInvoices({ homeInvoices, invoicesToShow }) {
  const { invoices, setInvoices } = UseInvoicesContext();

  return (
    <>
      <div className="invoices-container">
        {invoices ? (
          invoicesToShow.map((invoice, index) => {
            return (
              <Link
                to={`/invoice/${invoice.id}`}
                key={index}
                style={{
                  textDecoration: "none",
                  display: { xs: "none", sm: "block" },
                }}
              >
                <div className="invoice-div" key={invoice.id}>
                  <div className="invoice-leftSide-div">
                    <p className="invoice-id">#{invoice.id.toUpperCase()}</p>
                    <p className="invoice-info">
                      Due{" "}
                      {moment(invoice.paymentDue, "YYYY-MM-DD").format(
                        "Do MMM YYYY",
                      )}
                    </p>
                    <p className="invoice-info">{invoice.clientName}</p>
                  </div>
                  <div className="invoice-rightSide-div">
                    <p className="invoice-total">$ {invoice.total}</p>
                    <Chip
                      label={
                        invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)
                      }
                      style={{
                        backgroundColor:
                          invoice.status === "pending"
                            ? "#2A2736"
                            : invoice.status === "paid"
                              ? "#1E2C3E"
                              : invoice.status === "draft"
                                ? "#292C44"
                                : "",
                        color:
                          invoice.status === "pending"
                            ? "#FF8F00"
                            : invoice.status === "paid"
                              ? "#33D69F"
                              : invoice.status === "draft"
                                ? "#E0E4FA"
                                : "",
                        padding: "15px",
                        paddingTop: "25px",
                        paddingBottom: "25px",
                        fontSize: "18px",
                        fontWeight: 550,
                        borderRadius: "9px",
                        width: "130px",
                      }}
                      icon={
                        <CircleIcon
                          style={{
                            fontSize: "small",
                            color:
                              invoice.status === "pending"
                                ? "#FF8F00"
                                : invoice.status === "paid"
                                  ? "#33D69F"
                                  : invoice.status === "draft"
                                    ? "#E0E4FA"
                                    : "",
                          }}
                        />
                      }
                    />
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </div>
    </>
  );
}

export default AllInvoices;
