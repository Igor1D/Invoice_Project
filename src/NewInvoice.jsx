import React, { useState } from "react";
import "./NewInvoices.css";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import { useImmer } from "use-immer";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { UseInvoicesContext } from "./Utils/InvoicesContextProvider.jsx";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import moment from "moment/moment.js";

const CustomTextField = styled(TextField)({
  backgroundColor: "#252945",
  borderRadius: "7px",
  "& .MuiInputLabel-root": {
    color: "#DFE3FA", // Change label font color
  },
  "& .MuiInputBase-input": {
    color: "white", // Change input font color
  },
});

const CustomDatePicker = styled(DatePicker)({
  backgroundColor: "#252945",
  borderRadius: "7px",
  "& .MuiInputLabel-root": {
    color: "#DFE3FA", // Change label font color
  },
  "& .MuiInputBase-input": {
    color: "white", // Change input font color
  },
});

const CustomSelect = styled(Select)({
  backgroundColor: "#252945",
  borderRadius: "7px",
  "& .MuiInputBase-input": {
    color: "white", // Change input font color
  },
});

function NewInvoice() {
  const { invoices, createInvoice } = UseInvoicesContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});

  const { pathname } = useLocation();

  const id = pathname.slice(9);
  // console.log(pathname.slice(9))

  //
  const filteredInvoice = invoices
    ? invoices.filter((invoice) => invoice.id === id)[0]
    : null;

  // console.log(filteredInvoice)

  const schema = Yup.object().shape({
    clientEmail: Yup.string().email().required(),
    description: Yup.string().required(),
  });

  function itemCostFormat(num) {
    return num.toFixed(2);
  }

  // const [totalItemsCost, setTotalItemsCost] = useState(null);

  const [form, setForm] = useImmer({
    createdAt: "",
    paymentDue: filteredInvoice ? filteredInvoice.paymentDue : "",
    description: filteredInvoice ? filteredInvoice.description : "",
    paymentTerms: filteredInvoice ? filteredInvoice.paymentTerms : 1,
    clientName: filteredInvoice ? filteredInvoice.clientName : "",
    clientEmail: filteredInvoice ? filteredInvoice.clientEmail : "",
    status: filteredInvoice ? filteredInvoice.status : "",
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

  // console.log(form.itemList[0].itemName)

  function handleChange(e) {
    setForm((draft) => {
      draft[e.target.name] = e.target.value;
    });
  }

  // Sender handlers

  function handleSenderChange(e) {
    setForm((draft) => {
      draft.senderAddress[e.target.name] = e.target.value;
    });
  }

  // Client handlers

  function handleClientChange(e) {
    setForm((draft) => {
      draft.clientAddress[e.target.name] = e.target.value;
    });
  }

  let yourDate = new Date();
  // yourDate.toISOString().split('T')[0]
  // console.log(yourDate.toISOString().split('T')[0])

  // console.log(selectedDate.$d.toISOString());

  function handleSubmit(e) {
    e.preventDefault();
    try {
      schema.validateSync(form, {
        abortEarly: false,
      });

      setErrors({});
      alert("submitted");
      // const hours = 5;
      // const hoursToMs = selectedDate.getTime() + 5 * 60 * 60 * 1000;
      // const dateCopy = new Date(selectedDate.getTime())
      // dateCopy.setTime(hoursToMs);
      createInvoice({
        ...form,
        paymentDue: moment(selectedDate.$d).format("YYYY-MM-DD"),
        createdAt: yourDate.toISOString().split("T")[0],
        items: form.items.map((item) => {
          return { ...item, total: item.price * item.quantity };
        }),
        // form.items.map(item => return {...item, total: item.price * item.quantity}),
        total: form.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
      });
    } catch (err) {
      const { inner } = err;
      let formErrors = {};

      if (inner && inner[0]) {
        inner.forEach((error) => {
          const { path, message } = error;

          if (!formErrors[path]) {
            formErrors[path] = message;
          }
        });
      }

      console.log("form errors", formErrors);

      setErrors(formErrors);
    }

    // if (errors.length > 0) {
    //   // There are errors in the form data
    //   alert(errors.join("\n"));
    // } else {
    //   // The form data is valid, do something with it
    // }

    // console.log(e.target.name);
  }

  function handleDateChange(event) {
    setSelectedDate(event);
  }

  function handleItemChange(e, index, fieldName) {
    const updatedItems = [...form.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [fieldName]: e.target.value,
    };
    setForm({ ...form, items: updatedItems });
  }

  function addNewItem() {
    const newItem = [...form.items];
    newItem.push({
      name: "",
      price: "",
      quantity: 1,
      total: "",
    });

    setForm({ ...form, items: newItem });
  }

  function removeItem(index) {
    const itemsData = [...form.items];
    const newItemsData = itemsData.filter((item, i) => i !== index);
    setForm({ ...form, items: newItemsData });
  }

  // console.log(invoices)
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="billFromDiv">
          <h4 className="sidebarTitles">Bill From</h4>
          <CustomTextField
            value={form.senderAddress.street}
            onChange={handleSenderChange}
            name="street"
            label="Street Address"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className="billFrom-city-post-country">
            <CustomTextField
              value={form.senderAddress.city}
              onChange={handleSenderChange}
              name="city"
              label="City"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CustomTextField
              value={form.senderAddress.postCode}
              onChange={handleSenderChange}
              name="postCode"
              label="Post Code"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CustomTextField
              value={form.senderAddress.country}
              onChange={handleSenderChange}
              name="country"
              label="Country"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <div className="billToDiv">
          <h4 className="sidebarTitles">Bill To</h4>
          <CustomTextField
            value={form.clientName}
            onChange={handleChange}
            name="clientName"
            label="Client’s Name"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <CustomTextField
            value={form.clientEmail}
            onChange={handleChange}
            name="clientEmail"
            label="Client’s Email"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <p style={{ color: "red" }}>{errors.clientEmail}</p>
          <CustomTextField
            value={form.clientAddress.street}
            onChange={handleClientChange}
            name="street"
            label="Street Address"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className="billTo-city-post-country">
            <CustomTextField
              value={form.clientAddress.city}
              onChange={handleClientChange}
              name="city"
              label="City"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CustomTextField
              value={form.clientAddress.postCode}
              onChange={handleClientChange}
              name="postCode"
              label="Post Code"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CustomTextField
              value={form.clientAddress.country}
              onChange={handleClientChange}
              name="country"
              label="Country"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="invoiceDate-PaymentTerms">
            <FormControl fullWidth>
              <CustomDatePicker
                // value={form.invoiceDate}
                labelId="invoice-date"
                id="invoice-date"
                value={selectedDate}
                onChange={handleDateChange}
                label="Invoice Date"
                name="paymentDue"
                views={["day", "month", "year"]}
                // value={value}
                // onChange={(newValue) => setValue(newValue)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="select-label" sx={{ color: "white" }}>
                Payment Terms
              </InputLabel>
              <CustomSelect
                labelId="select-label"
                id="select-label"
                value={form.paymentTerms}
                label="Payment Terms"
                onChange={handleChange}
                name="paymentTerms"
              >
                <MenuItem value={1}>Net 1 Day</MenuItem>
                <MenuItem value={7}>Net 7 Days</MenuItem>
                <MenuItem value={14}>Net 14 Days</MenuItem>
                <MenuItem value={30}>Net 30 Days</MenuItem>
              </CustomSelect>
            </FormControl>
          </div>
          <CustomTextField
            value={form.description}
            onChange={handleChange}
            name="description"
            label="Project Description"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <p style={{ color: "red" }}>{errors.description}</p>
        </div>

        <div className="ItemList">
          <h4 className="sidebarTitles">Item List</h4>
          {form.items.map((item, index) => (
            <div key={index} className="item">
              <div className="items-div">
                <CustomTextField
                  value={item.name}
                  onChange={(e) => handleItemChange(e, index, "name")}
                  name={`name-${index}`}
                  label="Item Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <CustomTextField
                  inputProps={{ type: "tel", min: 0 }}
                  value={item.quantity}
                  onChange={(e) => handleItemChange(e, index, "quantity")}
                  name={`quantity-${index}`}
                  label="Qty"
                  min="1"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <CustomTextField
                  value={item.price}
                  inputProps={{ type: "tel", min: 0 }}
                  onChange={(e) => handleItemChange(e, index, "price")}
                  name={`price-${index}`}
                  label="Item Price"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <span className="itemCost">
                  {itemCostFormat(item.price * item.quantity)}
                </span>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    removeItem(index);
                  }}
                >
                  <DeleteIcon sx={{ color: "#888EB0" }} />
                </IconButton>
              </div>
            </div>
          ))}
          <Button
            variant="contained"
            sx={{ borderRadius: "18px", backgroundColor: "#252945" }}
            onClick={addNewItem}
          >
            + Add New Item
          </Button>
        </div>
        <div className="buttonDiv">
          <Button
            // type="submit"
            variant="contained"
            sx={{
              borderRadius: "40px",
              padding: "13px 20px 13px 20px",
              backgroundColor: "#EC5757",
              textTransform: "none",
              fontWeight: "600",
            }}
          >
            Discard
          </Button>
          <Button
            // type="submit"
            variant="contained"
            sx={{
              borderRadius: "40px",
              padding: "13px 20px 13px 20px",
              backgroundColor: "#373B53",
              textTransform: "none",
              fontWeight: "600",
            }}
          >
            Save as Draft
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: "40px",
              padding: "13px 20px 13px 20px",
              backgroundColor: "#7C5DFA",
              textTransform: "none",
              fontWeight: "600",
            }}
          >
            Save & Send
          </Button>
        </div>
      </form>
    </>
  );
}

export default NewInvoice;
