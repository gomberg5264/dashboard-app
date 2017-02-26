var express = require('express');
var router = express.Router();
var authHelpers = require('../auth/auth-helpers');

// once the user logins succesfully, render user profile page
router.get('/', authHelpers.loginRequired, (req, res, next) => {
  res.render('user/index', {
    user: req.user.dataValues
  });
});

module.exports = router;
