import React, { useEffect, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { IoTrashBinOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerProduct = (props) => {
  const [sellerId, setsellerId] = useState(props.sid);
  const [sellerProduct, setsellerProduct] = useState([]);

  const fetchData = async (e) => {

    try {
      const response = await fetch(
        "http://localhost:5000/api/product/getProductsDetailsBysellerId",
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
    <h1>See Your Product</h1>
    </div>
    <div className="card-container">
      
        {sellerProduct.map((elem) => (
          <div key={elem.id} className="card">
            <img src={elem.img} alt={elem.title} className="card-img" />
            <div className="card-details">
              <Link className="product-link" to={`/products/${elem.id}`}>
                <h3 className="card-title">{elem.title}</h3>
              </Link>
              <section className="card-price">
                <div className="price">
                  <del> {elem.prevPrice} </del> ${elem.newPrice}
                </div>
                <div className="bag-icon">
                  <IoTrashBinOutline fontSize={25} onClick={()=>removeItem(elem.id)} />
                </div>
              </section>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
      </>
  )
}

export default SellerProduct