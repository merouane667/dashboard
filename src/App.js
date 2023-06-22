import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UserList from "./pages/list/UserList";
import PackList from "./pages/list/PackList";
import BookingList from "./pages/list/BookingList";
import PaymentList from "./pages/list/PaymentList";
import PackOptionsList from "./pages/list/PackOptionsList";
import CategoryList from "./pages/list/CategoryList";
import NewPack from "./pages/new/NewPack";
import NewCategory from "./pages/new/NewCategory";
import SinglePayment from "./pages/single/SinglePayment";
import ModifyOption from "./pages/modify/ModifyOption";
import AddOption from "./pages/modify/AddOption";
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
            </Route>
            <Route path="packs">
              <Route index element={<PackList/>}/>
              <Route path="new" element={<NewPack/>}/>
            </Route>
            <Route path="bookings">
              <Route index element={<BookingList/>}/>
            </Route>
            <Route path="payments">
              <Route index element={<PaymentList/>}/>
            </Route>
            <Route path="categories">
              <Route index element={<CategoryList/>}/>
              <Route path="new" element={<NewCategory/>}/>
            </Route>
            <Route path="payments/:paymentId" >
              <Route index element={<SinglePayment/>}/>
            </Route>
            <Route path="options/pack/:packId" >
              <Route index element={<PackOptionsList/>}/>
            </Route>
            <Route path="options/modify/:optionId" >
              <Route index element={<ModifyOption/>}/>
            </Route>
            <Route path="options/add/:packId" >
              <Route index element={<AddOption/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
