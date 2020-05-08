const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();

//method to signin a user
const signin = async (req, res) => {
    try {
        //find record
        let user = await User.findOne({ "email": req.body.email });
        //check if exist
        if (!user)
            return res.status('401').json({ error: "User not found" })
        //check if password match
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) throw err;
            if(!isMatch)  return res.status('401').send({ error: "Email and password don't match." });
        });
        //generate a token signed with userID
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        //create a cookie
        res.cookie('t', token, { expire: new Date() + 9999 })
        //return json
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        return res.status('401').json({ error: "Could not sign in" })
    }
}
   
//method to signout
const signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
        message: "Signed out successfully!"
    });
}

//verify that a request has a valid token
//if valid, append user id to auth key in request object
const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});

//verify that user has access to delete or update a record
const hasAuthorization = (req, res, next) => {
    //check if profile exist, auth exist, and their id match
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        });
    }
    next();
}

module.exports = {
    signin, 
    signout, 
    requireSignin, 
    hasAuthorization
}