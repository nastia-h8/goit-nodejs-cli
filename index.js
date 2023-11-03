import { program } from "commander";
import * as contactService from "./contacts.js";

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactService.listContacts();
      return console.table(allContacts);
    case "get":
      const oneContact = await contactService.getContactById(id);
      return console.table(oneContact);
    case "add":
      const newContact = await contactService.addContact(name, email, phone);
      return console.table(newContact);
    case "remove":
      const removedContact = await contactService.removeContact(id);
      return console.table(removedContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const argv = program.opts();

invokeAction(argv);
