const User = require('../models/user');
const extend = require('lodash/extend');

//create a new user record and store it in the database
const create = async (req, res) => {
    const user = new User(req.body);
    try {
        user = await user.save();
        return res.status(200).json({
            message: "Successfully signed up!"
        });
    } catch (err) {
        return res.status(400).json({
            error: err
        });
    }
}

//get all users
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created');
        res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: err
        });
    }
}

//find an user
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        //if not found, return with error code
        if (!user)
            return res.status('400').json({
                error: "User not found"
            });
        //else pass request to next function
        req.profile = user;
        next();
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        });
    }
}
   
//handle data returned, run after userByID
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}
   
//update an user record, run after userByID
const update = async (req, res) => {
    try {
        let user = req.profile;
        //update user
        user = extend(user, req.body);
        user.updated = Date.now();
        //save user
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    } catch (err) {
        return res.status(400).json({
            error: err
        });
    }
}

//delete an user record, run after userByID
const remove = async (req, res) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (err) {
        return res.status(400).json({
            error: err
        });
    }
}
   