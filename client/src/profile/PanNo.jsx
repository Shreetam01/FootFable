import React from "react";
import Profile_sidebar from "./Profile_sidebar";
import { Link } from "react-router-dom";
import PanPic from "./animatedPan.png"

const PanNo = (props) => {
  return (
    <div>
      {props.logInsts ? (
        <>
          <div className="profile">
            <Profile_sidebar />
            <div className="profile-dtls">
              <div className="profile_card">
              <div className="profileheader">
              <h1>Add Your Pan Cart</h1>
            </div>
                <div className="profile_dtls_clm">
                  <p className="label">
                    <b>PAN Number </b>
                  </p>
                  <input type="number" name="pan_no" />
                </div>
                <div className="profile_dtls_clm">
                  <p className="label">
                    <b>Account Holder Name</b>
                  </p>
                  <input type="text" name="name" />
                </div>
                <div className="profile_dtls_clm">
                  <p className="label">
                    <b>Upload PAN Card </b>
                  </p>
                  <input type="file" name="pan_img" />
                </div>
                <button className="profile-btn">Upload</button>
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

export default PanNo;
