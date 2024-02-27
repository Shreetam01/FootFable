import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const SellerReg = () => {
  const [username, setUsername] = useState("");
  const [mobNo, setmobNo] = useState("")
  const [email, setEmail] = useState("");
  const [gender, setgender] = useState("")
  const [dob, setDob] = useState("")
  const [location, setlocation] = useState("")
  const [altMobNo, setaltMobNo] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !email || !mobNo || !gender || !dob || !location || !altMobNo || !password || !confirmPassword) {
      setMessage("Please fill out all fields.");
      console.log(message);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Password and Confirm Password do not match.");
      console.log(message);
      return;
    }

    const registrationData = {
      username,
      mobNo,
      email,
      dob,
      gender,
      location,
      altMobNo,
      password
    };

    console.log(registrationData);

    fetch("http://localhost:5000/api/seller/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); 
        
      })
      .then((data) => {
        console.log("Registration Response:", data);
        // setMessage(data.msg)
        alert("Registration Successfull" )
        handleLoginSuccess();
      })
      .catch((error) => {
        console.error("Network error:", error);
      });

  };
  const handleLoginSuccess = () => {
    navigate('/sellerLogIn');
  };



  return (
    <>
    <div className="logIn" id="regfrm">
        <div className="profileheader">
                <h1>Starting Business With FootFable</h1>
                
              </div>
        <div className="loginform" id="regForm">
          <div className="profile-dtls">
            <div className="profile_card">
              <div className="profile_dtls_clm">
                <p className="label">
                  <b>Full Name</b>
                </p>
                <input type="text" name="name" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="profile_dtls_clm">
                <p className="label">
                  <b>Mobile Number </b>
                </p>
                <input type="text"  value={mobNo} autocomplete="off" onChange={(e) => setmobNo(e.target.value)}/>
              </div>
              <div className="profile_dtls_clm">
                <p className="label">
                  <b>Email Id </b>
                </p>
                <input type="email" name="email" value={email} autocomplete="off" onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="profile_dtls_clm">
                <p className="label">
                  <b>Date Of Birth </b>
                </p>
                <input type="date" name="dob" value={dob} autocomplete="off" onChange={(e) => setDob(e.target.value)} />
              </div>
              <div className="profile_dtls_clm">
                <p className="label">
                  <b>Gender </b>
                </p>
                <div className="genlbl">
                  <label>
                    <input
                      type="radio"
                      name="gen"
                      value="1"
                      onChange={(e) => setgender(1)}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gen"
                      value="2"
                      onChange={(e) => setgender(2)}
                    />
                    Female
                  </label>
                </div>
              </div>
              
            </div>
          </div>
          <div className="profile-dtls">
            <div className="profile_card">
            <div className="profile_dtls_clm">
                <p className="label">
                  <b>Location </b>
                </p>
                <input type="text" name="loc" autocomplete="off" value={location} onChange={(e) => setlocation(e.target.value)} />
              </div>
              <div className="profile_dtls_clm">
                <p className="label">
                  <b>Alternate Mobile </b>
                </p>
                <input type="text" name="alt_num" value={altMobNo} autocomplete="off" onChange={(e) => setaltMobNo(e.target.value)} />
              </div>
              <div className="profile_dtls_clm">
                <p className="label">
                  <b>Password </b>
                </p>
                <input type="password" name="pass" value={password} autocomplete="off" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="profile_dtls_clm">
                <p className="label">
                  <b>Confirm Password </b>
                </p>
                <input type="text" name="con_pass" value={confirmPassword} autocomplete="off" onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>

              <button className="profile-btn" id="regbtn" onClick={handleRegister}>
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="regInLogIn">
              <p>Already A Seller ? </p> <Link to={"/sellerLogIn"}>Log In</Link>
            </div> 
      </div>
    </>
  )
}

export default SellerReg