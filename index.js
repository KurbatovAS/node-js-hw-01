const { Command } = require("commander");

const contacts = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "Action type")
  .option("-i, --id <type>", "Contact id")
  .option("-n, --name <type>", "Contact name")
  .option("-e, --email <type>", "Contact email")
  .option("-p, --phone <type>", "Contact phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const listContacts = await contacts.listContacts();
        console.log("listContacts", listContacts);
        break;

      case "get":
        if (!id) {
          throw new Error("\x1B[31m No such parameters");
        }
        const getContact = await contacts.getContactById(id);

        if (!getContact) {
          throw new Error(`\x1B[31m No such contact with id = ${id}`);
        }
        console.log("getContact", getContact);
        break;

      case "add":
        if (!name || !email || !phone) {
          throw new Error("\x1B[31m No such parameters");
        }
        const addContact = await contacts.addContact(name, email, phone);
        console.log("addContact", addContact);
        break;

      case "remove":
        if (!id) {
          throw new Error("\x1B[31m No such parameters");
        }
        const removeContact = await contacts.removeContact(id);
        if (!removeContact) {
          throw new Error(`\x1B[31m No such contact with id = ${id}`);
        }
        console.log("removeContact", removeContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (err) {
    console.error(err);
  }
}

invokeAction(argv);
