const router = require('express').Router();

const loginRoutes = require('./loginRoutes');

router.use('/users', loginRoutes);

module.exports = router;