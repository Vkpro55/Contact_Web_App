const express = require('express');
const contactRoutes = require('./contacts-routes');
const messageRoutes = require('./message-routes');

const router = express.Router();

router.use('/contacts', contactRoutes);
router.use('/messages', messageRoutes);

module.exports = router;