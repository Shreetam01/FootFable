const { insertProduct ,getProductsdetails ,insertionUserOrderDetails ,insertCartProduct ,getProductsdetailsById ,getOrderDetailsById ,getCartDetailsById ,removeCartItems ,increaseCartItemsQuantityNo ,decreaseCartItemsQuantityNo ,removeItemsFromWtchlist ,getWatchListDetailsById ,insertWatchListProduct ,getProductDetailssByProductId ,getNewProductsdetails ,getProductsDetailsBysellerId ,dltProductsByProductId ,insertItemsOrder ,getOrdersDetailsBysellerId ,getOrderDetailsByOrderId} = require("./product.controller");
const router = require("express").Router();

router.post("/", insertProduct);
router.get("/getproductdetails", getProductsdetails);
router.get("/getNewProductsdetails", getNewProductsdetails);
router.post("/getProductDetailssByProductId", getProductDetailssByProductId);
router.post("/getProductsDetailsBysellerId", getProductsDetailsBysellerId);
router.post("/dltProductsByProductId", dltProductsByProductId);
router.post("/getOrderDetailsByOrderId", getOrderDetailsByOrderId);

router.post("/cartdetails", insertCartProduct);
router.post("/insertItemsOrder", insertItemsOrder);
router.post("/getcartdetailsbyId", getCartDetailsById);
router.post("/removeCartItems", removeCartItems);
router.post("/increaseCartItemsQuantityNo", increaseCartItemsQuantityNo);
router.post("/decreaseCartItemsQuantityNo", decreaseCartItemsQuantityNo);

router.post("/insertWatchListProduct", insertWatchListProduct);
router.post("/getWatchListDetailsById", getWatchListDetailsById);
router.post("/removeItemsFromWtchlist", removeItemsFromWtchlist);

// router.post("/postorderinfo", insertionUserOrderDetails);
router.post("/getOrdersDetailsBysellerId", getOrdersDetailsBysellerId);
router.post("/getorderdetailsbyId", getOrderDetailsById);

router.post("/getproductdetailsbyId", getProductsdetailsById);

// router.post("/getcartdetailsbyId", getCartDetailsById);

module.exports = router;
