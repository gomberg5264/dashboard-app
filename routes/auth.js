const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');

// test if the user is already is logged in or not before registering
router.get('/register', authHelpers.loginRedirect, (req, res)=> {
  res.render('auth/register');
});

// user be able to register for a new account
router.post('/register', (req, res, next)  => {
  return authHelpers.createUser(req, res)
  .then((response) => {
    console.log('registration successful');
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });
});

// test if the user is already is logged in or not before login
router.get('/login', authHelpers.loginRedirect, (req, res)=> {
  res.render('auth/login');
});

// user be able to login to his account
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);

// user be able to logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
