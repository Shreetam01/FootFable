import React, { useEffect, useState } from 'react'
import { FaCircleChevronDown } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { FaBoxOpen,FaUser ,FaIdCard ,FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import avatar from "./avatar.png"
import { useNavigate } from "react-router-dom";

const Profile_sidebar = (props) => {
  const [userId, setuserId] = useState(null)
  const [userName, setuserName] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId !== null) {
      setuserId(JSON.parse(storedUserId));
    }
  }, []);

  useEffect(() => {
    const storeduserName = localStorage.getItem('userName');
    if (storeduserName !== null) {
      setuserName(JSON.parse(storeduserName));
    }
  }, [userName]);

  // const handleLogout = () => {
  //   // Remove user information from localStorage
  //   localStorage.removeItem('isLogin');
  //   localStorage.removeItem('userName');
  //   localStorage.removeItem('id');
  
  //   // Redirect to the login page or perform other actions as needed
  //   // window.location.href = "/login"; // Uncomment this line if you want to redirect to a login page
  // };
  const handleLogout = () => {
    // Remove user information from localStorage
    localStorage.removeItem('isLogin');
    localStorage.removeItem('userName');
    localStorage.removeItem('id');

    // Redirect to the login page or perform other actions as needed
    // window.location.href = "/"; // Uncomment this line if you want to redirect to a login page
    navigate('/');
    window.location.reload();
  }
  
  return (
    <>
    <div className="profile_sidebar">
        <div className="acc-holder">
            <img src={avatar} alt="" />
            <div className="dtls">
                <p>Hello,</p>
                <h2>{userName}</h2>
            </div>
        </div>
        <div className="acc-shortcrt-link-grp">
            <Link className='acc-shct-link' to={"/order"} > <FaBoxOpen /> <span>My Orders</span></Link>
            <Link className='acc-shct-link' to={"/watchList"} > <FaHeart /> <span>Watch List</span></Link>
            <Link className='acc-shct-link' to={"/profile"}> <FaUser /> Profile Information</Link>
            <Link className='acc-shct-link'to={"/address"}> <FaLocationDot /> Manage Address</Link>
            {/* <Link className='acc-shct-link' to={"/paninfo"}> <FaIdCard /> PAN Card Information</Link> */}
            <button className='acc-shct-link' id='logout' onClick={handleLogout} > <AiOutlineLogout /> Logout</button>
        </div>
        <div className="menubar" >
        <div class="dropdown">
          <button class="dropbtn"id='profile-sidebar-dropbtn'><FaCircleChevronDown/></button>
          <div class="dropdown-content" id='profile-sidebar-dropdown-content'>
          <Link className='acc-shct-link nav-btn' to={"/order"} > <FaBoxOpen /> <span>My Orders</span></Link>
            <Link className='acc-shct-link' to={"/watchList"} > <FaHeart /> <span>Watch List</span></Link>
            <Link className='acc-shct-link' to={"/profile"}> <FaUser /> Profile Information</Link>
            <Link className='acc-shct-link'to={"/address"}> <FaLocationDot /> Manage Address</Link>
            {/* <Link className='acc-shct-link' to={"/paninfo"}> <FaIdCard /> PAN Card Information</Link> */}
            <button className='acc-shct-link' id='logout' onClick={handleLogout} > <AiOutlineLogout /> Logout</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile_sidebar