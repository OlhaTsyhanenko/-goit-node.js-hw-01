const chalk = require('chalk');
const { Command } = require('commander');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');


const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const  invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
          const contacts = await listContacts();
          console.log(chalk.green('Contacts:'));
          console.table(contacts);
      break;

    case 'get':
          const contactById = await getContactById(id);
          if (contactById) {
              console.log(chalk.green(`Contact by id ${id}:`));
              console.table(contactById);
          } else {
              console.log(chalk.red(`Contact by id ${id} not found`));
          }
      break;

    case 'add':
      const contactAdd = await addContact(name, email, phone);
      console.log(chalk.green('Add new contact:'));
      console.table(contactAdd);
      break;

    case 'remove':
      const contact = await removeContact(id);
      console.table(contact);
      break;

    default:
      console.warn(chalk.red('Unknown action type!'));
  }
}

invokeAction(argv).then(() => console.log(chalk.white('Operation succes')));
