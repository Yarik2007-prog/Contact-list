import { useState } from "react";

import "./ContactForm.css";

export function ContactForm({ onSubmit, contactForEdit, onDelete }) {
  function createEmptyContact() {
    return {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  }

  const [contactEdit, setContactEdit] = useState(contactForEdit);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setContactEdit((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const onClearField = (event) => {
    const input = event.target.parentNode.firstChild;

    setContactEdit((prevContact) => ({
      ...prevContact,
      [input.name]: "",
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    onSubmit(contactEdit);

    if (!contactEdit.id) {
      setContactEdit(createEmptyContact());
    }
  };

  const onContactDelete = () => {
    onDelete(contactEdit.id);
    setContactEdit(createEmptyContact());
  };

  return (
    <form id="contact-form" onSubmit={onFormSubmit}>
      <div className="form-container">
        <div className="contact-info">
          <input
            type="text"
            className="text-field"
            placeholder="First Name"
            name="firstName"
            value={contactEdit.firstName}
            onChange={onInputChange}
          />

          <span className="clear" onClick={onClearField}>
            X
          </span>
        </div>

        <div className="contact-info">
          <input
            type="text"
            className="text-field"
            placeholder="Last Name"
            name="lastName"
            value={contactEdit.lastName}
            onChange={onInputChange}
          />

          <span className="clear" onClick={onClearField}>
            X
          </span>
        </div>

        <div className="contact-info">
          <input
            type="email"
            className="text-field"
            placeholder="Email"
            name="email"
            value={contactEdit.email}
            onChange={onInputChange}
          />

          <span className="clear" onClick={onClearField}>
            X
          </span>
        </div>

        <div className="contact-info">
          <input
            type="text"
            className="text-field"
            placeholder="Phone"
            name="phone"
            value={contactEdit.phone}
            onChange={onInputChange}
          />

          <span className="clear" onClick={onClearField}>
            X
          </span>
        </div>
      </div>

      <div className="btns">
        <button id="save" type="submit">
          Save
        </button>

        {contactEdit.id && (
          <button id="delete" type="button" onClick={onContactDelete}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;