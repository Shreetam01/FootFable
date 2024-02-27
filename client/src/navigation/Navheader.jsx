import React, { useState } from "react";
import "./Navbar.css";
import ShoePic from "./navShoepic.png";
import { CiSearch } from "react-icons/ci";

const Navheader = (props) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearch(name);
  };
  return (
    <>
      <div className="Navheader">
        <div className="navbanner">
          <div className="navleftSection">
            <div className="navlftsecContant">
              <h1>Browse Million</h1>
              {/* <br /> */}
              <h1>Products for Your Needs</h1>
              <br />
              {/* <br /> */}
              
              <form className="navlftinput" onSubmit={handleSubmit}>
                <input type="text" placeholder="I want to buy ..." value={name} className="search-input" onChange={handleChange}/>
                <button type="submit" className="navlftinputIcn">
                  <CiSearch color="white" />
                </button>
              </form>
            </div>
          </div>
          <div className="navrightSection">
            <img src={ShoePic} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navheader;
