const express = require('express');
const contactRoutes = require('./contacts-routes');

const router = express.Router();

router.use('/contacts', contactRoutes);

module.exports = router;