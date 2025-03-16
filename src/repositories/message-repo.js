const CrudRepository = require("./crud-repo");
const { Message } = require('../models');

class MessageRepository extends CrudRepository {
    constructor() {
        super(Message);
    }

    async saveMessage({ receiverName, phoneNumber, otp, message }) {
        const response = await Message.create({ receiverName, phoneNumber, otp, message });
        return response;
    };

    async getMessagesByContact(phoneNumber) {
        const response = await Message.findAll({ where: { phoneNumber }, order: [["sentAt", "DESC"]] });
        return response;
    };
}

module.exports = MessageRepository;