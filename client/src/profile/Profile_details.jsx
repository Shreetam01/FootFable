import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile_sidebar from "./Profile_sidebar";

const Profile_details = (props) => {
  const [profileInfo, setprofileInfo] = useState([]);
  const [userId, setuserId] = useState(props.uid)
  const [gender, setgender] = useState("")
  
  useEffect(() => {
    const fetchData = async (e) => {

        try {
          const response = await fetch(
            "http://localhost:5000/api/buyer/getbuyerDetails",
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
            setprofileInfo(data.data[0])
            if (data.data[0].userSex=="1") {
              setgender("Male")
            }
            else{
              setgender("Female")
            }
          } else {
            console.error("Login failed");
          }
        } catch (error) {
          console.error("Fetch request error:", error);
        }
      };
    // };

    fetchData();
  }, [userId]);
  return (

    <>
    <div className="profile">
        <Profile_sidebar/>
      <div className="profile-dtls">
        <div className="profile_card">
        <div className="profileheader" id="mb50">
              <h1>Your Profile</h1>
            </div>
          <div className="profile_dtls_clm" id="profile_dtls_clm_df">
            <p className="label" id="label_w_auto">
              <b>Full Name</b>
            </p>
            <p>{profileInfo.userName}</p>
          </div>
          <div className="profile_dtls_clm" id="profile_dtls_clm_df">
            <p className="label" id="label_w_auto">
              <b>Mobile Number </b>
            </p>
            
            <p>{profileInfo.userMobNo}</p>
          </div>
          <div className="profile_dtls_clm" id="profile_dtls_clm_df">
            <p className="label" id="label_w_auto">
              <b>Email Id </b>
            </p>
            <p>{profileInfo.userEmailId}</p>
          </div>
          <div className="profile_dtls_clm" id="profile_dtls_clm_df">
            <p className="label" id="label_w_auto">
              <b>Gender </b>
            </p>
            <p>{gender}</p>
          </div>
          <div className="profile_dtls_clm" id="profile_dtls_clm_df">
            <p className="label" id="label_w_auto">
              <b>Date Of Birth </b>
            </p>
            <p>{profileInfo.userDoB}</p>
          </div>
          <div className="profile_dtls_clm" id="profile_dtls_clm_df">
            <p className="label" id="label_w_auto">
              <b>Location </b>
            </p>
            <p>{profileInfo.userLocation}</p>
          </div>
          <div className="profile_dtls_clm" id="profile_dtls_clm_df">
            <p className="label" id="label_w_auto">
              <b>Alternate Mobile </b>
            </p>
            <p>{profileInfo.userAltMobNo}</p>
          </div>
          <Link className="profile-btn" to={"/profile/edit"}>Edit</Link>
        </div>
      </div>
      </div>
    </>
  );
};

export default Profile_details;
