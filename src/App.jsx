import { useEffect, useState } from "react";

import axios from "axios";
import { nanoid } from "nanoid";

import ContactForm from "./components/ContactForm/ContactForm.jsx";
import ContactList from "./components/ContactList/ContactList.jsx";

import "./App.css";

function App() {
  function createEmptyContact() {
    return {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  }

  const [contacts, setContacts] = useState([]);
  const [emptyContact, setEmptyContact] = useState(createEmptyContact());

  const instance = axios.create({
    baseURL: 'http://localhost:5000/contacts',
  })

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    if (!contacts) {
      setContacts([]); // eslint-disable-line
    } else {
      setContacts(contacts);
    }
  }, []);

  const saveToStorage = (arrContacts) => {
    localStorage.setItem("contacts", JSON.stringify(arrContacts));
  };

  const saveContact = (contact) => {
    if (!contact.id) {
      createContact(contact);
    } else {
      updateContact(contact);
    }
  };

  const selectContact = (contact) => {
    setEmptyContact(contact);
  };

  function createContact(contact) {
    contact.id = nanoid();
    const newContacts = [...contacts, contact];
    saveToStorage(newContacts);
    setContacts(newContacts);
    setEmptyContact(createEmptyContact());
  }

  function updateContact(contact) {
    const newContacts = contacts.map((item) => {
      return item.id === contact.id ? contact : item;
    });
    saveToStorage(newContacts);
    setContacts(newContacts);
  }

  const deleteContact = (id) => {
    const contactList = [
      ...contacts.filter((contact) => {
        return contact.id !== id;
      }),
    ];
    setContacts(contactList);

    saveToStorage(contactList);
  };

  return (
    <>
      <div className="container">
        <h1 className="header-app">Contact List</h1>
        <div className="main">
          <ContactList
            contacts={contacts}
            onDelete={deleteContact}
            onAddNewContact={selectContact}
            onEditContact={selectContact}
          />
          <ContactForm
            key={emptyContact.id}
            contactForEdit={emptyContact}
            onSubmit={saveContact}
            onDelete={deleteContact}
          />
        </div>
      </div>
    </>
  );
}
export default App;
