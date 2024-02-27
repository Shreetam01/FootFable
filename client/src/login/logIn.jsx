import React, { useState } from "react";
import "./logIn.css";
import { Link } from "react-router-dom";

import sellerLogInPic from "../seller/sloginimg.png"
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [uId, setuId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email, password }));

    try {
      const response = await fetch("http://localhost:5000/api/buyer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("successfully LogIn", data);
        setuId(data.user);
        localStorage.setItem("id", JSON.stringify(data.user));
        localStorage.setItem("userName", JSON.stringify(data.userName));
        localStorage.setItem("isLogin", true);
        handleLoginSuccess(data);
      } else {
        console.error("Login failed");
        alert("Invalid Email or Password")
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };

  const handleLoginSuccess = (data) => {
    props.LogIn(data.user);
    navigate("/products");
    window.location.reload();
  };

  return (
    <>
      <div className="logIn">
        <div className="loginform">
          <div className="profile-dtls">
            <div className="profile_card">
              <div className="profileheader">
                <h1>Wellcome Back...</h1>
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
              <p>New User ...</p> <Link to={"/reg"}>Registration</Link>
            </div>
          </div>
          <div className="logInpic">
            <img src={sellerLogInPic} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
