import React, { useState } from "react";
import Profile_sidebar from "./Profile_sidebar";
import Order from "../cart/Order";
import { Link } from "react-router-dom";

const Orderpage = (props) => {
  const [userid, setuserid] = useState(props.id);
  return (
    <div>
      {props.logInsts ? (
        <>
          <div className="profile">
            <Profile_sidebar />
            <Order id={userid} />
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

export default Orderpage;
