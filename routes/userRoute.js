const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const authCtrl = require('../controllers/authCtrl');

const router = express.Router();

//get or create a new user
router.route('/users')
    .get(userCtrl.list)
    .post(userCtrl.create);

//get, update, or delete an user record
router.route('/users/:userId')
    .get(authCtrl.requireSignin, userCtrl.read) //need to signin 
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)//need to signin and has authorization
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove); //need to signin and has authorization

//get photo
router.route('/users/photo/:userId')
    .get(userCtrl.photo, userCtrl.defaultPhoto)
router.route('/users/get/defaultphoto')
    .get(userCtrl.defaultPhoto)

//follow users
router.route('/users/post/follow')
    .put(authCtrl.requireSignin,
        userCtrl.addFollowing,
        userCtrl.addFollower)

//unfollow users
router.route('/users/post/unfollow')
    .put(authCtrl.requireSignin,
        userCtrl.removeFollowing,
        userCtrl.removeFollower)

//find people to follow
router.route('/users/findpeople/:userId')
    .get(authCtrl.requireSignin, userCtrl.findPeople)

//get user with userId
router.param('userId', userCtrl.userByID);

module.exports = router;