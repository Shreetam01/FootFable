import Profile_sidebar from "./Profile_sidebar";
import React, { useState, useEffect } from "react";
// import "./Cart.css";
import CartNavigation from "../navigation/CartNavigation";
import { MdLogin, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Profile_details from "./Profile_details";

const Watchlist = (props) => {
  const [userId, setuserId] = useState(props.id);
  const [watchlistItems, setwatchlistItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/product/getWatchListDetailsById",
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
        setwatchlistItems(data.data);
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

  const removeFromWatchList = (id) => {
    const removeData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/removeItemsFromWtchlist",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, productId: id }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("dlt", data);
          fetchData(); // Fetch updated cart data
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Fetch request error:", error);
      }
    };

    removeData();
  };

  return (
    <div>
      {props.logInsts ? (
        <>
          <div className="profile">
            <Profile_sidebar />
            <div className="profile-dtls">
              <h1 className="profile-dtls-header">Your WatchList</h1>
              {watchlistItems.map((item) => {
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
                        <div className="activity">
                          <div className="view-item">
                            <Link to={`/products/${item.id}`}>
                              View Product
                            </Link>
                          </div>
                          <span>|</span>
                          <div className="remove-item">
                            <button
                              onClick={() => removeFromWatchList(item.id)}
                            >
                              Remove Product
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="cart-product-price">
                        <div className="price">
                          <h2>${item.newPrice}</h2>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
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

export default Watchlist;
