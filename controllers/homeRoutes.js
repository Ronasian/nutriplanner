const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homepage', { 
      style: 'homepage.css',
      title: 'Fitness-App-Unnamed'
    });
});

router.get('/login', (req, res) => {
  /* if (req.session.logged_in) {
    res.redirect('/');
    return;
  } */

  res.render('login', { 
    style: 'login.css',
    title: 'Fitness App Login'
  });
});

router.get('/signup', (req, res) => {
  res.render('signup', { 
    style: 'signup.css',
    title: 'Fitness App Sign-in'
  });
})

module.exports = router;
