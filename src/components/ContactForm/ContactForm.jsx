// import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import {
  addContact,
  createEmptyContact,
  delContact,
  updateContact,
} from "../../store/slices/contactSlice";

import "./ContactForm.css";

export function ContactForm() {
  const dispatch = useDispatch();

  const contactEdit = useSelector((state) => {
    return state.contactList.currentContact;
  });

  const schema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email"),
    phone: Yup.string().matches(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  });

  const renderForm = ({ isValid, setFieldValue }) => {
    return (
      <Form id="contact-form">
        <div className="form-container">
          <div className="contact-info">
            <Field
              type="text"
              className="text-field"
              placeholder="First Name"
              name="firstName"
            />

            <span
              className="clear"
              onClick={() => setFieldValue("firstName", "")}
            >
              X
            </span>

            <ErrorMessage name="firstName">
              {(msg) => <div className="error">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="contact-info">
            <Field
              type="text"
              className="text-field"
              placeholder="Last Name"
              name="lastName"
            />

            <span
              className="clear"
              onClick={() => setFieldValue("lastName", "")}
            >
              X
            </span>

            <ErrorMessage name="lastName">
              {(msg) => <div className="error">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="contact-info">
            <Field
              type="email"
              className="text-field"
              placeholder="Email"
              name="email"
            />

            <span className="clear" onClick={() => setFieldValue("email", "")}>
              X
            </span>

            <ErrorMessage name="email">
              {(msg) => <div className="error">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="contact-info">
            <Field
              type="text"
              className="text-field"
              placeholder="Phone"
              name="phone"
            />

            <span className="clear" onClick={() => setFieldValue("phone", "")}>
              X
            </span>

            <ErrorMessage name="phone">
              {(msg) => <div className="error">{msg}</div>}
            </ErrorMessage>
          </div>
        </div>

        <div className="btns">
          <button id="save" type="submit" disabled={!isValid}>
            Save
          </button>

          {contactEdit.id && (
            <button id="delete" type="button" onClick={onContactDelete}>
              Delete
            </button>
          )}
        </div>
      </Form>
    );
  };

  const onFormSubmit = (values) => {
    if (values.id) {
      dispatch(updateContact(values));
    } else {
      dispatch(addContact(values));
      dispatch(createEmptyContact());
    }
  };

  const onContactDelete = () => {
    dispatch(delContact(contactEdit.id));

    dispatch(createEmptyContact());
  };

  return (
    <Formik
      initialValues={contactEdit}
      onSubmit={onFormSubmit}
      validationSchema={schema}
      enableReinitialize
      validateOnMount
    >
      {renderForm}
    </Formik>
  );
}

export default ContactForm;
