const { StatusCodes } = require('http-status-codes');
const twilio = require('twilio');

const { MessageRepository, ContactRepository } = require('../repositories');
const AppError = require('../utils/errors/app-errors');
const { TwilloConfig } = require('../config');
const generateOTP = require('../utils/helpers/otp-generator');
const { message } = require('../utils/common/success-response');

/**
 * Create new Object
 */
const messageRepo = new MessageRepository();
const contactRepo = new ContactRepository();

const accountSid = TwilloConfig.TWILIO_SID;
const authToken = TwilloConfig.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = TwilloConfig.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

async function sendSMS({ receiverName, phoneNumber }) {
    try {
        const otp = generateOTP(); /*== Generate brand new 6 digit otp */
        const messageText = `Hello ${receiverName}, your OTP is: ${otp}`;

        const contact = await contactRepo.getByNumber(phoneNumber);

        if (!contact) {
            const [fName, lName] = receiverName.split(' ');
            contact = await contactRepo.create({
                firstName: fName,
                lastName: lName,
                phoneNumber
            });
        }

        await client.messages.create({
            body: messageText,
            from: twilioPhoneNumber,
            to: phoneNumber,
        });

        const savedmsg = await messageRepo.saveMessage({
            receiverName,
            phoneNumber,
            otp,
            message: messageText,
        });

        return { message: 'OTP sent successfully', data: savedmsg };
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot send SMS', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getMessagesForContact(phoneNumber) {
    try {
        const contact = await contactRepo.getByNumber(phoneNumber);
        if (!contact) {
            throw new AppError('Requsted phoneNumber does not have any OTP', StatusCodes.BAD_REQUEST);
        }

        const messages = await messageRepo.getMessagesByContact(contact.dataValues.phoneNumber);
        return messages;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError('Cannot fund resources to get all SMS', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    sendSMS,
    getMessagesForContact
}