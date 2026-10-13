import BackspaceIcon from "@mui/icons-material/Backspace";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {  Field, Form, Formik } from "formik";
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

  const renderForm = ({ isValid, setFieldValue, errors, touched }) => {
    return (
      <Form id="contact-form">
        <div className="form-container">
          <div className="contact-info">
            <Field
              as={TextField}
              type="text"
              className="text-field"
              placeholder="First Name"
              name="firstName"
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <BackspaceIcon
              className="clear"
              onClick={() => setFieldValue("firstName", "")}
            />
          </div>

          <div className="contact-info">
            <Field
              as={TextField}
              type="text"
              className="text-field"
              placeholder="Last Name"
              name="lastName"
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />

            <BackspaceIcon
              className="clear"
              onClick={() => setFieldValue("lastName", "")}
            />
          </div>

          <div className="contact-info">
            <Field
              as={TextField}
              type="email"
              className="text-field"
              placeholder="Email"
              name="email"
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <BackspaceIcon
              className="clear"
              onClick={() => setFieldValue("email", "")}
            />
          </div>

          <div className="contact-info">
            <Field
              as={TextField}
              type="text"
              className="text-field"
              placeholder="Phone"
              name="phone"
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />

            <BackspaceIcon
              className="clear"
              onClick={() => setFieldValue("phone", "")}
            />
          </div>
        </div>

        <div className="btns">
          <Button id="save" type="submit" disabled={!isValid}>
            Save
          </Button>

          {contactEdit.id && (
            <Button id="delete" type="button" onClick={onContactDelete}>
              Delete
            </Button>
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
