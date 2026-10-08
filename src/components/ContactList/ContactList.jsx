import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  createEmptyContact,
  delContact,
  getContacts,
  setCurrentContact,
} from "../../store/slices/contactSlice.js";
import ContactListItem from "../ContactListItem/ContactListItem.jsx";

import "./ContactList.css";

export function ContactList() {
  const contacts = useSelector((state) => state.contactList.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

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
      <button id="new" onClick={() => dispatch(createEmptyContact())}>
        New
      </button>
    </div>
  );
}

export default ContactList;
