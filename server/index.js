require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors"); 
const productRouter = require("./api/products/product.router");
const userRouter = require("./api/users/user.router");
const buyerRouter = require("./api/buyers/buyer.router");
const sellerRouter = require("./api/sellers/seller.router");

app.use(express.json());
app.use(cors());

app.use("/api/product", productRouter);
app.use("/api/buyer", buyerRouter);
app.use("/api/seller", sellerRouter);
// console.log("abc");

// const PORT = process.env.PORT || 3000;

app.listen(5000, () => {
    console.log("Server is running on port", 5000);
});
