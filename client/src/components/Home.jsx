import React, { useEffect, useState } from "react";
import Pic from "./rotate.png"
import "./Home.css";
import Navheader from "../navigation/Navheader";
import Img1 from "./abcd.jpg";
import Nike from "./nikee.svg";
import Puma from "./puma.svg";
import Vans from "./vans1.png";
import Adidas from "./adidas.svg";
import VansIcon from "./vans.svg";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import { IoAlertCircleSharp } from "react-icons/io5";
import { GrSupport } from "react-icons/gr";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
const images = [Img1, Vans, Adidas];
const Home = (props) => {
  const [newitems, setNewitems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/getNewProductsdetails"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setNewitems(result.data);
        console.log(newitems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    <Navheader />
      <div className="servicesection">
        <div className="services" id="fstservivecontaint">
          <MdOutlineRocketLaunch/>
          <div className="servivecontaint">
            <p>
              {" "}
              <b>FREE SHIPPING</b>
            </p>
            <p>Orders $50 or more</p>
          </div>
        </div>
        <div className="services">
          <GiReturnArrow />
          <div className="servivecontaint">
            <p>
              {" "}
              <b>FREE RETURNS</b>
            </p>
            <p>Within 30 days</p>
          </div>
        </div>
        <div className="services">
          <IoAlertCircleSharp />
          <div className="servivecontaint">
            <p>
              {" "}
              <b>GET 20% OFF 1 ITEM</b>
            </p>
            <p>When you sign up</p>
          </div>
        </div>
        <div className="services">
          <GrSupport />
          <div className="servivecontaint">
            <p>
              {" "}
              <b>WE SUPPORT</b>
            </p>
            <p>24/7 amazing services</p>
          </div>
        </div>
      </div>
      <div className="newproductsection">
        <div className="companyheader">
          <h1>New Arival</h1>
        </div>
        <div className="card-container" id="home-cart-container">
        {newitems.map((elem) => (
          <div key={elem.id} className="card">
            <img src={elem.img} alt={elem.title} className="card-img" />
            <div className="card-details">
              <Link className="product-link" to={`/products/${elem.id}`}>
                <h3 className="card-title">{elem.title}</h3>
              </Link>
              <section className="card-reviews">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStar />
                <span className="total-reviews">{elem.reviews}</span>
              </section>
              <section className="card-price">
                <div className="price">
                  <del> {elem.prevPrice} </del> ${elem.newPrice}
                </div>
                {/* <div className="bag-icon">
                  <CiHeart fontSize={25} />
                </div> */}
              </section>
            </div>
          </div>
        ))}
      </div>
      <div className="companyheaderbutton">
          <Link to={"/products"} className="companybutton"><b>Explore More</b><FaLongArrowAltRight/></Link>
        </div>
      </div>
      <div className="companysection">
        <div className="companyheader">
          <h1>Brands</h1>
        </div>
        <div className="home-card-container">
          <div className="homecard">
            <img src={Nike} alt="" className="card-img" />
          </div>
          <div className="homecard">
            <img src={Adidas} alt="" className="card-img" />
          </div>
          <div className="homecard">
            <img src={Puma} alt="" className="card-img" />
          </div>
          <div className="homecard">
            <img src={VansIcon} alt="" className="card-img" />
          </div>
        </div>
      </div>
      <div className="Navheader">
        <div className="navbanner"id="footerbanner">
          <div className="navleftSection">
            <div className="navlftsecContant">
              <h1>Sell Online with FootFable</h1>
              <br />
              <p>Low Cost of  Doing Business</p>
              <br />
              {/* <br /> */}
              <Link to={"/sellerLogin"} className="navlftinput">
                Click Here
              </Link>
            </div>
          </div>
          <div className="navrightSection" id="footerrightsection">
            <img src={Pic} alt="" />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
