import { useEffect, useState } from "react";

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
    api
      .get("/")
      .then(({ data }) => {
        if (!data) {
          setContacts([]);
        } else {
          setContacts(data);
        }
      })
      .catch((error) => console.log(error));
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

  const addNewContact = () => {
  setEmptyContact(createEmptyContact());
};

  function createContact(contact) {
    api
      .post(`/`, contact)
      .then(({ data }) => {
        setContacts([...contacts, data]);
        setEmptyContact(createEmptyContact());
      })
      .catch((error) => console.log(error));
  }

  function updateContact(contact) {
    api
      .put(`/${contact.id}`, contact)
      .then(({ data }) => {
        setContacts(
          contacts.map((elem) => {
            return elem.id !== data.id ? elem : data;
          }),
        );
      })
      .catch((error) => console.log(error));
  }

  const deleteContact = (id) => {
    api
      .delete(`/${id}`)
      .then(() => {
        const newArrContacts = contacts.filter((elem) => elem.id !== id);
        setContacts(newArrContacts);
      })
      .catch((error) => {
        console.log(error);
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
            onAddNewContact={addNewContact}
            onEditContact={selectContact}
          />
          <ContactForm
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
