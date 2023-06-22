import React, { useState, useEffect } from 'react';
import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import useLocalStorageTokenCheck from '../../components/tokenCheck/useLocalStorageCheck';
import useLocalStorageRoleCheck from '../../components/roleCheck/useLocalStorageCheck';
import axios from 'axios';

const columns = [
  { field: 'client_category_id', headerName: 'ID', width: 70 },
  { field: 'client_category_name', headerName: 'Category name', width: 200 },
  { field: 'client_category_status', headerName: 'Status', width: 150 },
  { field: 'action', headerName: 'Action', width: 100 }
];

const CategoryList = () => {
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
        const response = await axios.get('https://rm-pubs-lpmp9.ondigitalocean.app/api/client_categories', { headers });
        const categories = response.data.filter((pack) => pack.client_category_status === "Active");
        setRows(categories);
        setShowLoader(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (clientCategoryId) => {
    try {
      const headers = {
        'rmpubs-access-token': localStorage.getItem("accessToken")
      };
      const url = `https://rm-pubs-lpmp9.ondigitalocean.app/api/client_categories/${clientCategoryId}`;
      await axios.put(url, { client_category_status: "Inactive" }, { headers });
      window.location.reload(true);
    } catch (error) {
      console.error(error);
      // Optional: Show an error message
    }
  };

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
            <div className="categories_datatable">
                <div className="datatableTitle">
                    Categories List
                    <Link to="/categories/new" className="link">
                    Add Category
                    </Link>
                </div>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.field}>{column.headerName}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.client_category_id}>
                        {columns.map((column) => {
                          if (column.field === 'action') {
                            return (
                              <TableCell key={column.field}>
                                <div
                                  style={{"width":"25%"}}
                                  className={`deleteCategoryAction`}
                                  onClick={() => handleDelete(row.client_category_id)}
                                >
                                  Delete
                                </div>
                              </TableCell>
                            );
                          }
                          if (column.field === 'client_category_status') {
                            return (
                              <TableCell key={column.field}>
                                <div className={`cellWithStatus ${row.client_category_status}`} style={{"width":"25%","textAlign":"center"}}>
                                    {row.client_category_status}
                                </div>
                              </TableCell>

                            );
                          }
                          return (
                            <TableCell key={column.field}>{row[column.field]}</TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryList;
