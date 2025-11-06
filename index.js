import { program } from "commander";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      let contacts = await listContacts();
      console.log("Contacts list:");
      console.log(contacts);
      break;

    case "get":
      let contact = await getContactById(id);
      console.log("Contact:");
      console.log(contact);
      break;

    case "add":
      let createdContact = await addContact(name, email, phone);
      console.log("Contact created:");
      console.log(createdContact);
      break;

    case "remove":
      let deletedContact = await removeContact(id);
      console.log("Deleted contact:");
      console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
