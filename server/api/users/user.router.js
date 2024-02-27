const { createUser ,getUsers , logInUser, decodeJwt} = require("./user.controller");
const router = require("express").Router();
var jwt = require("jsonwebtoken")

router.post("/",createUser);
router.get("/", getUsers);
router.post("/login",logInUser);
router.post("/decodeToken",decodeJwt);

module.exports = router;