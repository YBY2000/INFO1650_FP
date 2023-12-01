const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const attractionRoutes = require('./attraction');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/attraction', attractionRoutes);

module.exports = router;