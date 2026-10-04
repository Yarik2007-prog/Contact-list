import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  createEmptyContact,
  delContactAction,
  getContactsAction,
  setCurrentContact,
} from "../../store/actions/contactActions.js";
import ContactListItem from "../ContactListItem/ContactListItem.jsx";

import "./ContactList.css";

export function ContactList() {

  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactsAction());
  }, [dispatch]);

  return (
    <div className="list-container">
      <div className="item-container">
        {contacts.map((contact) => {
          return (
            <ContactListItem
              key={contact.id}
              contact={contact}
              delContact={delContactAction}
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
