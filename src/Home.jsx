import React, { useState } from "react";
import AllInvoices from "./AllInvoices.jsx";
import "./home.css";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
// import SidePanel from "./SidePanel.jsx";
import { UseInvoicesContext } from "./Utils/InvoicesContextProvider.jsx";

function Home({ invoices, isSidePanelOpen, setSidePanelOpen }) {
  const { createInvoice } = UseInvoicesContext();

  // const [isSidePanelOpen, setSidePanelOpen] = useState(false);

  const totalInvoices = invoices ? Object.keys(invoices).length : null;

  console.log(invoices);

  return (
    <>
      <div className="app-component">
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
        <div className="layout">
          <div className="header">
            <div className="header-left">
              <h2 className="header-invoices-h2">Invoices</h2>
              <p className="header-invoices-amount">
                There are total {totalInvoices} invoices
              </p>
            </div>
            <div className="header-right">
              <div className="header-filter-div">
                <p className="filterP">Filter by status</p>
                <IconButton color="primary" aria-label="info">
                  <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </div>
              <Button
                variant="contained"
                onClick={() => setSidePanelOpen(!isSidePanelOpen)}
                sx={{
                  borderRadius: "40px",
                  padding: "13px 8px 13px 8px",
                  backgroundColor: "#7C5DFA",
                  textTransform: "none",
                  fontWeight: "600",
                }}
                startIcon={<AddCircleOutlineIcon />}
              >
                New Invoice
              </Button>
            </div>
          </div>
          {/*AllInvoice comp goes here*/}
          <AllInvoices invoices={invoices} />
        </div>
      </div>
    </>
  );
}

export default Home;
