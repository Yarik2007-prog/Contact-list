import { contactState } from "../../model/initialContacts.js";
import ACTION_TYPES from "../actions/actionsType.js";

const initialState = {
  contacts: contactState.contacts,
  currentContact: contactState.currentContact,
  isFetching: false,
  error: null,
};

export default function contactsReducer(
  state = initialState,
  { type, payload },
) {
  switch (type) {
    //SUCCESS
    case ACTION_TYPES.POST_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: [...state.contacts, payload],
        isFetching: false,
      };

    case ACTION_TYPES.DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.filter((elem) => elem.id !== payload),
        isFetching: false,
      };

    case ACTION_TYPES.PUT_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.map((elem) =>
          elem.id !== payload.id ? elem : payload,
        ),
        isFetching: false,
      };

    case ACTION_TYPES.GET_CONTACTS_SUCCESS:
      return { ...state, contacts: payload, isFetching: false };

    //REQUEST
    case ACTION_TYPES.POST_CONTACT_REQUEST:
    case ACTION_TYPES.DELETE_CONTACT_REQUEST:
    case ACTION_TYPES.PUT_CONTACT_REQUEST:
    case ACTION_TYPES.GET_CONTACTS_REQUEST:
      return { ...state, isFetching: true };

    //ERROR
    case ACTION_TYPES.POST_CONTACT_ERROR:
    case ACTION_TYPES.DELETE_CONTACT_ERROR:
    case ACTION_TYPES.PUT_CONTACT_ERROR:
    case ACTION_TYPES.GET_CONTACTS_ERROR:
      return { ...state, isFetching: false, error: payload };

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
