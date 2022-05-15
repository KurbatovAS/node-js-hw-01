const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  const id = String(contactId);
  try {
    const data = await listContacts();
    return data.filter((contact) => contact.id === id);
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  const id = String(contactId);
  try {
    const sourceContacts = await listContacts();
    const newContacts = sourceContacts.filter((contact) => contact.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    return sourceContacts.filter((contact) => contact.id === id);
  } catch (err) {
    console.erroe(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = await getNewId();

    const newContact = {
      id,
      name,
      email,
      phone,
    };

    const sourceContacts = await listContacts();
    const newContacts = [...sourceContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    return newContact;
  } catch (err) {
    console.error(err);
  }
}

async function getNewId() {
  try {
    const data = await listContacts();
    const id = data.reduce((prev, contact) => {
      if (Number(contact.id) > prev) {
        return Number(contact.id);
      }
    }, 0);
    return String(id + 1);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
