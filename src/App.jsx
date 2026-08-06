import { Component } from "react";

import { nanoid } from "nanoid";

import ContactForm from "./components/ContactForm/ContactForm.jsx";
import ContactList from "./components/ContactList/ContactList.jsx";

import "./App.css";

class App extends Component {
  state = {
    contacts: [],
    contactForEdit: this.createEmptyContact(),
  };

  createEmptyContact() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    if (!contacts) {
      this.setState({
        contacts: [],
      });
    } else {
      this.setState({
        contacts: [...contacts],
      });
    }
  }

  saveToStorage = (arrContacts) => {
    localStorage.setItem("contacts", JSON.stringify(arrContacts));
  };

  saveContact = (contact) => {
    if (!contact.id) {
      this.createContact(contact);
    } else {
      this.updateContact(contact);
    }
  };

  addNewContact = (contact) => {
    this.setState({
      contactForEdit: this.createEmptyContact(contact),
    });
  };

  selectContact = (contact) => {
    this.setState({
      contactForEdit: contact,
    });
  };

  createContact(contact) {
    contact.id = nanoid();
    const contacts = [...this.state.contacts, contact];
    this.saveToStorage(contacts);
    this.setState({
      contacts: [...contacts],
      contactForEdit: this.createEmptyContact(),
    });
  }

  updateContact(contact) {
    this.setState((state) => {
      const contacts = state.contacts.map((item) => {
       return item.id === contact.id ? contact : item;
      });
      this.saveToStorage(contacts);
      return {
        contacts,
        contactForEdit: contact,
      };
    });
  }

  deleteContact = (id) => {
    const contactList = [
      ...this.state.contacts.filter((contact) => {
        return contact.id !== id;
      }),
    ];
    this.setState({
      contacts: contactList,
    });

    this.saveToStorage(contactList);
  };

  render() {
    return (
      <>
        <div className="container">
          <h1 className="header-app">Contact List</h1>
          <div className="main">
            <ContactList
              contacts={this.state.contacts}
              onDelete={this.deleteContact}
              onAddNewContact={this.addNewContact}
              onEditContact={this.selectContact}
            />
            <ContactForm
              key={this.state.contactForEdit.id}
              contactForEdit={this.state.contactForEdit}
              onSubmit={this.saveContact}
              onDelete={this.deleteContact}
            />
          </div>
        </div>
      </>
    );
  }
}
export default App;
