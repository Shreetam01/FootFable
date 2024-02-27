import React, { useState } from "react";
import { Link } from "react-router-dom";
import sellerLogInPic from "../seller/sloginimg.png";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [mobNo, setmobNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setDob] = useState("");
  const [location, setlocation] = useState("");
  const [altMobNo, setaltMobNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (
      !username ||
      !email ||
      !mobNo ||
      !gender ||
      !dob ||
      !location ||
      !altMobNo ||
      !password ||
      !confirmPassword
    ) {
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
      password,
    };

    console.log(registrationData);

    // You would fetch to your server's registration endpoint here
    fetch("http://localhost:5000/api/buyer/", {
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
        return response.json(); // Assuming the response is in JSON format
      })
      .then((data) => {
        console.log("Registration Response:", data);
        setMessage(data.msg);
        alert("Registration Successfull");
        handleLoginSuccess();
        // setMessage("Registration successful");
      })
      .catch((error) => {
        console.error("Network error:", error);
        alert("Email Id already taken");
        // setMessage("Registration failed");
      });
  };
  const handleLoginSuccess = () => {
    navigate("/logIn");
  };

  // alert(message)

  return (
    <>
      <div className="logIn" id="regfrm">
        <div className="profileheader">
                <h1>Welcome To FootFable</h1>
                
              </div>
        <div className="loginform" id="regForm">
          <div className="profile-dtls">
            <div className="profile_card">
              {/* <div className="profileheader">
                <h1>FootFable</h1>
                <p>
                  Welcome Back <b>Seller</b>
                </p>
              </div> */}
              <div className="profile_dtls_clm">
                <p className="label">
                  <b>Full Name</b>
                </p>
                <input
                  type="text"
                  name="name"
                  value={username}
                  autocomplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="profile_dtls_clm">
                <p className="label">
                  <b>Mobile Number </b>
                </p>
                <input
                  type="text"
                  value={mobNo}
                  autocomplete="off"
                  onChange={(e) => setmobNo(e.target.value)}
                />
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
              {/* <div className="profile_dtls_clm">
            <p className="label">
              <b>Gender </b>
            </p>
            <div className="genlbl">
              <label>
                <input type="radio" name="gen" value="1" onChange={(e) => setgender(1)} />
                Male
              </label>
              <label>
                <input type="radio" name="gen" value="2" onChange={(e) => setgender(2)} />
                Female
              </label>
            </div>
          </div> */}
              <div className="profile_dtls_clm">
                <p className="label">
                  <b>Date Of Birth </b>
                </p>
                <input
                  type="date"
                  name="dob"
                  value={dob}
                  autocomplete="off"
                  onChange={(e) => setDob(e.target.value)}
                />
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
            {/* <div className="regInLogIn">
              <p>New Seller ? </p>{" "}
              <Link to={"/sellerreg"}>{"  "}Registration</Link>
            </div> */}
          </div>
          {/* <div className="logInpic">
            <img src={sellerLogInPic} alt="" />
          </div> */}
          <div className="profile-dtls">
            <div className="profile_card">
            <div className="profile_dtls_clm">
                <p className="label">
                  <b>Location </b>
                </p>
                <input
                  type="text"
                  name="loc"
                  value={location}
                  autocomplete="off"
                  onChange={(e) => setlocation(e.target.value)}
                />
              </div>
              <div className="profile_dtls_clm">
                <p className="label">
                  <b>Alternate Mobile </b>
                </p>
                <input
                  type="text"
                  name="alt_num"
                  value={altMobNo}
                  autocomplete="off"
                  onChange={(e) => setaltMobNo(e.target.value)}
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
              <div className="profile_dtls_clm">
                <p className="label">
                  <b>Confirm Password </b>
                </p>
                <input
                  type="text"
                  name="alt_num"
                  value={confirmPassword}
                  autocomplete="off"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button className="profile-btn" id="regbtn" onClick={handleRegister}>
                Save
              </button>
            </div>
            {/* <div className="regInLogIn">
              <p>Already An User ? </p> <Link to={"/"}>Log In</Link>
            </div> */}
          </div>
        </div>
        <div className="regInLogIn">
              <p>Already An User ? </p> <Link to={"/logIn"}>Log In</Link>
            </div> 
      </div>
    </>
  );
};

export default Registration;
