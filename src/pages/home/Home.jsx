import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';
import { Link } from "react-router-dom";
import useLocalStorageCheck from '../../components/tokenCheck/useLocalStorageCheck';


const Home = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 900);

    return () => {
      clearTimeout(loaderTimeout);
    };
  }, []);

  useLocalStorageCheck('accessToken');

  return (
    <div className="home">
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
          <div className="homeContainer">
            <Navbar />
            <div className="widgets">
              <Widget type="user" />
              <Widget type="booking" />
              <Widget type="earning" />
              <Widget type="transactions" />
            </div>
            <div className="charts">
              <Featured />
              <Chart title="Daily Average Audience (Last 6 Months)" aspect={2 / 1} />
            </div>
            <div className="listContainer">
              <div className="listTitle">Latest Bookings</div>
              <Table />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
