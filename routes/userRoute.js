const express = require('express');
const userCtrl = require('../controllers/userCtrl');

const router = express.Router()

//get or create a new user
router.route('/users')
    .get(userCtrl.list)
    .post(userCtrl.create);

//get, update, or delete an user record
router.route('/users/:userId')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove);

router.param('userId', userCtrl.userByID);

module.exports = router;