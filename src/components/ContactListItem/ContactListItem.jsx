import { connect } from "react-redux";

import api from "../../api/contact-service.js";
import {
  delContact,
  setCurrentContact,
  updateContact,
} from "../../store/actions/contactActions";

import "./ContactListItem.css";

export function ContactListItem({ contact, delContact, setCurrentContact }) {
  const onContacteDelete = (event) => {
    event.stopPropagation();
    api
      .delete(`/${contact.id}`)
      .then(() => {
        delContact(contact.id);
      })
      .catch((error) => console.log(error));
  };

  const onContactEdit = (event) => {
    event.stopPropagation();
    setCurrentContact(contact);
  };

  return (
    <div className="contact-item">
      <p className="content" onDoubleClick={onContactEdit}>
        {contact.firstName} {contact.lastName}
      </p>
      <span className="delete-btn" onClick={onContacteDelete}>
        X
      </span>
    </div>
  );
}

const mapDispatchToProps = { delContact, setCurrentContact };

export default connect(null, mapDispatchToProps)(ContactListItem); //eslint-disable-line
