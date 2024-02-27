const {
  insertion,
  getProducts,
  insertionOrderDetails,
  insertCart,
  getProductsById,
  getorderById,
  getCartById,
  removeitems,
  increaseItemsNo,
  decreaseItemsNo,
  insertWatchList,
  getWatchListById,
  removeitemswtchlist,
  getProductsByProductId,
  getNewProducts,
  checkWatchListData,
  getProductsBysellerId,
  dltProductsById,
  insertOrder,
  removeCartitems,
  getOrdersBysellerId,
  getOrderDetailsByProductId,
} = require("./product.service");
var jwt = require("jsonwebtoken");

module.exports = {
  //product insert
  insertProduct: (req, res) => {
    const body = req.body;
    insertion(body, (err, results) => {
      if (err) {
        console.log(err + "controller");
        return res.status(500).json({
          success: 0,
          msg: "DB CONNECTION ERROR",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  //insert order details
  // insertionUserOrderDetails: (req, res) => {
  //   const body = req.body;
  //   insertionOrderDetails(body, (err, results) => {
  //     if (err) {
  //       console.log(err + "controller");
  //       return res.status(500).json({
  //         success: 0,
  //         msg: "DB CONNECTION ERROR",
  //       });
  //     }
  //     return res.status(200).json({
  //       success: 1,
  //       data: results,
  //     });
  //   });
  // },

  //get full product details
  getProductsdetails: (req, res) => {
    getProducts((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //get new product details
  getNewProductsdetails: (req, res) => {
    getNewProducts((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //insert product on cart
  insertCartProduct: (req, res) => {
    const body = req.body;
    insertCart(body, (err, results) => {
      if (err) {
        console.log(err + "controller");
        return res.status(500).json({
          success: 0,
          msg: "DB CONNECTION ERROR",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  //get specific product by product id  //////extra
  getProductsdetailsById: (req, res) => {
    const body = req.body;
    getProductsById(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //get order details of an user
  getOrderDetailsById: (req, res) => {
    const body = req.body;
    getorderById(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //get product by Product Id
  getProductDetailssByProductId: (req, res) => {
    const body = req.body;
    // const productId = req.params.id;
    getProductsByProductId(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  // get cart details of an user
  getCartDetailsById: (req, res) => {
    const body = req.body;
    getCartById(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //remove cart items
  removeCartItems: (req, res) => {
    const body = req.body;
    removeitems(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //increaseProductQntity
  increaseCartItemsQuantityNo: (req, res) => {
    const body = req.body;
    increaseItemsNo(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //desc product qntity
  decreaseCartItemsQuantityNo: (req, res) => {
    const body = req.body;
    decreaseItemsNo(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //insert Watchlist
  insertWatchListProduct: (req, res) => {
    const body = req.body;
    checkWatchListData(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "DB CONNECTION ERROR",
        });
      } 
      else {
        if (results && results[0].watchListCount === 0) {  
          insertWatchList(body, (insertErr, insertResults) => {
            if (insertErr) {
              console.log(insertErr + "controller");
              return res.status(500).json({
                success: 0,
                msg: "DB CONNECTION ERROR",
              });
            }
            return res.status(200).json({
              success: 1,
              msg: "Item is added to WatchList",
              data: insertResults,
            });
          });
        } 
        else {
          return res.status(401).send("EmailId already exists");
        }
      }
    });
  },

  // get cart details of an user
  getWatchListDetailsById: (req, res) => {
    const body = req.body;
    getWatchListById(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //remove cart items from watchlist
  removeItemsFromWtchlist: (req, res) => {
    const body = req.body;
    removeitemswtchlist(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //grt product details by sellerId
  getProductsDetailsBysellerId: (req, res) => {
    const body = req.body;
    getProductsBysellerId(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //dlt product 
  dltProductsByProductId: (req, res) => {
    const body = req.body;
    dltProductsById(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //insert Item to Cart
  insertItemsOrder: (req, res) => {
    const body = req.body;
    insertOrder(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      else {
        if (results && results.affectedRows !== 0) {  
          removeCartitems(body, (insertErr, insertResults) => {
            if (insertErr) {
              console.log(insertErr + "controller");
              return res.status(500).json({
                success: 0,
                msg: "DB CONNECTION ERROR",
              });
            }
            return res.status(200).json({
              success: 1,
              msg: "Item is added to WatchList",
              data: insertResults,
            });
          });
        } 
        else {
          return res.status(401).send("EmailId already exists");
        }
      }
    });
  },

  //grt product details by sellerId
  getOrdersDetailsBysellerId: (req, res) => {
    const body = req.body;
    getOrdersBysellerId(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  //get order by order Id
  getOrderDetailsByOrderId: (req, res) => {
    const body = req.body;
    // const productId = req.params.id;
    getOrderDetailsByProductId(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
};
