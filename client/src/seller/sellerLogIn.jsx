import React, { useState } from "react";
import "../login/logIn.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import sellerLogInPic from "./sloginimg.png"

const SellerLogIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email, password }));

    try {
      const response = await fetch("http://localhost:5000/api/seller/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("successfully LogIn", data);
        // setuId(data.user)
        localStorage.setItem('seller_Id', JSON.stringify(data.user));
        localStorage.setItem('userName', JSON.stringify(data.userName));
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('isSellerLogIn', true);
        handleLoginSuccess(data);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };

  const handleLoginSuccess = () => {
    props.handleSellerLogIn();
    navigate('/productInserting');
    window.location.reload();
  };

  return (
    <>
      <div className="logIn">
      <div className="loginform">
      <div className="profile-dtls">
        <div className="profile_card">
        <div className="profileheader">
              <h1>FootFable</h1>
              <p>Welcome Back <b>Seller </b>..........</p>
            </div>
          <div className="profile_dtls_clm">
            <p className="label">
              <b>Email Id </b>
            </p>
            <input
              type="email"
              name="email"
              value={email}
              autocomplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="profile_dtls_clm">
            <p className="label">
              <b>Password </b>
            </p>
            <input
              type="password"
              name="alt_num"
              value={password}
              autocomplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="profile-btn" onClick={handleSubmit}>
            Save
          </button>
          
        </div>
        <div className="regInLogIn">
            <p>New Seller ? </p> <Link to={"/sellerreg"}>{"  "}Registration</Link>
          </div>
      </div>
      <div className="logInpic">
        <img src={sellerLogInPic} alt="" />
      </div>
      </div>
      </div>
    </>
  );
}

export default SellerLogIn