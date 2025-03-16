const express = require('express');
const { ContactController } = require('../../controllers');

const router = express.Router();

/*== GET: /api/v1/contacts ==*/
router.get('', ContactController.getAllContacts)

/*== GET: /api/v1/contact/:id ==*/
router.get('/:id', ContactController.getContactById);

module.exports = router;