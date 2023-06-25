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
  { field: 'pack_id', headerName: 'ID', width: 70 },
  { field: 'pack_name', headerName: 'Pack name', width: 210 },
  { field: 'pack_description', headerName: 'Description', width: 400 },
  {
    field: "pack_options",
    headerName: "Options",
    width: 160,
    renderCell: (params) => {
      return (
        <Link to={`/options/pack/${params.row.pack_id}`}>View Options</Link>
      );
    },
  },
  {
    field: "pack_status",
    headerName: "Status",
    width: 80,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.pack_status}`}>
          {params.row.pack_status}
        </div>
      );
    },
  },
  {
    field: "pack_action",
    headerName: "Action",
    width: 80,
    sortable: false, // Disable sorting for this column
    filterable: false, // Disable filtering for this column
    renderCell: (params) => {
      const handleDelete = async (packId) => {
        try {
          const headers = {
            'rmpubs-access-token': localStorage.getItem("accessToken")
          };
          await axios.put(`https://rm-pubs-lpmp9.ondigitalocean.app/api/packs/${packId}`, { pack_status: "Inactive" }, { headers });
          window.location.reload(true);
        } catch (error) {
          console.error(error);
        }
      };

      return (
        <div
          className={`deletePackAction`}
          id={params.row.pack_id}
          onClick={() => handleDelete(params.row.pack_id)}
        >
          Delete
        </div>
      );
    },
  },
];

const PackList = () => {
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

  const fetchData = async () => {
    try {
      const headers = {
        'rmpubs-access-token': localStorage.getItem("accessToken")
      };
      const response = await axios.get('https://rm-pubs-lpmp9.ondigitalocean.app/api/packs', { headers });
      const packs = response.data.filter((pack) => pack.pack_status === "Active");
      setRows(packs);
      setShowLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
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
                Add New Pack
                <Link to="/packs/new" className="link">
                  Add Pack
                </Link>
              </div>
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.pack_id}
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

export default PackList;
