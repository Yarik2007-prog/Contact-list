import { Component } from "react";

import "./ContactListItem.css";

export class ContactListItem extends Component {
  onContacteDelete = (event) => {
    event.stopPropagation();
    this.props.onDelete(this.props.contact.id);
  };

  onContactEdit = (event) => {
    event.stopPropagation();
    this.props.onEditContact(this.props.contact);
  };

  render() {
    return (
      <div className="contact-item">
        <p className="content" onDoubleClick={this.onContactEdit}>
          {this.props.contact.firstName} {this.props.contact.lastName}
        </p>
        <span className="delete-btn" onClick={this.onContacteDelete}>
          X
        </span>
      </div>
    );
  }
}

export default ContactListItem;
