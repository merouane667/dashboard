import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UserList from "./pages/list/UserList";
import PackList from "./pages/list/PackList";
import BookingList from "./pages/list/BookingList";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

import {
  BrowserRouter ,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login/>}/>
            <Route path="dashboard" element={<Home/>}/>
            <Route path="users">
              <Route index element={<UserList/>}/>
              <Route path=":userId" element={<Single/>}/>
            </Route>
            <Route path="packs">
              <Route index element={<PackList/>}/>
              <Route path="new" element={<New/>}/>
            </Route>
            <Route path="bookings">
              <Route index element={<BookingList/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
