import React, { useState, useEffect } from 'react';
import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Box, CircularProgress } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import useLocalStorageTokenCheck from '../../components/tokenCheck/useLocalStorageCheck';
import useLocalStorageRoleCheck from '../../components/roleCheck/useLocalStorageCheck';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'booking_userid', headerName: 'Customer', width: 130, valueGetter: (params) => params.row.user.user_lastname+" "+params.row.user.user_firstname },
  {
    field: "booking_pack_name",
    headerName: "Pack name",
    width: 130,
    valueGetter: (params) => params.row.pack_option ? params.row.pack_option.pack.pack_name : ""
  },
  { field: 'booking_week', headerName: 'Booking week', width: 130 },
  {
    field: "booking_text",
    headerName: "Booking text",
    width: 130,
    renderCell: (params) => {
      return (
        <div>
          {params.booking_text == null ? "empty":params.booking_text}
        </div>
      );
    },
  },
  {
    field: "booking_audio_path",
    headerName: "Booking audio",
    width: 130,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <a href={params.row.booking_audio_path}>
          {params.row.booking_audio_path}
          </a>
        </div>
      );
    },
  },
  {
    field: "booking_paymentid",
    headerName: "View payment",
    width: 160,
    renderCell: (params) => {
      if(params.row.booking_paymentid != "Pending") {
        return(
          <Link to={`/payments/${params.row.booking_paymentid}`}>View Payment</Link>
        )
      }
      return(
        "payment pending"
      )
    },
  },
  {
    field: "booking_status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.booking_status}`}>
          {params.row.booking_status}
        </div>
      );
    },
  },
];

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  const fetchData = async () => {
    try {
      const headers = {
        'rmpubs-access-token': localStorage.getItem("accessToken")
      };

      const response = await axios.get('https://rm-pubs-lpmp9.ondigitalocean.app/api/bookings', { headers });

      if (response.status === 200) {
        const formattedBookings = response.data.map((booking, index) => ({
          ...booking,
          id: index + 1, // Add a unique identifier for each row
        }));
        setBookings(formattedBookings);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 900);

    return () => {
      clearTimeout(loaderTimeout);
    };
  }, []);

  useLocalStorageTokenCheck('accessToken');
  useLocalStorageRoleCheck('role');



  return (
    <div className="list">
      {showLoader ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Sidebar />
          <div className="listContainer">
            <Navbar />
            <div className="datatable">
              <div className="datatableTitle">
                Booking List
              </div>
              <DataGrid
                rows={bookings}
                columns={columns}
                pageSizeOptions={[5, 10]}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingList;
