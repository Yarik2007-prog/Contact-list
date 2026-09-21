import { contactState } from "../../model/initialContacts.js";

const initialState = {
  contacts: contactState.contacts,
  currentContact: contactState.currentContact,
};

export default function contactsReducer(
  state = initialState,
  { type, payload },
) {
  switch (type) {
    case "addContact":
      return { ...state, contacts: [...state.contacts, payload] };

    case "delContact":
      return {
        ...state,
        contacts: state.contacts.filter((elem) => elem.id !== payload),
      };

    case "updateContact":
      return {
        ...state,
        contacts: state.contacts.map((elem) =>
          elem.id !== payload.id ? elem : payload,
        ),
      };

    case "getContacts":
      return { ...state, contacts: payload };

    case "setCurrentContact":
      return { ...state, currentContact: payload };

    case "createEmptyContact":
      return {
        ...state,
        currentContact: {
          id: null,
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        },
      };

    default:
      return state;
  }
}
