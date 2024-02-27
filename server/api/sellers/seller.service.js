const pool = require("../../config/database");

module.exports = {
    // getbuyer: (data, callback) => {
    //   pool.query(
    //     "SELECT * FROM userdetails WHERE userId = ?",
    //     [data.userId],
    //     (error, results, fields) => {
    //       if (error) {
    //         return callback(error);
    //       }
    //       return callback(null, results);
    //     }
    //   );
    // },
    logIn:(data, callback) => {
        pool.query(
            'SELECT seller_Id ,selller_name, seller_password FROM seller_details WHERE seller_emailId = ?',
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
          "INSERT INTO seller_details(selller_name, seller_mobNo, seller_emailId, seller_gender, seller_dob, seller_location, seller_altMobNo, seller_password	) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)",
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
      availableSeller: (data, callback) => {
        pool.query(
          "SELECT COUNT(*) AS sellerCount FROM seller_details WHERE seller_emailId = ?",
          [data.email],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            return callback(null, results);
          }
        );
      },
}