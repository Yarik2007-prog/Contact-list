import { contactState } from "../../model/initialContacts.js";
import ACTION_TYPES from "../actions/actionsType.js";

const initialState = {
  contacts: contactState.contacts,
  currentContact: contactState.currentContact,
};

export default function contactsReducer(
  state = initialState,
  { type, payload },
) {
  switch (type) {
    case ACTION_TYPES.ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, payload] };

    case ACTION_TYPES.DEL_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((elem) => elem.id !== payload),
      };

    case ACTION_TYPES.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((elem) =>
          elem.id !== payload.id ? elem : payload,
        ),
      };

    case ACTION_TYPES.GET_CONTACTS:
      return { ...state, contacts: payload };

    case ACTION_TYPES.SET_CURRENT_CONTACT:
      return { ...state, currentContact: payload };

    case ACTION_TYPES.CREATE_EMPTY_CONTACT:
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
