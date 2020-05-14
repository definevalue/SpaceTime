const User = require('../models/user');
const extend = require('lodash/extend');
const fs = require('fs');
const formidable = require('formidable');
const multiparty = require('multiparty');

//create a new user record and store it in the database
const create = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
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
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec();
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
    req.profile.password = undefined;
    return res.json(req.profile);
}

//update an user record, run after userByID
const update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }
        let user = req.profile
        user = extend(user, fields)
        user.updated = Date.now()
        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType = files.photo.type
        }
        try {
            await user.save()
            user.password = undefined
            res.json(user)
        } catch (err) {
            return res.status(400).json({
                error: err
            })
        }
    })
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

const photo = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set("Content-Type", req.profile.photo.contentType)
        return res.send(req.profile.photo.data)
    }
    next()
}

const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd() + '/public/profile.png');
}

const addFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId,
            { $push: { following: req.body.followId } })
        next()
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}

const addFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(req.body.followId,
            { $push: { followers: req.body.userId } },
            { new: true })
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec()
        result.password = undefined;
        res.json(result);
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}

const removeFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId,
            { $pull: { following: req.body.unfollowId } })
        next()
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}
const removeFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(req.body.unfollowId,
            { $pull: { followers: req.body.userId } },
            { new: true })
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec()
        result.password = undefined;
        res.json(result);
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}

const findPeople = async (req, res) => {
    let following = req.profile.following
    following.push(req.profile._id)
    try {
        let users = await User.find({ _id: { $nin: following } })
            .select('name')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}


module.exports = {
    create,
    update,
    userByID,
    list,
    remove,
    read,
    photo,
    defaultPhoto,
    addFollower,
    addFollowing,
    removeFollower,
    removeFollowing,
    findPeople
};
