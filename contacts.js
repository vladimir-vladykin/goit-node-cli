import { promises as fs } from "fs";
import { join } from "path";
import { nanoid } from "nanoid";
// const contactsPath = "./db/contacts.json";
const contactsPath = join("db", "contacts.json");

async function listContacts() {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  return contacts;
}

async function getContactById(contactId) {
  const allContacts = JSON.parse(await fs.readFile(contactsPath));
  const contact = allContacts.find((element) => element.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const allContacts = JSON.parse(await fs.readFile(contactsPath));

  let removedContact = null;
  const updatedContacts = allContacts.filter((element) => {
    const isContactToDelete = element.id === contactId;
    if (isContactToDelete) removedContact = element;
    return !isContactToDelete;
  });

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return removedContact;
}

async function addContact(name, email, phone) {
  const contact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  const allContacts = JSON.parse(await fs.readFile(contactsPath));
  const updatedContacts = [...allContacts, contact];

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return contact;
}

export { listContacts, getContactById, removeContact, addContact };
