import { Component } from "react";

import ContactListItem from "../ContactListItem/ContactListItem.jsx";

import "./ContactList.css"

export class ContactList extends Component {
  render() {
    return (
      <div className="list-container">
        <div className="item-container">
          {this.props.contacts.map((contact) => {
            return (
              <ContactListItem
                key={contact.id}
                contact={contact}
                onDelete={this.props.onDelete}
                onEditContact={this.props.onEditContact}
              />
            );
          })}
        </div>
        <button id="new" onClick={this.props.onAddNewContact}>New</button>
      </div>
    );
  }
}

export default ContactList;
