import React, { useState } from "react";
import "./Navbar.css";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
import { BiSolidLogInCircle } from "react-icons/bi";
import { MdAppRegistration } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { AiOutlineShop } from "react-icons/ai";
import { FaShoppingCart, FaHome, FaHeart, FaUser } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Navigation = (props) => {
  const navigate = useNavigate();
  console.log(props.logInsts);

  const handleLogout = () => {
    // Remove user information from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('seller_Id');
    localStorage.removeItem('userName');
    localStorage.removeItem('isSellerLogIn');

    // Redirect to the login page or perform other actions as needed
    // window.location.href = "/"; // Uncomment this line if you want to redirect to a login page
    navigate('/');
    window.location.reload();
  }

  return (
    <>
      <nav>
        <div className="nav-logo">
          <Link to={"/"}>
            <img src={Logo} alt="" />
          </Link>
        </div>

        <div className="nav-btn-group">
          {props.sellerLogINSts ? (
            <>
              {props.logInsts ? (
                <>
                </>
              ) : (
                <>
                  <div className="profile-lk">
                    <Link className="nav-btn" to={"/productInserting"}>
                      {" "}
                      <FaPlus /> Insert Product
                    </Link>
                  </div>
                  <div className="profile-lk">
                    <Link className="nav-btn" to={"/sellerProduct"}>
                      {" "}
                      <FaEye /> See Your Product
                    </Link>
                  </div>
                  <div className="profile-lk">
                    <Link className="nav-btn" to={"/sellerOrderDetails"}>
                      {" "}
                      <FaBoxOpen /> See Order
                    </Link>
                  </div>
                  <div className="watchlist">
                    <Link className="nav-btn" to={"/reg"} onClick={handleLogout}>
                      {" "}
                      <AiOutlineLogout /> Log Out
                    </Link>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="home">
                <Link className="nav-btn" to={"/products"}>
                  {" "}
                  <FaShop />
                  Shop
                </Link>
              </div>
              {props.logInsts ? (
                <>
                  <div className="profile-lk">
                    <Link className="nav-btn" to={"/profile"}>
                      {" "}
                      <FaUser /> Profile
                    </Link>
                  </div>
                  <div className="watchlist">
                    <Link className="nav-btn" to={"/watchList"}>
                      {" "}
                      <FaHeart /> Watch List
                    </Link>
                  </div>
                  <div className="cart">
                    <Link className="nav-btn" to={"/cart"}>
                      {" "}
                      <FaShoppingCart /> Cart
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="profile-lk">
                    <Link className="nav-btn" to={"/logIn"}>
                      {" "}
                      <BiSolidLogInCircle /> Log In
                    </Link>
                  </div>
                  <div className="watchlist">
                    <Link className="nav-btn" to={"/reg"}>
                      {" "}
                      <MdAppRegistration /> Registration
                    </Link>
                  </div>
                  <div className="watchlist">
                    <Link className="nav-btn" to={"/sellerLogIn"}>
                      {" "}
                      <AiOutlineShop /> Become a Seller
                    </Link>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="menubar">
          <div className="dropdown">
            <button className="dropbtn">
              <AiOutlineMenu />
            </button>
            <div className="dropdown-content">
              <Link className="nav-btn" to={"/products"}>
                {" "}
                <FaHome />
                Home
              </Link>
              {props.logInsts ? (
                <>
                  <Link className="nav-btn" to={"/profile"}>
                    {" "}
                    <FaUser /> Profile
                  </Link>
                  <Link className="nav-btn" to={"/watchList"}>
                    {" "}
                    <FaHeart /> Watch List
                  </Link>
                  <Link className="nav-btn" to={"/cart"}>
                    {" "}
                    <FaShoppingCart /> Cart
                  </Link>
                </>
              ) : (
                <>
                  <Link className="nav-btn" to={"/logIn"}>
                    {" "}
                    <BiSolidLogInCircle /> Log In
                  </Link>
                  <Link className="nav-btn" to={"/reg"}>
                    {" "}
                    <MdAppRegistration /> Registration
                  </Link>
                  <Link className="nav-btn" to={"/sellerLogIn"}>
                    {" "}
                    <AiOutlineShop /> Become a Seller
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;

