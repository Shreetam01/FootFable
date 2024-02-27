import React ,{useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navigation from "./navigation/Navigation";
import Navheader from './navigation/Navheader';
import Products from "./products/Products";
import Cart from "./cart/Cart";
import Order from './cart/Order';
import Profile from './profile/Profile';
import Orderpage from './profile/orderpage';
import ProductDetails from './productDetails/ProductDetails';
import Watchlist from './profile/Watchlist';
import Address from './profile/Address';
import PanNo from './profile/PanNo';
import ProfileEditPage from './profile/ProfileEditPage';
// import ProductDetails from './productDetails/ProductDetails';
import productForm from './productInserting/productForm';
import Dashbord from './dashbord/Dashbord';
import Registration from './registration/registration';
import LogIn from './login/logIn';
import ProductForm from './productInserting/productForm';
import SellerReg from './seller/sellerReg';
import SellerLogIn from './seller/sellerLogIn';
import Home from './components/Home';
import Footer from './Footer/Footer';
import SellerProduct from './seller/SellerProduct';
import SellerOrderDetails from './seller/SellerOrderDetails';
import BuyerDetails from './seller/BuyerDetails';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setuserId] = useState(null)
  const [isLogIn, setisLogIn] = useState(false)
  const [isSellerLogIn, setisSellerLogIn] = useState(false)
  const [seller_Id, setseller_Id] = useState(null)
  const [seller_token, setseller_token] = useState(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId !== null) {
      setuserId(JSON.parse(storedUserId));
    }
  }, []);

  useEffect(() => {
    const storedSellerId = localStorage.getItem('seller_Id');
    if (storedSellerId !== null) {
      setseller_Id(JSON.parse(storedSellerId));
    }
  }, []);

  useEffect(() => {
    const updatedLogInSts = localStorage.getItem('isLogin');
    if (updatedLogInSts !== null) {
      setisLogIn(JSON.parse(updatedLogInSts));
      console.log(JSON.parse(updatedLogInSts));
    }
  }, []);

  useEffect(() => {
    const updatedSellerLogInSts = localStorage.getItem('isSellerLogIn');
    if (updatedSellerLogInSts !== null) {
      setisSellerLogIn(JSON.parse(updatedSellerLogInSts));
      // console.log(JSON.parse(updatedSellerLogInSts));
    }
  }, []);


  const handleLogIn=(userId)=>{
  }

  const handleSellerLogIn=()=>{

  }


  const handleSearch = (query) => {
    setSearchQuery(query);
  };


  return (
    <>
      <Router> 
        <Navigation logInsts={isLogIn} sellerLogINSts={isSellerLogIn} />
        {/* <Navheader/> */}
        <Routes>
          <Route path="/" element={<Home logInsts={isLogIn}/>} />
          <Route path="/products" element={<Products searchQuery={searchQuery} id={userId} logInsts={isLogIn} />} />
          <Route path="/cart" element={<Cart logInsts={isLogIn} id={userId} />} />
          <Route path="/reg" element={<Registration />} />
          <Route path="/logIn" element={<LogIn id={userId} LogIn={handleLogIn} />} />
          <Route path="/productInserting" element={<ProductForm stoken={seller_token} seller_Id={seller_Id} seller_logInsts={isSellerLogIn} />} />
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/sellerLogIn" element={<SellerLogIn sid={seller_Id} handleSellerLogIn={handleSellerLogIn} />} />
          <Route path="/sellerreg" element={<SellerReg />} />
          <Route path="/paninfo" element={<PanNo logInsts={isLogIn} id={userId} />} />
          <Route path="/sellerProduct" element={<SellerProduct sid={seller_Id}/>} />
          <Route path="/sellerOrderDetails" element={<SellerOrderDetails sid={seller_Id}/>} />
          <Route path="/products/:id" element={<ProductDetails logInsts={isLogIn} id={userId}/>} />
          <Route path="/sellerOrderDetails/:id" element={<BuyerDetails logInsts={isLogIn} id={userId}/>} />
          <Route path="/watchlist" element={<Watchlist logInsts={isLogIn} id={userId} />} />
          <Route path="/profile/edit" element={<ProfileEditPage logInsts={isLogIn} id={userId} />} />
          <Route path="/address" element={<Address logInsts={isLogIn} id={userId} />} />
          <Route path="/order" element={<Orderpage logInsts={isLogIn} id={userId} />} />
          <Route path="/profile" element={<Profile logInsts={isLogIn} id={userId} />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
