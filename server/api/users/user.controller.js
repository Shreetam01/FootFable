const { create ,getUsers ,logIn ,getUserInfo} =require("./user.service");
const bcrypt =require ("bcrypt");
var jwt = require("jsonwebtoken");
// const cookieParser = require('cookie-parser');

function ensureToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403)
    }
}

module.exports = {
    createUser: (req,res)=>{
        const body = req.body;
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(body.password, salt);
        create(body, (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    msg:"DB CONNECTION ERROR"
                })
            }
            return res.status(200).json({
                success:1,
                data: results
            })
        })
    },
    getUsers :[ensureToken , (req,res)=>{
        jwt.verify(req.token, 'my_secret_key',(err,data)=>{
            if(err){
                res.status(403).json({
                    success: 0,
                    msg: "TOKEN NOT VALID",
                  });
            }
            else{
                getUsers((err,results)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    return res.json({
                        success:1,
                        data: results
                    })
                })
            }
        })
    }],
    logInUser: (req,res)=>{
        const body = req.body;
        logIn(body, (err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    msg:"DB CONNECTION ERROR"
                })
            }
            else{
                if(results.length != 0){
                    const user = results[0];
                    bcrypt.compare(body.password, user.password, (bcryptErr, passwordMatch) => {
                        if (bcryptErr) {
                        console.error('Bcrypt error:', bcryptErr);
                        return res.status(500).send('Internal server error');
                        }

                        if (passwordMatch) {
                            const usr ={ id: user.id};
                            const token = jwt.sign({usr}, 'my_secret_key');
                            res.cookie("jwtoken", token, { httpOnly: true });
                            res.json({
                                user: user.id,
                                token :token
                            })
                        } 
                        else {
                            res.status(401).send('Invalid username or password');
                        }
                    });
                }
                else{
                    return res.status(401).send('Invalid email or password');
                }
            }
        })
    },
    decodeJwt: (req, res) => {
        // const secret ="my_secret_key";
        const body = req.body;
        // const token = body.token;
        // const userId  = jwt.decode(token).usr.id
        // console.log(userId );
        getUserInfo(userId , (err,results) => {
            if(err){
                console.log(err);
                // res.cookie('user', 'John Doe', { maxAge: 900000, httpOnly: true });
                return res.status(500).json({
                    success:0,
                    msg:"DB CONNECTION ERROR"
                })
            }
            return res.status(200).json({
                success:1,
                data: results
            })
        })
    }
}