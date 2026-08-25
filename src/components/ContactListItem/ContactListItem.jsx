import "./ContactListItem.css";

export function ContactListItem({ contact, onDelete, onEditContact }) {
  const onContacteDelete = (event) => {
    event.stopPropagation();
    onDelete(contact.id);
  };

  const onContactEdit = (event) => {
    event.stopPropagation();
    onEditContact(contact);
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
