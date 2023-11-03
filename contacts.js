import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

function rewriteContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export async function listContacts() {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const oneContact = contacts.find((contact) => contact.id === contactId);
  return oneContact || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();

  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(idx, 1);
  await rewriteContacts(contacts);

  return removedContact;
}

export async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const contacts = await listContacts();
  contacts.push(newContact);

  await rewriteContacts(contacts);

  return newContact;
}
