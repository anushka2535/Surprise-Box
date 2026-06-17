import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Shop from "./component/Shop/Shop";
import Home from "./component/Home/Home";
import Review from "./component/Review/Review";
import Contact from "./component/Contact/Contact";
import Wishlist from "./component/Wishlist/Wishlist";
import Account from "./component/Account/Account";
import Cart from "./component/Cart/Cart";
import TrackOrder from "./component/TrackOrder/TrackOrder";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";
import Notification from "./component/notification/notification";
import VendorDashboard from "./component/VendorDashboard/VendorDashboard";
import About from "./component/About/About";

const App = () => {

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Shop"
          element={
            <Shop
              wishlist={wishlist}
              setWishlist={setWishlist}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route path="/Wishlist" element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/Cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/track/:orderId" element={<TrackOrder />} />
        <Route path="/Login" element={<Login/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/VendorDashboard" element={<VendorDashboard/>}/>
        <Route path="/notification" element={<Notification/>}/>
        <Route path="/About" element={<About/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;