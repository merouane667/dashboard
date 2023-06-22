import React, { useState, useEffect } from "react";
import axios from "axios";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const headers = {
          'rmpubs-access-token': localStorage.getItem("accessToken")
        };
  
        const response = await axios.get('https://rm-pubs-lpmp9.ondigitalocean.app/api/payments', { headers });
        setPayments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayments();
  }, []);

  const lastThreePayments = payments.slice(-3);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Payment Reference</TableCell>
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Payment Total</TableCell>
            <TableCell className="tableCell">Payment Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lastThreePayments.map((payments) => (
            <TableRow key={payments.payment_id}>
              <TableCell className="tableCell">{payments.payment_id}</TableCell>
              <TableCell className="tableCell">{payments.payment_reference == null ? "empty":payments.payment_reference}</TableCell>
              <TableCell className="tableCell">{payments.user.user_firstname+" "+payments.user.user_lastname}</TableCell>
              <TableCell className="tableCell">{payments.payment_method}</TableCell>
              <TableCell className="tableCell">{payments.payment_total}</TableCell>
              <TableCell className="tableCell">
                <div className="status">
                  {payments.payment_status}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
