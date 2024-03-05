import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function SpanningTable({ filteredInvoice }) {
  const taxRate = 0.21;

  const invoiceSubTotal = filteredInvoice.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function ccyFormat(num) {
    return num.toFixed(2);
  }

  const invoiceTaxes = invoiceSubTotal * taxRate;
  const invoiceTotal = invoiceTaxes + invoiceSubTotal;

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#252945" }}>
      <Table
        aria-label="spanning table"
        sx={{ border: 0, borderRadius: "10px" }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white", border: 0 }}>Desc</TableCell>
            <TableCell sx={{ color: "white", border: 0 }} align="right">
              Qty.
            </TableCell>
            <TableCell sx={{ color: "white", border: 0 }} align="right">
              Price
            </TableCell>
            <TableCell sx={{ color: "white", border: 0 }} align="right">
              Subtotal
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredInvoice.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell sx={{ color: "white", border: 0 }}>
                {item.name}
              </TableCell>
              <TableCell sx={{ color: "white", border: 0 }} align="right">
                {item.quantity}
              </TableCell>
              <TableCell sx={{ color: "white", border: 0 }} align="right">
                {item.price}
              </TableCell>
              <TableCell sx={{ color: "white", border: 0 }} align="right">
                {item.price * item.quantity}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              sx={{ color: "white", border: 0, backgroundColor: "black" }}
              rowSpan={3}
            />
            <TableCell
              sx={{ color: "white", border: 0, backgroundColor: "black" }}
              colSpan={2}
            >
              Subtotal
            </TableCell>
            <TableCell
              sx={{ color: "white", border: 0, backgroundColor: "black" }}
              align="right"
            >
              {ccyFormat(invoiceSubTotal)}
              {/*{invoiceSubTotal}*/}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{ color: "white", border: 0, backgroundColor: "black" }}
            >
              Tax
            </TableCell>
            <TableCell
              sx={{ color: "white", border: 0, backgroundColor: "black" }}
              align="right"
            >{`${(taxRate * 100).toFixed(0)} %`}</TableCell>
            <TableCell
              sx={{ color: "white", border: 0, backgroundColor: "black" }}
              align="right"
            >
              {ccyFormat(invoiceTaxes)}
              {/*{invoiceTaxes.toFixed(2)}*/}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{ color: "white", border: 0, backgroundColor: "black" }}
              colSpan={2}
            >
              Amount Due
            </TableCell>
            <TableCell
              sx={{ color: "white", border: 0, backgroundColor: "black" }}
              align="right"
            >
              {ccyFormat(invoiceTotal)}
              {/*{invoiceTotal.toFixed(2)}*/}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SpanningTable;
