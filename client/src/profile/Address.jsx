import React, { useEffect, useState } from "react";
import Profile_sidebar from "./Profile_sidebar";
import { Link } from "react-router-dom";

const Address = (props) => {
  const [items, setitems] = useState([]);
  const [deleveredName, setdeleveredName] = useState("");
  const [deleveredMobNo, setdeleveredMobNo] = useState("");
  const [pincode, setpincode] = useState();
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [altMobNo, setaltMobNo] = useState("");
  const [userId, setuserId] = useState(props.id);

  const fetchAddressData = async (e) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/buyer/getbuyerAddress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // handleLoginSuccess(data);
        console.log("successfully fetch profile info", data.data[0]);
        setitems(data.data);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };

  useEffect(() => {
    fetchAddressData();
  }, []);

  const handleAddress = () => {
    const registrationData = {
      userId,
      deleveredName,
      deleveredMobNo,
      pincode,
      address,
      city,
      state,
      altMobNo,
    };

    console.log(registrationData);

    // You would fetch to your server's registration endpoint here
    fetch("http://localhost:5000/api/buyer/insertAddressDetails", {
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
        fetchAddressData();
        // setMessage("Registration successful");
      })
      .catch((error) => {
        console.error("Network error:", error);
        // setMessage("Registration failed");
      });
  };

  return (
    <div>
      {props.logInsts ? (
    <>
      <div className="profile">
        <Profile_sidebar />
        <div className="profile-dtls">
          <div className="profile_card">
          <div className="profileheader">
              <h1>Add Your Address</h1>
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Full Name</b>
              </p>
              <input
                type="text"
                name="name"
                value={deleveredName}
                onChange={(e) => setdeleveredName(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Mobile Number </b>
              </p>
              <input
                type="text"
                name="mob_no"
                value={deleveredMobNo}
                onChange={(e) => setdeleveredMobNo(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Pincode </b>
              </p>
              <input
                type="number"
                name="pin"
                value={pincode}
                onChange={(e) => setpincode(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Address </b>
              </p>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>City </b>
              </p>
              <input
                type="text"
                name="city"
                value={city}
                onChange={(e) => setcity(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>State </b>
              </p>
              <input
                type="text"
                name="state"
                value={state}
                onChange={(e) => setstate(e.target.value)}
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
                onChange={(e) => setaltMobNo(e.target.value)}
              />
            </div>
            <button className="profile-btn" onClick={handleAddress}>
              Save
            </button>
          </div>
          <div className="addresslist">
            <div className="address_card-container">
              {items.map((elem) => (
                <div className="address_card">
                  <div className="address_card-details">
                    <h2 className="address_card-title">{elem.deleveredName}</h2>
                    <p className="address_card-address">
                      {" "}
                      <span>
                        {" "}
                        <b> Mob No :</b>
                      </span>{" "}
                      {elem.deleveredMobNo}
                    </p>
                    <div className="addressbox">
                      <span> {elem.address} </span> {" , "}
                      <span>{elem.city}</span> {" , "}
                      <span>{elem.state}</span> {" , "}
                      <span>{elem.pincode}</span>
                    </div>
                    <p className="address_card-address">
                      <span>
                        {" "}
                        <b> Alternative Mob No :</b>
                      </span>{" "}
                      {elem.altMobNo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </>
      ) : (
        <>
          <div className="loginfst">
            <h1>Log In First to see the Product details</h1>
            <Link className="lnkbtn" to="/logIn">
              {" "}
              Log In
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Address;
