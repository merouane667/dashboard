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
  { field: 'payment_id', headerName: 'ID', width: 70 },
  { field: 'payment_reference', headerName: 'Payment reference', width: 200 },
  {
    field: "payment_user",
    headerName: "User name",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          {params.row.user.user_firstname+" "+params.row.user.user_lastname}
        </div>
      );
    },
  },
  { field: 'payment_method', headerName: 'Payment method', width: 200 },
  { field: 'payment_total', headerName: 'Total', width: 150 },
  {
    field: "payment_status",
    headerName: "Status",
    width: 200,
    renderCell: (params) => {
      return (
        <div className='status'>
          {params.row.payment_status}
        </div>
      );
    },
  },
];

const PaymentList = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 900);

    return () => {
      clearTimeout(loaderTimeout);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'rmpubs-access-token': localStorage.getItem("accessToken")
        };
        const response = await axios.get('https://rm-pubs-lpmp9.ondigitalocean.app/api/payments', { headers });
        const payments = response.data;
        setRows(payments);
        setShowLoader(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
                Payments List
              </div>
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.payment_id}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};



export default PaymentList;
