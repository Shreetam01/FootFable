const {
  insertBuyer,
  getbuyer,
  updatebuyer,
  logIn,
  insertAddress,
  getAddress,
  availableBuyer,
} = require("./buyer.service");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

module.exports = {
  insertBuyerDetails: (req, res) => {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    insertBuyer(body, (err, results) => {
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
  logInUser: (req, res) => {
    const body = req.body;
    logIn(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "DB CONNECTION ERROR",
        });
      } else {
        if (results.length != 0) {
          const user = results[0];
          // console.log(user.userId);
          bcrypt.compare(
            body.password,
            user.userPassWord,
            (bcryptErr, passwordMatch) => {
              if (bcryptErr) {
                console.error("Bcrypt error:", bcryptErr);
                return res.status(500).send("Internal server error");
              }

              if (passwordMatch) {
                const usr = { id: user.userId };
                const token = jwt.sign({ usr }, "my_secret_key");
                res.cookie("jwtoken", token, { httpOnly: true });
                res.json({
                  user: user.userId,
                  userName: user.userName,
                  token: token,
                });
              } else {
                res.status(401).send(" username or password");
              }
            }
          );
        } else {
          return res.status(401).send("Invalid email or password");
        }
      }
    });
  },
  getbuyerDetails: (req, res) => {
    const body = req.body;
    getbuyer(body, (err, results) => {
      if (err) {
        console.log(err);
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
  updatebuyerDetails: (req, res) => {
    const body = req.body;
    updatebuyer(body, (err, results) => {
      if (err) {
        console.log(err);
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
  insertAddressDetails: (req, res) => {
    const body = req.body;
    // const salt = bcrypt.genSaltSync(10);
    // body.password = bcrypt.hashSync(body.password, salt);
    insertAddress(body, (err, results) => {
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
  getbuyerAddress: (req, res) => {
    const body = req.body;
    getAddress(body, (err, results) => {
      if (err) {
        console.log(err);
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
  availableBuyerById: (req, res) => {
    const body = req.body;
  
    availableBuyer(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          msg: "DB CONNECTION ERROR",
        });
      } 
      else {
        if (results && results[0].userCount === 0) {
          const salt = bcrypt.genSaltSync(10);
          body.password = bcrypt.hashSync(body.password, salt);
  
          insertBuyer(body, (insertErr, insertResults) => {
            if (insertErr) {
              console.log(insertErr + "controller");
              return res.status(500).json({
                success: 0,
                msg: "DB CONNECTION ERROR",
              });
            }
            return res.status(200).json({
              success: 1,
              msg: "You are now Registered",
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
  
};
