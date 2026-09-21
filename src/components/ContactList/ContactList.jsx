import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import api from "../../api/contact-service.js";
import {
  createEmptyContact,
  delContact,
  getContacts,
  setCurrentContact,
} from "../../store/actions/contactActions.js";
import ContactListItem from "../ContactListItem/ContactListItem.jsx";

import "./ContactList.css";

export function ContactList() {

  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get("/").then(({ data }) => {
      dispatch(getContacts(data));
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


export default ContactList; 
