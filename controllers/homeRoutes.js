const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homepage', { 
      style: 'homepage.css',
      script: 'homepage.js',
      title: 'Fitness-App-Unnamed',
      logged_in: req.session.logged_in
    });
});

router.get('/login', (req, res) => {
  /* if (req.session.logged_in) {
    res.redirect('/');
    return;
  } */

  res.render('login', { 
    style: 'login.css',
    script: 'login.js',
    title: 'Fitness App Login',
    logged_in: req.session.logged_in
  });
});

router.get('/signup', (req, res) => {
  res.render('signup', { 
    style: 'signup.css',
    script: 'login.js',
    title: 'Fitness App Sign-in'
  });
})

module.exports = router;
