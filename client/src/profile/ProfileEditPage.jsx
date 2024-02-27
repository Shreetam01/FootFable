import React, { useState } from "react";
import Profile_sidebar from "./Profile_sidebar";

const ProfileEditPage = (props) => {
  const [userId, setuserId] = useState(props.id);
  const [userName, setUserName] = useState("");
  const [userMobNo, setuserMobNo] = useState("");
  const [userEmailId, setuserEmailId] = useState("");
  const [userSex, setuserSex] = useState();
  const [userDoB, setuserDoB] = useState("");
  const [userLocation, setuserLocation] = useState("");
  const [userAltMobNo, setuserAltMobNo] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = () => {
    if (
      !userName ||
      !userMobNo ||
      !userEmailId ||
      !userSex ||
      !userDoB ||
      !userLocation ||
      !userAltMobNo
    ) {
      setMessage("Please fill out all fields.");
      console.log(message);
      return;
    }

    const registrationData = {
      userName,
      userMobNo,
      userEmailId,
      userSex,
      userDoB,
      userLocation,
      userAltMobNo,
      userId,
    };

    console.log(registrationData);

    // You would fetch to your server's registration endpoint here
    fetch("http://localhost:5000/api/buyer/updatebuyerDetails", {
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
        // setMessage("Registration successful");
      })
      .catch((error) => {
        console.error("Network error:", error);
        // setMessage("Registration failed");
      });
  };

  return (
    <>
      <div className="profile">
        <Profile_sidebar />
        {/* <div className="watchlist"> */}
        <div className="profile-dtls">
          <div className="profile_card">
            <div className="profileheader">
              <h1>Update Your Profile</h1>
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Full Name</b>
              </p>
              <input
                type="text"
                name="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Mobile Number </b>
              </p>
              <input
                type="text"
                name="mob_no"
                value={userMobNo}
                onChange={(e) => setuserMobNo(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Email Id </b>
              </p>
              <input
                type="email"
                name="email"
                value={userEmailId}
                onChange={(e) => setuserEmailId(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Date Of Birth </b>
              </p>
              <input
                type="date"
                name="dob"
                value={userDoB}
                onChange={(e) => setuserDoB(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Location </b>
              </p>
              <input
                type="text"
                name="loc"
                value={userLocation}
                onChange={(e) => setuserLocation(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Alternate Mobile </b>
              </p>
              <input
                type="number"
                name="alt_num"
                value={userAltMobNo}
                onChange={(e) => setuserAltMobNo(e.target.value)}
              />
            </div>
            <button className="profile-btn" onClick={handleUpdate}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEditPage;
