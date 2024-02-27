import React, { useState } from "react";
import "./Profile.css";
import Profile_sidebar from "./Profile_sidebar";
import Profile_details from "./Profile_details";
import { Link } from "react-router-dom";

const Profile = (props) => {

  // console.log(props.id);

  return (
    <div>
      {props.logInsts ? (
        <>
      {/* <div className="profile"> */}
      {/* <Profile_sidebar/> */}
        <Profile_details uid={props.id} />
      {/* </div> */}
    </>
    ) : (
      <>
        <div className="loginfst">
          <h1>Log In First To See The Profile Details</h1>
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

export default Profile;
