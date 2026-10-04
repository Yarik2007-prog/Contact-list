import { put } from "redux-saga/effects";

import api from "../api/contact-service.js";
import {
  addContactError,
  addContactRequest,
  addContactSuccess,
  delContactError,
  delContactRequest,
  delContactSuccess,
  getContactsError,
  getContactsRequest,
  getContactsSuccess,
  updateContactError,
  updateContactRequest,
  updateContactSuccess,
} from "../store/actions/contactActions.js";

export function* getContactsSaga() {
  yield put(getContactsRequest());
  try {
    const contacts = yield api.get("/").then(({ data }) => data);
    yield put(getContactsSuccess(contacts));
  } catch (error) {
    yield put(getContactsError(error));
  }
}

export function* addContactSaga({ payload }) {
  yield put(addContactRequest());
  try {
    const newContact = yield api.post("/", payload).then(({ data }) => data);
    yield put(addContactSuccess(newContact));
  } catch (error) {
    yield put(addContactError(error));
  }
}

export function* delContactSaga({ payload }) {
  yield put(delContactRequest());
  try {
    const delContact = yield api.delete(`/${payload}`).then(({ data }) => data);
    yield put(delContactSuccess(delContact.id));
  } catch (error) {
    yield put(delContactError(error));
  }
}

export function* updateContactSaga({ payload }) {
  yield put(updateContactRequest());
  try {
    const updateContact = yield api.put(`/${payload.id}`, payload).then(({ data }) => data);
    yield put(updateContactSuccess(updateContact));
  } catch (error) {
    yield put(updateContactError(error));
  }
}

