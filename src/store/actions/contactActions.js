import ACTION_TYPES from "./actionsType";

export const addContact = (contact) => {
  return {
    type: ACTION_TYPES.ADD_CONTACT,
    payload: contact,
  };
};

export const delContact = (id) => {
  return {
    type: ACTION_TYPES.DEL_CONTACT,
    payload: id,
  };
};

export const updateContact = (contact) => {
  return {
    type: ACTION_TYPES.UPDATE_CONTACT,
    payload: contact,
  };
};

export const getContacts = (contacts) => {
  return {
    type: ACTION_TYPES.GET_CONTACTS,
    payload: contacts,
  };
};

export const setCurrentContact = (contact) => {
  return {
    type: ACTION_TYPES.SET_CURRENT_CONTACT,
    payload: contact,
  };
};

export const createEmptyContact = () => {
  return {
    type: ACTION_TYPES.CREATE_EMPTY_CONTACT,
  };
};
