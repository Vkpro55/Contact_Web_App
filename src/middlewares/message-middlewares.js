const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-errors");
const { ErrorResponse } = require("../utils/common");


async function validatSendSMSRequst(req, res, next) {
    if (!req.body.receiverName || !req.body.phoneNumber) {
        ErrorResponse.message = "Something went wrong while sending a SMS.";
        ErrorResponse.error = new AppError('Missing fields: receiverName or phoneNumber', StatusCodes.BAD_REQUEST);

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}

async function validatGetRequest(req, res, next) {
    if (!req.query.phoneNumber) {
        ErrorResponse.message = "Something went wrong while sending a SMS.";
        ErrorResponse.error = new AppError('Missing fields: phoneNumber', StatusCodes.BAD_REQUEST);

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}

module.exports = {
    validatSendSMSRequst,
    validatGetRequest
}