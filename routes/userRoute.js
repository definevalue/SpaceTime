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

router.route('/users/photo/:userId')
    .get(userCtrl.photo, userCtrl.defaultPhoto)
router.route('/users/defaultphoto')
    .get(userCtrl.defaultPhoto)

router.route('/users/follow')
    .put(authCtrl.requireSignin,
        userCtrl.addFollowing,
        userCtrl.addFollower)

router.route('/users/unfollow')
    .put(authCtrl.requireSignin,
        userCtrl.removeFollowing,
        userCtrl.removeFollower)

router.route('/users/findpeople/:userId')
    .get(authCtrl.requireSignin, userCtrl.findPeople)


router.param('userId', userCtrl.userByID);

module.exports = router;