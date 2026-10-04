import ACTION_TYPES from "./actionsType";

//Creating
export const addContactAction = (contact) => {
  return {
    type: ACTION_TYPES.POST_CONTACT_ACTION,
    payload: contact,
  };
};
export const addContactRequest = () => {
  return {
    type: ACTION_TYPES.POST_CONTACT_REQUEST,
  };
};
export const addContactSuccess = (contact) => {
  return {
    type: ACTION_TYPES.POST_CONTACT_SUCCESS,
    payload: contact,
  };
};
export const addContactError = (error) => {
  return {
    type: ACTION_TYPES.POST_CONTACT_ERROR,
    payload: error,
  };
};


//Deleting
export const delContactAction = (id) => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT_ACTION,
    payload: id,
  };
};
export const delContactRequest = () => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT_REQUEST,
  };
};
export const delContactSuccess = (payload) => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT_SUCCESS,
    payload,
  };
};
export const delContactError = (error) => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT_ERROR,
    payload: error,
  };
};

//Updating

export const updateContactAction = (contact) => {
  return {
    type: ACTION_TYPES.PUT_CONTACT_ACTION,
    payload: contact,
  };
};
export const updateContactRequest = () => {
  return {
    type: ACTION_TYPES.PUT_CONTACT_REQUEST,
  };
};
export const updateContactSuccess = (contact) => {
  return {
    type: ACTION_TYPES.PUT_CONTACT_SUCCESS,
    payload: contact,
  };
};
export const updateContactError = (error) => {
  return {
    type: ACTION_TYPES.PUT_CONTACT_ERROR,
    payload: error,
  };
};

//Geting

export const getContactsAction = () => {
  return {
    type: ACTION_TYPES.GET_CONTACTS_ACTION,
  };
};

export const getContactsRequest = () => {
  return {
    type: ACTION_TYPES.GET_CONTACTS_REQUEST,
  };
};

export const getContactsSuccess = (contacts) => {
  return {
    type: ACTION_TYPES.GET_CONTACTS_SUCCESS,
    payload: contacts,
  };
};

export const getContactsError = (error) => {
  return {
    type: ACTION_TYPES.GET_CONTACTS_ERROR,
    payload: error,
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
