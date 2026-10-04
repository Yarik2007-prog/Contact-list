import { useDispatch } from "react-redux";

import {
  delContactAction,
  setCurrentContact,
} from "../../store/actions/contactActions";

import "./ContactListItem.css";

export function ContactListItem({ contact }) {
  const dispatch = useDispatch();

  const onContacteDelete = (event) => {
    event.stopPropagation();

    dispatch(delContactAction(contact.id));
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
