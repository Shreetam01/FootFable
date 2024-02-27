const { insertBuyerDetails, getbuyerDetails,updatebuyerDetails,logInUser ,insertAddressDetails ,getbuyerAddress ,availableBuyerById } = require("./buyer.controller");
const router = require("express").Router();

router.post("/", availableBuyerById);
router.post("/getbuyerDetails", getbuyerDetails);
router.post("/availableBuyerById", availableBuyerById);
router.post("/updatebuyerDetails", updatebuyerDetails);
router.post("/login",logInUser);

router.post("/insertAddressDetails",insertAddressDetails);
router.post("/getbuyerAddress",getbuyerAddress);

module.exports = router;