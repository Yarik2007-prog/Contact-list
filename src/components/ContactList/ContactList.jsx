import { useEffect } from "react";

import { connect } from "react-redux";

import api from "../../api/contact-service.js";
import { createEmptyContact, delContact, getContacts, setCurrentContact} from "../../store/actions/contactActions.js";
import ContactListItem from "../ContactListItem/ContactListItem.jsx";

import "./ContactList.css";

export function ContactList({ contacts, getContacts, delContact, createEmptyContact, setCurrentContact }) {

  useEffect(() => {
    api.get("/").then(({ data }) => {
      getContacts(data);
    });
  }, []);


  return (
    <div className="list-container">
      <div className="item-container">
        {contacts.map((contact) => {
          return (
            <ContactListItem
              key={contact.id}
              contact={contact}
              delContact={delContact}
              updateContact={setCurrentContact}
            />
          );
        })}
      </div>
      <button id="new" onClick={createEmptyContact}>
        New
      </button>
    </div>
  );
}

const mapStateToProps = ({ contacts }) => ({ contacts });

const mapDispatchToProps = { createEmptyContact, delContact, getContacts, setCurrentContact };

export default connect(mapStateToProps, mapDispatchToProps)(ContactList); //eslint-disable-line
