import React, { useEffect, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerOrderDetails = (props) => {
    const [sellerId, setsellerId] = useState(props.sid);
    const [sellerProduct, setsellerProduct] = useState([]);
  
    const fetchData = async (e) => {
  
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/getOrdersDetailsBysellerId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sellerId }),
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          setsellerProduct(data.data);
          console.log(data.data);
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Fetch request error:", error);
      }
    };
  
    useEffect(() => {
      
      // };
  
      fetchData();
    }, [sellerId]);
  
    const removeItem = (productId) => {
      const WatchListData = {
        productId,
      };
  
      fetch("http://localhost:5000/api/product/dltProductsByProductId", {
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
  
          toast.success("Remove product successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          fetchData()
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
    <div className="profileheader " id="sellerProductHeader">
    <h1>See Your Orders</h1>
    </div>
    <div className="card-container">
      
        {sellerProduct.map((elem) => (
          <div key={elem.id} className="card">
            <img src={elem.img} alt={elem.title} className="card-img" />
            <div className="card-details">
              <Link className="product-link" to={`/sellerOrderDetails/${elem.orderId}`}>
                <h3 className="card-title">{elem.title}</h3>
              </Link>
              <div className="fdc30">
              <p><b>Size : </b> <span>{elem.shoeSize}</span></p>
              <p><b>Quantity : </b> <span>{elem.productQuantity}</span></p>
              <p><b>Total Price : </b> <span>{elem.productQuantity*elem.newPrice}</span></p>
              <p><b>Address : </b> <span>{elem.userLocation}</span></p>
              
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
      </>
  )
}

export default SellerOrderDetails