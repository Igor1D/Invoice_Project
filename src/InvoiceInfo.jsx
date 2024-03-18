import React, { useEffect, useState } from "react";
import AllInvoices from "./AllInvoices.jsx";
import "./invoiceInfo.css";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SpanningTable from "./SpanningTable.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { UseInvoicesContext } from "./Utils/InvoicesContextProvider.jsx";
import Chip from "@mui/material/Chip";
import CircleIcon from "@mui/icons-material/Circle";
import Alert from "@mui/material/Alert";

function InvoiceInfo({ isSidePanelOpen, setSidePanelOpen }) {
  const { invoices, patchInvoice, deleteInvoice } = UseInvoicesContext();

  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();
  // console.log(id);
  // console.log(invoices);

  const filteredInvoice = invoices
    ? invoices.filter((invoice) => invoice.id === id)[0]
    : null;

  function markAsPaid(e) {
    e.preventDefault();
    patchInvoice(filteredInvoice.id, {
      status: "paid",
    });
  }

  const handleDeleteInvoice = async () => await deleteInvoice(id);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      {filteredInvoice && (
        <div className="invoice-info-app-component">
          <div className="side-bar">
            <div className="sidebar-top">
              <div className="sidebar-logo">
                <img src="/src/assets/logo.svg" alt="logo" className="logo" />
              </div>
            </div>
            <div className="sidebar-bottom">
              <div className="sidebar-avatar">
                <img
                  src="/src/assets/image-avatar.jpg"
                  alt="avatar-image"
                  className="image-avatar"
                />
              </div>
            </div>
          </div>
          <div className="invoice-info-layout">
            <div className="invoice-info-goBack-btn">
              <Button
                onClick={handleClick}
                variant="text"
                style={{
                  color: "white",
                  textTransform: "none",
                  fontSize: 16,
                }}
                startIcon={
                  <ArrowBackIosNewIcon
                    sx={{
                      color: "#7C5DFA",
                      fontSize: 14,
                    }}
                  />
                }
              >
                Go back
              </Button>
            </div>
            <div className="invoice-info-header">
              <div className="invoice-info-header-left">
                <p className="invoice-info-header-p">Status </p>
                <div className="invoice-status">
                  <Chip
                    label={
                      filteredInvoice.status.charAt(0).toUpperCase() +
                      filteredInvoice.status.slice(1)
                    }
                    style={{
                      backgroundColor:
                        filteredInvoice.status === "pending"
                          ? "#2A2736"
                          : filteredInvoice.status === "paid"
                            ? "#1E2C3E"
                            : filteredInvoice.status === "draft"
                              ? "#292C44"
                              : null,
                      color:
                        filteredInvoice.status === "pending"
                          ? "#FF8F00"
                          : filteredInvoice.status === "paid"
                            ? "#33D69F"
                            : filteredInvoice.status === "draft"
                              ? "#E0E4FA"
                              : null,
                      padding: "15px",
                      paddingTop: "25px",
                      paddingBottom: "25px",
                      fontSize: "18px",
                      fontWeight: 550,
                      borderRadius: "9px",
                    }}
                    icon={
                      <CircleIcon
                        style={{
                          fontSize: "small",
                          color:
                            filteredInvoice.status === "pending"
                              ? "#FF8F00"
                              : filteredInvoice.status === "paid"
                                ? "#33D69F"
                                : filteredInvoice.status === "draft"
                                  ? "#E0E4FA"
                                  : null,
                        }}
                      />
                    }
                  />
                </div>
              </div>
              <div className="invoice-info-header-right">
                <div className="invoice-info-btns"></div>
                <Button
                  onClick={() => setSidePanelOpen(!isSidePanelOpen)}
                  variant="contained"
                  sx={{
                    borderRadius: "40px",
                    padding: "15px 20px 15px 20px",
                    backgroundColor: "#252945",
                    textTransform: "none",
                    fontWeight: "600",
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={handleDeleteInvoice}
                  sx={{
                    borderRadius: "40px",
                    padding: "15px 15px 15px 15px",
                    backgroundColor: "#EC5757",
                    textTransform: "none",
                    fontWeight: "600",
                  }}
                >
                  Delete
                </Button>
                <Button
                  onClick={markAsPaid}
                  variant="contained"
                  sx={{
                    borderRadius: "40px",
                    padding: "15px 15px 15px 15px",
                    backgroundColor: "#7C5DFA",
                    textTransform: "none",
                    fontWeight: "600",
                  }}
                >
                  Marks as Paid
                </Button>
              </div>
            </div>
            <div className="invoice-info-main">
              <div className="invoice-info-main-top">
                <div className="invoice-info-main-top-left">
                  <p className="invoice-info-white">#{filteredInvoice.id}</p>
                  <p className="invoice-info-p">
                    {filteredInvoice.description}
                  </p>
                </div>
                <div className="invoice-info-main-top-right">
                  <p className="invoice-info-p">
                    {filteredInvoice.senderAddress.street}
                  </p>
                  <p className="invoice-info-p">
                    {filteredInvoice.senderAddress.city}
                  </p>
                  <p className="invoice-info-p">
                    {filteredInvoice.senderAddress.postCode}
                  </p>
                  <p className="invoice-info-p">
                    {filteredInvoice.senderAddress.country}
                  </p>
                </div>
              </div>
              <div className="invoice-info-main-mid">
                <div className="invoice-info-main-mid-left">
                  <div className="invoice-info-mid-left-invoiceDate">
                    <p className="invoice-info-title">Invoice Date</p>
                    <p className="invoice-info-white">
                      {filteredInvoice.createdAt}
                    </p>
                  </div>
                  <div className="invoice-info-mid-left-paymentDue">
                    <p className="invoice-info-title">Invoice Due</p>
                    <p className="invoice-info-white">
                      {filteredInvoice.paymentDue}
                    </p>
                  </div>
                </div>
                <div className="invoice-info-mid-mid">
                  <div className="invoice-info-mid-billTo">
                    <p className="invoice-info-title">Bill To</p>
                  </div>
                  <div className="invoice-info-mid-billToAddress-clientName">
                    <p className="invoice-info-white">
                      {filteredInvoice.clientName}
                    </p>
                  </div>
                  <div className="invoice-info-mid-billToAddress">
                    <p className="invoice-info-p">
                      {filteredInvoice.clientAddress.street}
                    </p>
                    <p className="invoice-info-p">
                      {filteredInvoice.clientAddress.city}
                    </p>
                    <p className="invoice-info-p">
                      {filteredInvoice.clientAddress.postCode}
                    </p>
                    <p className="invoice-info-p">
                      {filteredInvoice.clientAddress.country}
                    </p>
                  </div>
                </div>
                <div className="invoice-info-mid-right">
                  <p className="invoice-info-title">Sent to</p>
                  <p className="invoice-info-white">
                    {filteredInvoice.clientEmail}
                  </p>
                </div>
              </div>
              <div className="invoice-info-main-bottom">
                <SpanningTable filteredInvoice={filteredInvoice} />
              </div>{" "}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InvoiceInfo;
