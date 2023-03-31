const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homepage', { style: 'homepage.css' });
});

router.get('/login', (req, res) => {
  /* if (req.session.logged_in) {
    res.redirect('/');
    return;
  } */

  res.render('login', { style: 'login.css' });
});

module.exports = router;
