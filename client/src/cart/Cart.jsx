import React, { useState, useEffect } from "react";
import "./Cart.css";
import CartNavigation from "../navigation/CartNavigation";
import { MdLogin, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const [cartItems, setcartItems] = useState([]);
  const [userId, setuserId] = useState(props.id);
  const [selectedState, setSelectedState] = useState("");
  const [newCartItems, setnewCartItems] = useState([]);
  // const [shoeSize, setshoeSize] = useState(second)
  // const [quantity, setquantity] = useState(3)

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/product/getcartdetailsbyId",
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
        setnewCartItems(data.data);
        console.log(cartItems);
        // setquantity(data.data.productQuantity)
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

  // useEffect(() => {
  //   // Retrieve cart items from local storage
  //   const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //   setcartItems(storedCart);
  // }, []);

  // const updateQuantity = (id, newQuantity) => {
  //   // Ensure the quantity doesn't go below 1
  //   const updatedQuantity = Math.max(1, newQuantity);

  //   const updatedCart = cartItems.map(item =>
  //     item.id === id ? { ...item, quantity: updatedQuantity } : item
  //   );

  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   setcartItems(updatedCart);
  // };

  const increaseCartItemsQuantityNo = (id, shoeSize) => {
    const increaseqntity = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/increaseCartItemsQuantityNo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, productId: id, shoeSize }),
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

    increaseqntity();
  };

  const decreaseCartItemsQuantityNo = (id, shoeSize) => {
    if (newCartItems.productQuantity <= 1) {
      console.log("hi");
    }
    const dcrqntity = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/decreaseCartItemsQuantityNo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, productId: id, shoeSize }),
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

    dcrqntity();
  };

  const removeFromCart = (id, shoeSize) => {
    const removeData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/removeCartItems",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, productId: id, shoeSize }),
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
  

  const addToWatchlist = (productId) => {
    const WatchListData = {
      userId,
      productId,
    };

    fetch("http://localhost:5000/api/product/insertWatchListProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(WatchListData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then((data) => {
        console.log("Added to cart:", data);
        toast.success("Added to WatchList successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error("Network error:", error);
        toast.error("Failed to add to cart", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const addToOrder = () => {
    // console.log(cartItems);
    const addOrderData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/insertItemsOrder",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCartItems),
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          console.log("Order placed successfully:", data);
          fetchData();
          toast.success("Your Order Is Placed Successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          console.error("Failed to place order");
          // Handle error, notify the user, etc.
        }
      } catch (error) {
        console.error("Fetch request error:", error);
        // Handle error, notify the user, etc.
      }
    };
  
    addOrderData();
  };
  

  const total = newCartItems.reduce(
    (acc, item) => acc + item.newPrice * item.productQuantity,
    0
  );

  // console.log(cartItems);

  return (
    <div className="minh50">
      {props.logInsts ? (
        <>
          <CartNavigation />
          {newCartItems.map((item) => (
            <div className="cart" key={item.id}>
              <div className="cart-card">
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
                    <h3>Size : </h3>
                    <span> {item.shoeSize} </span>
                  </div>
                  <div className="quantity">
                    <h3>Quantity : </h3>
                    <button
                      onClick={() =>
                        decreaseCartItemsQuantityNo(item.id, item.shoeSize)
                      }
                    >
                      {" "}
                      <h3>
                        <b>-</b>
                      </h3>{" "}
                    </button>
                    <span> {item.productQuantity} </span>
                    <button
                      onClick={() =>
                        increaseCartItemsQuantityNo(item.id, item.shoeSize)
                      }
                    >
                      {" "}
                      <h3>
                        <b>+</b>
                      </h3>{" "}
                    </button>
                  </div>
                  <div className="activity">
                    <div className="view-item">
                      <Link to={`/products/${item.id}`}>View Product</Link>
                    </div>
                    <span>|</span>
                    <div className="watchlist-item">
                      <button onClick={() => addToWatchlist(item.id)}>
                        Add To Watchlist
                      </button>
                    </div>
                    <span>|</span>
                    <div className="remove-item">
                      <button
                        onClick={() => removeFromCart(item.id, item.shoeSize)}
                      >
                        Remove Product
                      </button>
                    </div>
                  </div>
                </div>
                <div className="cart-product-price">
                  <div className="price">
                    <h2>${item.newPrice * item.productQuantity}</h2>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <table>
            <tr className="headline">
              <th className="Price">Total Price</th>
              <th className="Action">${total.toFixed(2)}</th>
              <th className="Action">
                <button onClick={() => addToOrder()}>Click to Peoceed</button>{" "}
                <ToastContainer />
              </th>
            </tr>
          </table>
        </>
      ) : (
        <>
          <div className="loginfst">
            <h1>Log In First to see the Cart details</h1>
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

export default Cart;
