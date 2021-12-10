const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const chalk = require('chalk');

const readContacts = async () => {
    const contacts = await fs.readFile(
        path.join(__dirname, 'db', 'contacts.json'),
        'utf8',
    )
    const result = JSON.parse(contacts);
    return result;
}

const listContacts = async() => {
    const contacts = await readContacts();
    return contacts;
}

const getContactById = async(contactId) => {
    const contacts = await readContacts();
    const contactById = contacts.find(contact => contact.id === contactId);
    return contactById;
}

const removeContact = async (contactId) => {
    const contacts = await readContacts();

    const newContacts = contacts.filter(contact => contact.id !== contactId);
    if (newContacts.length === contacts.length) {
        console.log(chalk.red(`Contact by id ${contactId} not found and NOT remove`));
    } else {
        console.log(chalk.green(`Contact by id ${contactId} remove:`));
        await fs.writeFile(path.join(__dirname, 'db', 'contacts.json'),
            JSON.stringify(newContacts, null, 2));
    }
    return newContacts;
    
}

const addContact = async(name, email, phone) => {
    const contacts = await readContacts();
    const newContact = { name, email, phone, id: crypto.randomUUID() };
    contacts.push(newContact);
    await fs.writeFile(path.join(__dirname, 'db', 'contacts.json'),
        JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}