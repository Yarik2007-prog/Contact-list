import { useDispatch } from "react-redux";

import api from "../../api/contact-service.js";
import {
  delContact,
  setCurrentContact,
} from "../../store/actions/contactActions";

import "./ContactListItem.css";

export function ContactListItem({ contact }) {

  const dispatch = useDispatch();

  const onContacteDelete = (event) => {
    event.stopPropagation();
    api
      .delete(`/${contact.id}`)
      .then(() => {
       dispatch(delContact(contact.id));
      })
      .catch((error) => console.log(error));
  };

  const onContactEdit = (event) => {
    event.stopPropagation();
    dispatch(setCurrentContact(contact));
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

export default ContactListItem;
