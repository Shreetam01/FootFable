import React, { useState, useEffect } from "react";
import CartNavigation from "../navigation/CartNavigation";
import { MdLogin, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import "./Cart.css";

const Order = (props) => {
  const [userId, setuserId] = useState(props.id);
  const [watchListItems, setwatchListItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/product/getOrderDetailsById",
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
        setwatchListItems(data.data);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return (
        <>
          <div className="profile-dtls">
            <h1 className="profile-dtls-header">Your Orders</h1>
            {watchListItems.map((item) => {
              return (
                <>
                  <div id="watchlistCard">
                    <div className="cart-product-image">
                      <img src={item.img} alt="" />
                    </div>
                    <div className="cart-product-details">
                      <h2 className="title">{item.title}</h2>
                      <div className="company">
                        <h3>Company : </h3>
                        <span> {item.company} </span>
                      </div>
                      <div className="company">
                        <h3>Category : </h3>
                        <span> {item.category} </span>
                      </div>
                      <div className="company">
                        <h3>Quantity : </h3>
                        <span> {item.productQuantity} </span>
                      </div>
                      <div className="company">
                        <h3>Size : </h3>
                        <span> {item.shoeSize} </span>
                      </div>
                    </div>
                    <div className="cart-product-price">
                    <div className="price">
                        <h2>$ {item.productQuantity*item.newPrice}</h2>
                      </div>
                      <div className="price">
                        <h3 id="red">Delevery Pending</h3>
                      </div>
                      <div className="order_invoice">
                        {/* <button>Download Invoice</button> */}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
  );
};

export default Order;
