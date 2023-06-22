import React, { useState, useEffect } from 'react';
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useParams } from "react-router-dom";
import useLocalStorageTokenCheck from '../../components/tokenCheck/useLocalStorageCheck';
import useLocalStorageRoleCheck from '../../components/roleCheck/useLocalStorageCheck';
import axios from 'axios';

const PaymentList = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [payment, setPayment] = useState(null);
  const { paymentId } = useParams();

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
        const response = await axios.get(`https://rm-pubs-lpmp9.ondigitalocean.app/api/payments/${paymentId}`, { headers });
        const payment = response.data;
        setPayment(payment);
        setShowLoader(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [paymentId]);

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
            <TableContainer component={Paper}>
              <div className="datatableTitleSinglePayment">
                Payment Information 
              </div>  
              <Table style={{"marginTop": "60px"}}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Payment reference</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Payment method</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payment && (
                    <TableRow>
                      <TableCell>{payment.payment_id}</TableCell>
                      <TableCell>{payment.payment_reference}</TableCell>
                      <TableCell>{payment.createdAt.substring(0, 10)}</TableCell>
                      <TableCell>{payment.payment_method}</TableCell>
                      <TableCell>{payment.payment_total}</TableCell>
                      <TableCell>
                        <div className="status">
                          {payment.payment_status}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentList;
