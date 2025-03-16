const { StatusCodes } = require('http-status-codes');
const { MessageService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function sendSMS(req, res) {
    try {
        const response = await MessageService.sendSMS(
            {
                receiverName: req.body.receiverName,
                phoneNumber: req.body.phoneNumber
            }
        );

        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function getMessagesForContact(req, res) {
    try {
        let { phoneNumber } = req.query;

        if (phoneNumber && !phoneNumber.startsWith("+91")) {
            phoneNumber = `+91${phoneNumber.trim()}`;
        }

        const response = await MessageService.getMessagesForContact(phoneNumber);
        console.log("Response rec - controller");

        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        console.log("Error rec - controller", error);

        ErrorResponse.error = error;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}


module.exports = {
    sendSMS,
    getMessagesForContact
}