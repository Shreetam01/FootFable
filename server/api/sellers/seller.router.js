const { logInUser ,availableSellerById } = require("./seller.controller");
const router = require("express").Router();

router.post("/", availableSellerById);
router.post("/login",logInUser);


module.exports = router;