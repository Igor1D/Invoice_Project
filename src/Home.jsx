import React, { useEffect, useState } from "react";
import AllInvoices from "./AllInvoices.jsx";
import "./home.css";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UseInvoicesContext } from "./Utils/InvoicesContextProvider.jsx";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Home({ isSidePanelOpen, setSidePanelOpen }) {
  const { createInvoice, invoices } = UseInvoicesContext();
  const invoicesQty = invoices ? Object.keys(invoices).length : "...";

  // Filter's modal win
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Checkbox
  const [checkboxState, setCheckboxState] = useState({
    draft: false,
    paid: false,
    pending: false,
  });

  const handleChange = (event) =>
    setCheckboxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });

  const { draft, paid, pending } = checkboxState;

  let homeInvoices;

  if (!checkboxState.draft && !checkboxState.paid && !checkboxState.pending) {
    homeInvoices = invoices ? invoices : [];
  } else {
    homeInvoices = invoices
      ? invoices.filter((invoice, index) => {
          return checkboxState[invoice.status];
        })
      : [];
  }
  // console.log(homeInvoices);
  console.log(Object.keys(checkboxState));
  // console.log(!checkboxState === !draft);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const handlePagiChange = (event, pageNum) => {
    setPage(pageNum);
  };

  const pageSize = 7; // Invoices per page

  useEffect(() => {
    const totalInvoices = homeInvoices.length;
    // console.log(totalInvoices);
    const pageCount = Math.ceil(totalInvoices / pageSize);
    setPageQty(pageCount);
  }, [homeInvoices]);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  let invoicesToShow = homeInvoices.slice(start, end); // I was struggling with that part

  // Mobile Pagination

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  invoicesToShow = isMobile ? homeInvoices : homeInvoices.slice(start, end);

  // Buttons

  const [createInvoiceBtnText, setCreateInvoiceBtnText] =
    useState("New Invoice");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 414) {
        setCreateInvoiceBtnText("New");
      } else {
        setCreateInvoiceBtnText("New Invoice");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [filterBtnText, setFilterBtnText] = useState("Filter by status");

  useEffect(() => {
    const handleFilterBtnTextResize = () => {
      if (window.innerWidth <= 414) {
        setFilterBtnText("Filter");
      } else {
        setFilterBtnText("Filter by status");
      }
    };

    handleFilterBtnTextResize();

    window.addEventListener("resize", handleFilterBtnTextResize);

    return () => {
      window.removeEventListener("resize", handleFilterBtnTextResize);
    };
  }, []);

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
                There are total {invoicesQty} invoices
              </p>
            </div>
            <div className="header-right">
              <div className="header-filter-div">
                <p className="filterP">{filterBtnText}</p>
                <IconButton
                  color="primary"
                  aria-label="info"
                  onClick={handleClick}
                >
                  <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <FormControlLabel
                      sx={{ pl: 0 }}
                      control={
                        <Checkbox
                          checked={draft}
                          onChange={handleChange}
                          name="draft"
                        />
                      }
                      label="Draft"
                    />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <FormControlLabel
                      sx={{ pl: 0 }}
                      control={
                        <Checkbox
                          checked={pending}
                          onChange={handleChange}
                          name="pending"
                        />
                      }
                      label="Pending"
                    />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <FormControlLabel
                      sx={{ pl: 0 }}
                      control={
                        <Checkbox
                          checked={paid}
                          onChange={handleChange}
                          name="paid"
                        />
                      }
                      label="Paid"
                    />
                  </MenuItem>
                </Menu>
              </div>
              <Button
                className="createInvoiceBtn"
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
                {createInvoiceBtnText}
              </Button>
            </div>
          </div>
          {/*AllInvoice comp goes here*/}
          <AllInvoices
            invoices={invoices}
            homeInvoices={homeInvoices}
            invoicesToShow={invoicesToShow}
          />

          <div className="paginationBar">
            <Stack spacing={2}>
              <Pagination
                count={pageQty}
                page={page}
                color="primary"
                size="large"
                className="custom-pagination"
                onChange={handlePagiChange}
              />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
