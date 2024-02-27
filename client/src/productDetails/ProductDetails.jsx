import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { TbCashBanknoteOff } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = (props) => {
  const { id } = useParams();
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
          "http://localhost:5000/api/product/getProductDetailssByProductId",
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

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleActiveSize = (size) => {
    setActiveSize(size === activeSize ? null : size);
  };

  const addOnCart = (productId) => {
    const cartData = {
      userId,
      productId,
      productQuantity: quantity,
      shoeSize,
    };

    fetch("http://localhost:5000/api/product/cartdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); 
      })
      .then((data) => {
        console.log("Added to cart:", data);
        toast.success('Added to cart successfully', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
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
        return response.json(); 
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

  return (
    <div>
      {props.logInsts ? (
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
                <h4>$ {product.newPrice}</h4>
              </div>
              <div className="pdsize">
                <label>Select Size :</label>
                <div className="sizebtngrp">
                <button
                  id={activeSize === 7 ? "black" : ""}
                  onClick={() => {
                    setshoeSize(7);
                    toggleActiveSize(7);
                  }}
                >
                  7
                </button>
                <button
                  id={activeSize === 8 ? "black" : ""}
                  onClick={() => {
                    setshoeSize(8);
                    toggleActiveSize(8);
                  }}
                >
                  8
                </button>
                <button
                  id={activeSize === 9 ? "black" : ""}
                  onClick={() => {
                    setshoeSize(9);
                    toggleActiveSize(9);
                  }}
                >
                  9
                </button>
                <button
                  id={activeSize === 10 ? "black" : ""}
                  onClick={() => {
                    setshoeSize(10);
                    toggleActiveSize(10);
                  }}
                >
                  10
                </button>
              </div>
              </div>
              <div className="pdquantity">
                <label>Select Quantity :</label>
                <div className="selectpdquantity">
                  <button onClick={decreaseQuantity}>-</button> <span>{quantity}</span> <button onClick={increaseQuantity}>+</button>
                </div>
              </div>
              <div className="shifting">
                <span>
                  <TbCashBanknoteOff />
                  <b>Free Sifting On FootFable</b>
                </span>
              </div>
              <div className="addtocartList">
                <button id="addtocartListbtn" onClick={() => addOnCart(id)}>
                  Add To Cart
                </button>
              </div>
              <div className="saveinWatchlist">
                <button id="saveinWatchlistbtn"onClick={()=>addToWatchlist(id)}>Save In Watch List</button>
              </div>
            </div>
          </div>
          <ToastContainer />
        </>
      ) : (
        <>
        <div className="loginfst">
          <h1>Log In First To See The Product Details</h1>
          <Link className="lnkbtn" to="/logIn"> Log In</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
