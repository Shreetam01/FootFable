import React, { useEffect, useState } from "react";
import "./productForm.css";
import { Link } from "react-router-dom";

const ProductForm = ({ stoken, seller_Id, seller_logInsts }) => {
  // const [seller_Id, setseller_Id] = useState(props.seller_Id);
  const [title, settitle] = useState("");
  const [prevPrice, setprevPrice] = useState();
  const [newPrice, setnewPrice] = useState();
  const [company, setcompany] = useState("");
  const [color, setcolor] = useState("");
  const [category, setcategory] = useState("");
  const [img, setimg] = useState("");
  const [token, settoken] = useState(stoken);
  const [message, setMessage] = useState("");

  console.log(token);

  useEffect(() => {
    const storedseller_token = localStorage.getItem("token");
    if (storedseller_token !== null) {
      settoken(JSON.parse(storedseller_token));
    }
  }, [localStorage.getItem("token")]);

  console.log(token);

  const handleProductInsertion = () => {
    if (
      !title ||
      !prevPrice ||
      !newPrice ||
      !company ||
      !color ||
      !category ||
      !img ||
      !token
    ) {
      setMessage("Please fill out all fields.");
      console.log(message);
      return;
    }

    const productData = {
      title,
      prevPrice,
      newPrice,
      company,
      color,
      category,
      img,
      token,
    };

    console.log(productData);

    // You would fetch to your server's registration endpoint here
    fetch("http://localhost:5000/api/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then((data) => {
        console.log("Product Submition Response:", data);
        if (data.data.affectedRows == 1) {
          setMessage("Product Submit Successfull");
          alert("Product Submit Successfull");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
        // setMessage("Registration failed");
      });
  };

  return (
    <div>
      {seller_logInsts ? (
        <>
          {/* <div className="logIn" id="regfrm">
        <div className="profile-dtls">
          <div className="profile_card">
          <div className="profileheader">
              <h1>Insert Product Details</h1>
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Product Name</b>
              </p>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Previous Value </b>
              </p>
              <input
                type="number"
                name="prevPrice"
                value={prevPrice}
                onChange={(e) => setprevPrice(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Updated Price </b>
              </p>
              <input
                type="number"
                name="newPrice"
                value={newPrice}
                onChange={(e) => setnewPrice(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Company </b>
              </p>
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setcompany(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Color </b>
              </p>
              <input
                type="text"
                name="color"
                value={color}
                onChange={(e) => setcolor(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Category </b>
              </p>
              <input
                type="text"
                name="category"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              />
            </div>
            <div className="profile_dtls_clm">
              <p className="label">
                <b>Product Image </b>
              </p>
              <input
                type="text"
                name="img"
                value={img}
                onChange={(e) => setimg(e.target.value)}
              />
            </div>
            <button className="profile-btn" onClick={handleProductInsertion}>
              Save
            </button>
          </div>
        </div>
      </div> */}
          <div className="logIn" id="regfrm">
            <div className="profileheader">
              <h1>Starting Business With FootFable</h1>
            </div>
            <div className="loginform" id="regForm">
              <div className="profile-dtls">
                <div className="profile_card">
                  <div className="profile_dtls_clm">
                    <p className="label">
                      <b>Product Name</b>
                    </p>
                    <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
                  </div>
                  <div className="profile_dtls_clm">
                    <p className="label">
                      <b>Previous Value </b>
                    </p>
                    <input
                type="number"
                name="prevPrice"
                value={prevPrice}
                onChange={(e) => setprevPrice(e.target.value)}
              />
                  </div>
                  <div className="profile_dtls_clm">
                    <p className="label">
                      <b>Updated Price </b>
                    </p>
                    <input
                type="number"
                name="newPrice"
                value={newPrice}
                onChange={(e) => setnewPrice(e.target.value)}
              />
                  </div>
                  <div className="profile_dtls_clm">
                    <p className="label">
                      <b>Company </b>
                    </p>
                    <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setcompany(e.target.value)}
              />
                  </div>
                  {/* <div className="profile_dtls_clm">
                    <p className="label">
                      <b>Gender </b>
                    </p>
                    <div className="genlbl">
                      <label>
                        <input
                          type="radio"
                          name="gen"
                          value="1"
                          onChange={(e) => setgender(1)}
                        />
                        Male
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gen"
                          value="2"
                          onChange={(e) => setgender(2)}
                        />
                        Female
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="profile-dtls">
                <div className="profile_card">
                  <div className="profile_dtls_clm">
                    <p className="label">
                      <b>Color </b>
                    </p>
                    <input
                type="text"
                name="color"
                value={color}
                onChange={(e) => setcolor(e.target.value)}
              />
                  </div>
                  <div className="profile_dtls_clm">
                    <p className="label">
                      <b>Category </b>
                    </p>
                    <input
                type="text"
                name="category"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              />
                  </div>
                  <div className="profile_dtls_clm">
                    <p className="label">
                      <b>Product Image </b>
                    </p>
                    <input
                type="text"
                name="img"
                value={img}
                onChange={(e) => setimg(e.target.value)}
              />
                  </div>
                  <button
                    className="profile-btn"
                    id="regbtn"
                    onClick={handleProductInsertion}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="regInLogIn">
              <p>Already A Seller</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="loginfst">
            <h1>Log In First to see the Product details</h1>
            <Link className="lnkbtn" to="/sellerLogIn">
              {" "}
              Log In
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductForm;
