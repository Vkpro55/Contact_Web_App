const express = require('express');
const { MessageController } = require('../../controllers');
const { MessageMiddleware } = require('../../middlewares');

const router = express.Router();

/*== 
    POST: /api/v1/messages/send
    body: {"receiverName": "", "phoneNumber" : ""}
==*/
router.post('/send',
    MessageMiddleware.validatSendSMSRequst,
    MessageController.sendSMS);

router.get("",
    MessageMiddleware.validatGetRequest,
    MessageController.getMessagesForContact);


module.exports = router;