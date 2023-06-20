import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Widget = ({ type }) => {
  let data;
  let amount;
  let diff;

  const getUsersAndBookingsCount = async () => {
    try {
      const headers = {
        'rmpubs-access-token': localStorage.getItem('accessToken')
      };
  
      // Retrieve users
      const usersResponse = await axios.get('https://rm-pubs-lpmp9.ondigitalocean.app/api/users', { headers });
      const usersCount = usersResponse.data.length;
  
      // Retrieve bookings
      const bookingsResponse = await axios.get('https://rm-pubs-lpmp9.ondigitalocean.app/api/bookings', { headers });
      const bookingsCount = bookingsResponse.data.length;
  
      // Store the counts in variables or state
      console.log('Users Count:', usersCount);
      console.log('Bookings Count:', bookingsCount);
  
      // Return the counts if needed
      return { usersCount, bookingsCount };
    } catch (error) {
      console.error(error);
    }
  };

  const [usersCount, setUsersCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const counts = await getUsersAndBookingsCount();
      setUsersCount(counts.usersCount);
      setBookingsCount(counts.bookingsCount);
    };

    fetchData();
  }, []);
  
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      amount = usersCount;
      diff = 50;

      break;
    case "booking":
      data = {
        title: "BOOKINGS",
        isMoney: false,
        link: "View all bookings",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      amount = bookingsCount;
      diff = 50;

      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      amount = 31500;
      diff = 9;
      
      break;
    case "transactions":
      data = {
        title: "TRANSACTIONS",
        isMoney: false,
        link: "See details",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      amount = bookingsCount;
      diff = 50;
      
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
        {amount} {data.isMoney && " د. م"}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;