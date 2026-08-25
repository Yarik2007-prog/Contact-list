
import ContactListItem from "../ContactListItem/ContactListItem.jsx";

import "./ContactList.css"

export function ContactList ({contacts, onDelete, onEditContact, onAddNewContact}) {
    return (
      <div className="list-container">
        <div className="item-container">
          {contacts.map((contact) => {
            return (
              <ContactListItem
                key={contact.id}
                contact={contact}
                onDelete={onDelete}
                onEditContact={onEditContact}
              />
            );
          })}
        </div>
        <button id="new" onClick={onAddNewContact}>New</button>
      </div>
    );
  }

export default ContactList;
