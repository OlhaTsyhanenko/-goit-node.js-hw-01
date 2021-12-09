const fs = require('fs');
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
    fs.readFile(contactsPath, 'utf8', (error, data) => {
        if (error) {
           return console.error(error);
        }

        const contacts = JSON.parse(data);
        console.log('List contacts:');
        console.table(contacts);
  })
}

function getContactById(contactId) {
    fs.readFile(contactsPath, 'utf8', (error, data) => {
        if (error) {
            return console.error(error);
        }

        const contacts = JSON.parse(data);

        const contact = contacts.find(contact => {
            if (contact.id === contactId) {
                console.log(`Get contact by id ${contactId}:`);
                console.table(contact);
                return contact;
            }
        });
      
        if (contact == null) {
            console.log(`contact ${contactId} not found`)
        }
    });
}

// function removeContact(contactId) {
//   // ...твой код
// }

// function addContact(name, email, phone) {
//   // ...твой код
// }

module.exports = {
    listContacts,
    getContactById,
}