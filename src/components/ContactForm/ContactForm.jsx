// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../../api/contact-service.js";
import {
  addContact,
  createEmptyContact,
  delContact,
  setCurrentContact,
  updateContact,
} from "../../store/actions/contactActions.js";

import "./ContactForm.css";

export function ContactForm() {
  /*   function createEmptyContact() {
    return {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  } */

  // const [contactEdit, setContactEdit] = useState(contactForEdit);

  // useEffect(() => {
  //   setContactEdit(contactForEdit)//eslint-disable-line
  // }, [contactForEdit])

  const dispatch = useDispatch();

  const contactEdit = useSelector((state) => {
    return state.currentContact;
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;

    dispatch(
      setCurrentContact({
        ...contactEdit,
        [name]: value,
      }),
    );
  };

  const onClearField = (event) => {
    const input = event.target.parentNode.firstChild;

    dispatch(
      setCurrentContact({
        ...contactEdit,
        [input.name]: "",
      }),
    );
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (contactEdit.id) {
      api
        .put(`/${contactEdit.id}`, contactEdit)
        .then(({ data }) => {
          dispatch(updateContact(data));
        })
        .catch((error) => console.log(error));
    } else {
      api
        .post("/", contactEdit)
        .then(({ data }) => {
          dispatch(addContact(data));
          dispatch(createEmptyContact());
        })
        .catch((error) => console.log(error));
    }
  };

  const onContactDelete = () => {
    api.delete(`/${contactEdit.id}`, contactEdit).then(({ data }) => {
      dispatch(delContact(data.id));
    });
    dispatch(createEmptyContact());
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
