import { Component } from "react";

import ContactIListItem from "../ContactIListItem/ContactListItem.jsx";

export class ContactList extends Component {
  render() {
    return (
      <div className="list-container">
        <div className="item-container">
          {this.props.contacts.map((contact) => {
            return (
              <ContactIListItem
                key={contact.id}
                contact={contact}
                onDelete={this.props.deleteContact}
                onEditContact={this.props.selectContact}
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
