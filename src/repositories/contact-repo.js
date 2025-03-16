const CrudRepository = require("./crud-repo");
const { Contact } = require('../models');

class ContactRepository extends CrudRepository {
    constructor() {
        super(Contact);
    }
}

module.exports = ContactRepository;