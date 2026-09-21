export const addContact = (contact) => {
  return {
    type: "addContact",
    payload: contact,
  };
};

export const delContact = (id) => {
  return {
    type: "delContact",
    payload: id,
  };
};

export const updateContact = (contact) => {
  return {
    type: "updateContact",
    payload: contact,
  };
};

export const getContacts = (contacts) => {
  return {
    type: "getContacts",
    payload: contacts,
  };
};

export const setCurrentContact = (contact) => {
  return {
    type: "setCurrentContact",
    payload: contact,
  };
};

export const createEmptyContact = () => {
  return {
    type: "createEmptyContact",
  };
};
