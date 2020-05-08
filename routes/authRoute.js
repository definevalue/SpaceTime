const express = require('express');
const authCtrl = require('../controllers/authCtrl');

const router = express.Router();

//signin user
router.route('/signin').post(authCtrl.signin);

//signout user
router.route('/signout').get(authCtrl.signout)

module.exports = router;