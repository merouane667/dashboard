import React, { useState, useEffect } from 'react';
import './list.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import useLocalStorageTokenCheck from '../../components/tokenCheck/useLocalStorageCheck';
import useLocalStorageRoleCheck from '../../components/roleCheck/useLocalStorageCheck';
import axios from 'axios';

const PackOptionsList = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 900);

    return () => {
      clearTimeout(loaderTimeout);
    };
  }, []);

  const { packId } = useParams();
  useLocalStorageTokenCheck('accessToken');
  useLocalStorageRoleCheck('role');
  
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
          'rmpubs-access-token': accessToken,
        };

        const response = await axios.get(
          `https://rm-pubs-lpmp9.ondigitalocean.app/api/pack_options/packs/${packId}`,
          { headers }
        );

        setOptions(response.data);
      } catch (error) {
        console.error(error);
        // Handle error response
      }
    };

    fetchOptions();
  }, [packId]);

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
                Options for Pack ID: {packId}
              </div>
              {options.length === 0 ? (
                <p>No options available</p>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Modify Option</TableCell>
                        <TableCell>Spots</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {options.map((option, index) => (
                        <TableRow key={option.pack_option_id}>
                          <TableCell>
                          <Link to={`/options/modify/${option.pack_option_id}`}>
                            Option{index + 1}
                          </Link>
                          </TableCell>
                          <TableCell>{option.pack_option_spots}</TableCell>
                          <TableCell>{option.pack_option_duration}</TableCell>
                          <TableCell>{option.pack_option_price}</TableCell>
                          <TableCell><div className='OptionStatus'>{option.pack_option_status}</div></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              <Link to={`/options/add/${packId}`} className='addOptionLink'>Add option</Link>

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PackOptionsList;
