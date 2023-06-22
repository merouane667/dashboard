import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    // perform any other logout-related tasks
  };
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar"> 
      <div className="top">
          <Link to="/dashboard" style={{textDecoration:"none"}}>
            <span className="logo">admin panel</span>
          </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{textDecoration:"none"}}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">USER LIST</p>
          <Link to="/users" style={{textDecoration:"none"}}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <p className="title">PACK LIST</p>
          <Link to="/packs" style={{textDecoration:"none"}}>
            <li>
              <LocalOfferIcon className="icon" />
              <span>Packs</span>
            </li>
          </Link>
          <p className="title">BOOKING LIST</p>
          <Link to="/bookings" style={{textDecoration:"none"}}>
            <li>
              <BookmarkIcon className="icon" />
              <span>Bookings</span>
            </li>
          </Link>
          <p className="title">PAYMENT LIST</p>
          <Link to="/payments" style={{textDecoration:"none"}}>
            <li>
              <PaymentIcon className="icon" />
              <span>Payments</span>
            </li>
          </Link>
          <p className="title">CATEGORY LIST</p>
          <Link to="/categories" style={{textDecoration:"none"}}>
            <li>
              <CategoryIcon className="icon" />
              <span>Categories</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/" style={{textDecoration:"none"}}>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  )
}

export default Sidebar