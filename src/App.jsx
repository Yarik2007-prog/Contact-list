import { useEffect, useState } from "react";

import { nanoid } from "nanoid";

import api from "./api/contact-service.js";
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

  useEffect(() => {
    api.get("/").then(({ data }) => {
      if (!data) {
        setContacts([]);
      } else {
        setContacts(data);
      }
    });
  }, []);

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

    api.post(`/`, contact).then(({ data }) => {
      const createdContact = data;
      setContacts([...contacts, createdContact]);
      setEmptyContact(createEmptyContact());
    });
  }

  function updateContact(contact) {
    api.put(`/${contact.id}`, contact).then(({ data }) => {
      setContacts(
        contacts.map((elem) => {
          return elem.id !== contact.id ? elem : data;
        }),
      );
    });
  }

  const deleteContact = (id) => {
    api.delete(`/${id}`).then(() => {
      setContacts(
        contacts.filter((elem) => {
          elem.id !== id;
        }),
      );
    });
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
