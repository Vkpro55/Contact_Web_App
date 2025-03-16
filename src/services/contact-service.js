const { StatusCodes } = require('http-status-codes');

const { ContactRepository } = require('../repositories');
const AppError = require('../utils/errors/app-errors');

/**
 * Create new Object
 */
const contactRepo = new ContactRepository();

async function getAllContacts() {
    try {
        const response = await contactRepo.getAll();
        return response;
    } catch (error) {
        throw new AppError('Something went wrong while fetching contact resources', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getContactById(id) {
    try {
        const response = await contactRepo.get(id);
        return response;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError('Something went wrong while fetching contact resources', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getAllContacts,
    getContactById
}