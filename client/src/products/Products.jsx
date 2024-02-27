import React, { useState, useEffect } from "react";
import "./Product.css";
import { BsBag } from "react-icons/bs";
// import Data from "../db/data"
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
import Navigation from "../navigation/Navigation";
import { ToastContainer, toast } from "react-toastify";
import Navheader from "../navigation/Navheader";
import "react-toastify/dist/ReactToastify.css";

const Products = (props) => {
  const [items, setitems] = useState([]);
  const [cartItems, setcartItems] = useState([]);
  const [userId, setuserId] = useState(props.id);
  const [shoeSize, setshoeSize] = useState(7);
  const [productQuantity, setproductQuantity] = useState(1);
  // const [productQuantity, setproductQuantity] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/product/getproductdetails"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setitems(result.data);
      console.log(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {

    fetchData();
  }, []);

  const filterItems = (item) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.company === item;
    });
    setitems(updatedItems);
  };

  const searchProduct = (query) => {
    if (query.trim() === "") {
      fetchData(); 
    } else {
      const updatedItems = items.filter((curElem) =>
        curElem.title.toLowerCase().includes(query.toLowerCase())
      );
      setitems(updatedItems);
    }
  };

  useEffect(() => {
    searchProduct(props.searchQuery); 
  }, [props.searchQuery]);

  const addOnCart = (productId) => {
    const cartData = {
      userId,
      productId,
      productQuantity,
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
        toast.success("Added to cart successfully", {
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
    <>
    <Navheader onSearch={searchProduct}/>
      <div className="card-container">
        {items.map((elem) => (
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
                <div className="bag-icon">
                  {props.logInsts ?(
                    <>
                    <CiHeart fontSize={25} onClick={()=>addToWatchlist(elem.id)} />
                    </>
                  ):(
                    <>
                    </>
                  )}
                  
                </div>
              </section>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default Products;
