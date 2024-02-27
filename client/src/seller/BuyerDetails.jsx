import React, { useEffect, useState } from "react";
// import "./ProductDetails.css";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { IoMdResize } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";
import { TbCashBanknoteOff } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuyerDetails = (props) => {
  const { id } = useParams();
  // const [id, setid] = useState(2)
  const [userId, setuserId] = useState(props.id);
  const [shoeSize, setshoeSize] = useState(null);
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1);
  // const [productQuantity, setproductQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/getOrderDetailsByOrderId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          setProduct(data.data[0]);
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Fetch request error:", error);
      }
    };

    fetchData();
  }, [id]);


  return (
        <>
          <div className="productDetails">
            <div className="productdetailsimg">
              <img
                src={product.img}
                alt=""
              />
            </div>
            <div className="productdtlsdetails">
              <div className="tagline">
                <p>{product.company}</p>
              </div>
              <div className="pdtitle">
                <h2>{product.title}</h2>
              </div>
              <div className="pdprice">
                <h4> Total Price :{" "}$ {product.productQuantity*product.newPrice}</h4>
              </div>
              <div className="shifting">
                <span>
                  <IoMdResize />
                  <b>Size :  </b>
                  {"  "}
                  <b>{product.shoeSize}</b>
                </span>
              </div>
              <div className="shifting">
                <span>
                  <MdOutlineProductionQuantityLimits />
                  <b>Quantity : </b>
                  {"  "}
                  <b>{product.productQuantity}</b>
                </span>
              </div>
              <div className="shifting">
                <span>
                  <FaCircleUser />
                  <b>Buyer Name : </b>
                  {"  "}
                  <b>{product.userName}</b>
                </span>
              </div>
              <div className="shifting">
                <span>
                  <FaSquarePhone />
                  <b>Buyer Mob No : </b>
                  {"  "}
                  <b>{product.userMobNo}</b>
                </span>
              </div>
              <div className="shifting">
                <span>
                  <FaLocationArrow />
                  <b>Address : </b>
                  {"  "}
                  <b>{product.userLocation}</b>
                </span>
              </div>
            </div>
          </div>
          <ToastContainer />
        </>
  )
}

export default BuyerDetails