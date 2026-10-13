import BackspaceIcon from "@mui/icons-material/Backspace";
import Typography from "@mui/material/Typography";
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
      <Typography className="content" onDoubleClick={onContactEdit}>
        {contact.firstName} {contact.lastName}
      </Typography>
      <BackspaceIcon className="delete-btn" onClick={onContacteDelete}/>
    </div>
  );
}

export default ContactListItem;
