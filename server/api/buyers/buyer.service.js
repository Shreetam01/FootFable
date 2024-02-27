const pool = require("../../config/database");

module.exports = {
  getbuyer: (data, callback) => {
    pool.query(
      "SELECT * FROM userdetails WHERE userId = ?",
      [data.userId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  logIn:(data, callback) => {
    pool.query(
        'SELECT userId ,userName, userPassWord FROM userdetails WHERE userEmailId = ?',
        [
            data.email
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    )
  },
  insertBuyer: (data, callback) => {
    pool.query(
      "INSERT INTO userdetails(userName, userMobNo, userEmailId, userSex, userDoB, userLocation, userAltMobNo, userPassWord) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.username,
        data.mobNo,
        data.email,
        data.gender,
        data.dob,
        data.location,
        data.altMobNo,
        data.password
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
          console.log("post.service");
        }
        return callback(null, results);
      }
    );
  },
  updatebuyer: (data, callback) => {
    pool.query(
      "UPDATE userdetails SET userName = (?),userMobNo = (?),userEmailId = (?),userSex = (?),userDoB = (?),userLocation = (?), userAltMobNo = (?) WHERE userId = (?);",
      [
        data.userName,
        data.userMobNo,
        data.userEmailId,
        data.userSex,
        data.userDoB,
        data.userLocation,
        data.userAltMobNo,
        data.userId,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  insertAddress: (data, callback) => {
    pool.query(
      "INSERT INTO useraddressdetails(userId, deleveredName, deleveredMobNo, pincode, address, city, state, altMobNo) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.userId,
        data.deleveredName,
        data.deleveredMobNo,
        data.pincode,
        data.address,
        data.city,
        data.state,
        data.altMobNo
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
          console.log("post.service");
        }
        return callback(null, results);
      }
    );
  },
  getAddress: (data, callback) => {
    pool.query(
      "SELECT * FROM useraddressdetails WHERE userId = ?",
      [data.userId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  availableBuyer: (data, callback) => {
    pool.query(
      "SELECT COUNT(*) AS userCount FROM userdetails WHERE userEmailId = ?",
      [data.email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
