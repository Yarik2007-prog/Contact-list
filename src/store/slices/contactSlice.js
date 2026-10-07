import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../api/contact-service.js";
import { CONTACT_SLICE_NAME } from "../../const/constants.js";
import { contactState } from "../../model/initialContacts.js";

const initialState = {
  contacts: contactState.contacts,
  currentContact: contactState.currentContact,
  isFetching: false,
  error: null,
};

export const getContacts = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/getContacts`,
  async function (_, { rejectWithValue }) {
    try {
      const response = await api.get(`/${CONTACT_SLICE_NAME}`);
      if (response.status >= 400) {
        throw new Error(`Error status is ${response.status}`);
      }
      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const delContact = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/delContact`,
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await api.delete(`${CONTACT_SLICE_NAME}/${id}`);
      if (response.status >= 400) {
        throw new Error(
          `Can't delete contact. Error status is ${response.status}`,
        );
      }
      dispatch(removeContact({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addContact = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/addContact`,
  async function (contact, { rejectWithValue, dispatch }) {
    try {
      const response = await api.post(`${CONTACT_SLICE_NAME}`, contact);
      if (response.status >= 400) {
        throw new Error(
          `Can't add contact. Error status is ${response.status}`,
        );
      }
      const { data } = response;
      dispatch(createContact(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateContact = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/updateContact`,
  async function (id, { rejectWithValue, dispatch, getState }) {
    const contact = getState().contactList.contacts.find(
      (elem) => elem.id === id,
    );
    try {
      const response = await api.put(`${CONTACT_SLICE_NAME}/${id}`, contact);
      if (response.status >= 400) {
        throw new Error(
          `Can't change contact. Error status is ${response.status}`,
        );
      }
      const { data } = response;
      console.log(data);
      dispatch(changeContact(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state, action) => {
  state.isFetching = false;
  state.error = action.payload;
};
const setFetching = (state) => {
  state.isFetching = true;
};

const contactSlice = createSlice({
  name: CONTACT_SLICE_NAME,
  initialState,
  reducers: {
    createContact(state, { payload }) {
      state.contacts.push(payload);
    },
    removeContact(state, { payload }) {
      state.contacts = [
        ...state.contacts.filter((elem) => elem.id !== payload),
      ];
    },
    changeContact(state, { payload }) {
      state.contacts = state.contacts.map((elem) => {
        return elem.id !== payload.id ? elem : payload;
      });
    },
    setCurrentContact(state, { payload }) {
      state.currentContact = payload;
    },

    createEmptyContact(state) {
      state.currentContact = {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      };
    },
  },
  extraReducers: (builder) => {
    //getContacts
    builder.addCase(getContacts.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.error = null;
      state.contacts = payload;
    });
    builder.addCase(getContacts.pending, setFetching);
    builder.addCase(getContacts.rejected, setError);

    //addContact
    builder.addCase(addContact.pending, setFetching);
    builder.addCase(addContact.rejected, setError);

    //updateContact
    builder.addCase(updateContact.pending, setFetching);
    builder.addCase(updateContact.rejected, setError);

    //delContact
    builder.addCase(delContact.pending, setFetching);
    builder.addCase(delContact.rejected, setError);
  },
});

const { actions, reducer } = contactSlice;

const {
  createContact,
  removeContact,
  changeContact,
} = actions;

export const { setCurrentContact, createEmptyContact } = actions;

export default reducer;
