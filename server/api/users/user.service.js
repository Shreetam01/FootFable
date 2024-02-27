const pool = require("../../config/database");

module.exports = {
    create:(data, callback) => {
        pool.query(
            'INSERT INTO user(username, email, password) VALUES(?, ?, ?)',
            [
                data.username,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUsers: callback => {
        pool.query(
            'SELECT id, username, email, password FROM user',
            [],
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
            'SELECT id, password FROM seller_details WHERE email = ?',
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
    getUserInfo:(data, callback) =>{
        pool.query(
            'SELECT userName, userMobNo, userEmailId, userSex, userDoB, userLocation, userAltMobNo FROM seller_details WHERE userId = 1',
            // [data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    }
};