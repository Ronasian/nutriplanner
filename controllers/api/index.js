const router = require('express').Router();
const userRoutes = require('./userRoutes');
const nutriplannerRoutes = require('./nutriplannerRoutes');

router.use('/users', userRoutes);
router.use('/nutriplanner', nutriplannerRoutes);

module.exports = router;