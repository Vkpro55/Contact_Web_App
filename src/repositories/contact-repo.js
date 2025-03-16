const CrudRepository = require("./crud-repo");
const { Contact } = require('../models');

class ContactRepository extends CrudRepository {
    constructor() {
        super(Contact);
    }

    async getByNumber(phoneNumber) {
        const smslist = await Contact.findOne({
            where: {
                phoneNumber
            }
        })

        return smslist;
    };
}

module.exports = ContactRepository;