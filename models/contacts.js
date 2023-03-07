const { v4: uuidv4 } = require("uuid");
// const fs = require("fs").promises;
const fs = require("fs/promises");
const path = require("path");

// const contactsPath = path.resolve("../../db/contacts.json");
// const contactsPath = path.resolve("./contacts.json");
const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  try {
    const parsedData = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    return parsedData;
  } catch (error) {
    console.log(`Smth went wrong: ${error}`);
  }
}

async function getContactById(contactId) {
  try {
    const parsedData = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const searchedContact = parsedData.filter((contact) => {
      if (contact.id === contactId) {
        return contact;
      }
    });
    return searchedContact;
  } catch (error) {
    console.log(`Smth went wrong: ${error}`);
  }
}

async function removeContact(contactId) {
  try {
    const parsedData = JSON.parse(await fs.readFile(contactsPath));
    const deletedContact = parsedData.filter((contact) => {
      if (contact.id === contactId) {
        parsedData.splice(parsedData.indexOf(contact), 1);
        console.log(`Contact ${contactId} DELETED`);
        return contact;
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(parsedData));
    return deletedContact;
  } catch (error) {
    console.log(`Smth went wrong: ${error}`);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: uuidv4(), name, email, phone };
    const parsedData = JSON.parse(await fs.readFile(contactsPath));
    parsedData.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(parsedData), "utf8");
    return newContact;
  } catch (error) {
    console.log(`Smth went wrong: ${error}`);
  }
}

async function updateContact(id, body) {
  try {
    const parsedData = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const { name, email, phone } = body;
    const [contactToUpdate] = parsedData.filter((contact) => {
      return contact.id === id;
    });

    contactToUpdate.name = name ? name : contactToUpdate.name;
    contactToUpdate.email = email ? email : contactToUpdate.email;
    contactToUpdate.phone = phone ? phone : contactToUpdate.phone;

    const indexToUpdate = parsedData.findIndex((contact) => {
      return contact.id === id;
    });

    parsedData.splice(indexToUpdate, 1, contactToUpdate);
    fs.writeFile(contactsPath, JSON.stringify(parsedData));

    return contactToUpdate;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
