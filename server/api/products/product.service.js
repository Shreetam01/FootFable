const pool = require("../../config/database");
var jwt = require("jsonwebtoken");

module.exports = {
  //insert product
  insertion: (data, callback) => {
    const decodedToken = jwt.verify(data.token, 'my_secret_key');
    const s_Id = decodedToken.usr.id;
    console.log(s_Id);
    
    pool.query(
      "INSERT INTO products(title, prevPrice, newPrice, company, color, category, img, seller_Id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.title,
        data.prevPrice,
        data.newPrice,
        data.company,
        data.color,
        data.category,
        data.img,
        s_Id,
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

  //insert order details
  // insertionOrderDetails: (data, callback) => {
  //   pool.query(
  //     "INSERT INTO orderdetails(buyerId, sellerId, productId, ProductQuantity, totalprice) VALUES(?, ?, ?, ?, ?)",
  //     [
  //       data.buyerId,
  //       data.sellerId,
  //       data.productId,
  //       data.ProductQuantity,
  //       data.totalprice,
  //     ],
  //     (error, results, fields) => {
  //       if (error) {
  //         return callback(error);
  //         console.log("post.service");
  //       }
  //       return callback(null, results);
  //     }
  //   );
  // },

  //get all product details
  getProducts: (callback) => {
    pool.query("SELECT * FROM products", [], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  //get new product details
  getNewProducts: (callback) => {
    pool.query("SELECT * FROM products ORDER BY id DESC LIMIT 4", [], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  //get product by product id
  getProductsByProductId: (data,callback) => {
    pool.query("SELECT * FROM products WHERE id =(?)", [data.id], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  //insert into cart
  insertCart: (data, callback) => {
    pool.query(
      "INSERT INTO cartdetails (userId, productId, productQuantity, shoeSize) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE productQuantity = productQuantity + 1",
      [data.userId, data.productId, data.productQuantity, data.shoeSize],
      (error, results, fields) => {
        if (error) {
          return callback(error);
          console.log("post.service");
        }
        return callback(null, results);
      }
    );
  },

  //get card details by cart user id
  getCartById: (data, callback) => {
    pool.query(
      "SELECT * FROM products INNER JOIN cartdetails ON cartdetails.productId=products.id AND cartdetails.userId = (?)",
      [data.userId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  //remove items from cart   /// update
  removeitems: (data, callback) => {
    pool.query(
      "DELETE FROM cartdetails WHERE cartdetails.userId=(?) AND cartdetails.productId=(?) AND cartdetails.shoeSize=(?)",
      [data.userId, data.productId , data.shoeSize],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  //update cart quantity increase //update
  increaseItemsNo: (data, callback) => {
    pool.query(
      "UPDATE cartdetails SET productQuantity = productQuantity + 1 WHERE cartdetails.userId=(?) AND cartdetails.productId=(?) AND cartdetails.shoeSize=(?)",
      [data.userId, data.productId, data.shoeSize],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  //update cart quantity dcs //update
  decreaseItemsNo: (data, callback) => {
    pool.query(
      "UPDATE cartdetails SET productQuantity = CASE WHEN productQuantity > 1 THEN productQuantity - 1 ELSE 1 END WHERE userId = ? AND productId = ? AND shoeSize = ?",
      [data.userId, data.productId, data.shoeSize],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  //get order details by user id
  getorderById: (data, callback) => {
    pool.query(
      "SELECT * FROM products INNER JOIN orderdetails ON orderdetails.productId = products.id WHERE orderdetails.userId = (?)",
      [data.userId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  //
  checkWatchListData: (data, callback) => {
    pool.query(
      "SELECT COUNT(*) AS watchListCount FROM watchlist  WHERE userId=(?) AND productId =(?)",
      [data.userId, data.productId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  //insrt data into watchlist
  insertWatchList: (data, callback) => {
    pool.query(
      "INSERT IGNORE INTO watchlist (userId, productId) VALUES (?, ?)",
      [data.userId, data.productId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
          console.log("post.service");
        }
        return callback(null, results);
      }
    );
  },

  //get watchlist by user id
  getWatchListById: (data, callback) => {
    pool.query(
      "SELECT * FROM products INNER JOIN watchlist ON watchlist.productId=products.id AND watchlist.userId = (?)",
      [data.userId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  //remove items from watchlist by product id
  removeitemswtchlist: (data, callback) => {
    pool.query(
      "DELETE FROM watchlist WHERE watchlist.userId=(?) AND watchlist.productId=(?)",
      [data.userId, data.productId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  //extra
  getProductsById: (data, callback) => {
    pool.query(
      "SELECT * FROM cartdetails WHERE userId = ?",
      [data.userId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  //get product by sellerId
  getProductsBysellerId: (data, callback) => {
    pool.query(
      "SELECT * FROM products WHERE seller_Id = ?",
      [data.sellerId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  //dlt product
  dltProductsById: (data, callback) => {
    pool.query(
      "DELETE FROM products WHERE id = (?)",
      [data.productId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  //insert order data
  insertOrder: (data, callback) => {
    const values = data.map(item => [
      item.userId,
      item.seller_Id,
      item.productId,
      item.productQuantity,
      item.shoeSize
    ]);
  
    pool.query(
      "INSERT INTO orderdetails (userId, seller_Id, productId, productQuantity, shoeSize) VALUES ?",
      [values],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  //remove items from cart by userid
  removeCartitems: (data, callback) => {
    pool.query(
      "DELETE FROM cartdetails WHERE cartdetails.userId=(?) ",
      [data[0].userId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  //get order by sellerId
  getOrdersBysellerId: (data, callback) => {
    pool.query(
      "SELECT * FROM orderdetails INNER JOIN products ON orderdetails.productId = products.id INNER JOIN userdetails ON orderdetails.userId = userdetails.userID WHERE orderdetails.seller_Id = (?)",
      [data.sellerId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  //get order by product id
  getOrderDetailsByProductId: (data,callback) => {
    pool.query("SELECT * FROM orderdetails INNER JOIN products ON orderdetails.productId = products.id INNER JOIN userdetails ON orderdetails.userId = userdetails.userID WHERE orderdetails.orderId = (?)", [data.id], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  
};
