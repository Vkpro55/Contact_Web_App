const { StatusCodes } = require('http-status-codes');

const { ContactService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function getAllContacts(req, res) {
    try {
        const contacts = await ContactService.getAllContacts();

        SuccessResponse.data = contacts;
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

async function getContactById(req, res) {
    try {
        const contact = await ContactService.getContactById(req.params.id);

        SuccessResponse.data = contact;
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

module.exports = {
    getAllContacts,
    getContactById
}