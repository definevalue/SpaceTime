const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const authCtrl = require('../controllers/authCtrl');
const postCtrl = require('../controllers/postCtrl');

const router = express.Router()

//create a new post
router.route('/posts/new/:userId')
    .post(authCtrl.requireSignin, postCtrl.create)

//get photo of a post
router.route('/posts/photo/:postId')
    .get(postCtrl.photo)

//get all posts of an user, needs to signin first
router.route('/posts/by/:userId')
    .get(authCtrl.requireSignin, postCtrl.listByUser)

//get newsfeed
router.route('/posts/feed/:userId')
    .get(authCtrl.requireSignin, postCtrl.listNewsFeed)

//like of dislike a post
router.route('/posts/like')
    .put(authCtrl.requireSignin, postCtrl.like)
router.route('/posts/unlike')
    .put(authCtrl.requireSignin, postCtrl.unlike)

//comment on a post
router.route('/posts/comment')
    .put(authCtrl.requireSignin, postCtrl.comment)
router.route('/posts/uncomment')
    .put(authCtrl.requireSignin, postCtrl.uncomment)

//delete a post, must signin and has authorization
router.route('/api/posts/:postId')
    .delete(authCtrl.requireSignin, postCtrl.isPoster, postCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.postByID)

export default router;