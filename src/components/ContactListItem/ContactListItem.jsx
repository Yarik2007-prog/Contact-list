import { useDispatch } from "react-redux";

import { delContact, setCurrentContact } from "../../store/slices/contactSlice";

import "./ContactListItem.css";

export function ContactListItem({ contact }) {
  const dispatch = useDispatch();

  const onContacteDelete = (event) => {
    event.stopPropagation();

    dispatch(delContact(contact.id));
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
