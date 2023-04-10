const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homePage', { 
      style: 'homepage.css',
      script: 'homepage.js',
      title: 'NutriPlanner',
      logged_in: req.session.logged_in
    });
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', { 
    style: 'login.css',
    script: 'login.js',
    title: 'NutriPlanner Login',
    logged_in: req.session.logged_in
  });
});

router.get('/signup', (req, res) => {
  res.render('signup', { 
    style: 'signup.css',
    script: 'signup.js',
    title: 'NutriPlanner Sign Up'
  });
});

router.get('/calorie-tracker', withAuth, (req, res) => {
  res.render('tracker', {
    style: 'tracker.css',
    script: 'tracker.js',
    title: 'Fitness Tracker Page',
    logged_in: req.session.logged_in
  })
});

router.get('/nutrition-analysis', withAuth, (req, res) => {
  res.render('analysis', {
    style: 'analysis.css',
    script: 'analysis.js',
    title: 'Nutrition Analysis',
    logged_in: req.session.logged_in
  })
});

router.get('/recipes', withAuth, (req, res) => {
  res.render('recipe', {
    style: 'recipe.css',
    script: 'recipe.js',
    title: 'Nutrition Recipes',
    logged_in: req.session.logged_in
  })
});

module.exports = router;
