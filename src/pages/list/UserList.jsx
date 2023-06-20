import React, { useState, useEffect } from 'react';
import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Box, CircularProgress } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import useLocalStorageCheck from '../../components/tokenCheck/useLocalStorageCheck';
import axios from 'axios';


const columns = [
  { field: 'user_id', headerName: 'ID', width: 70 },
  { field: 'user_firstname', headerName: 'First name', width: 130 },
  { field: 'user_lastname', headerName: 'Last name', width: 130 },
  { field: 'user_email', headerName: 'Email', width: 200 },
  { field: 'user_idcard', headerName: 'ID card', width: 130 },
  { field: 'user_phone', headerName: 'Phone', width: 130 },
  {
    field: "booking_status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.user_status}`}>
          {params.row.user_status}
        </div>
      );
    },
  },
];

const rows = [];

const UserList = () => {
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
        const response = await axios.get('https://rm-pubs-lpmp9.ondigitalocean.app/api/users', { headers });
        const users = response.data;
        setRows(users);
        setShowLoader(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useLocalStorageCheck('accessToken');

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
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.user_id}
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

export default UserList;
