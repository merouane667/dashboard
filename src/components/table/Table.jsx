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
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const headers = {
          'rmpubs-access-token': localStorage.getItem("accessToken")
        };
  
        const response = await axios.get('https://rm-pubs-lpmp9.ondigitalocean.app/api/bookings', { headers });
        setBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, []);

  const lastThreeBookings = bookings.slice(-3);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">User ID</TableCell>
            <TableCell className="tableCell">Pack ID</TableCell>
            <TableCell className="tableCell">Booking Week</TableCell>
            <TableCell className="tableCell">Booking Text</TableCell>
            <TableCell className="tableCell">Booking Audio</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lastThreeBookings.map((booking) => (
            <TableRow key={booking.booking_id}>
              <TableCell className="tableCell">{booking.booking_id}</TableCell>
              <TableCell className="tableCell">{booking.booking_userid}</TableCell>
              <TableCell className="tableCell">{booking.booking_packid}</TableCell>
              <TableCell className="tableCell">{booking.booking_week}</TableCell>
              <TableCell className="tableCell">{booking.booking_text == null ? "empty":booking.booking_text}</TableCell>
              <TableCell className="tableCell">{booking.booking_audio_path}</TableCell>
              <TableCell className="tableCell">{booking.booking_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
