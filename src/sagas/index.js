import { takeLatest } from "redux-saga/effects";

import ACTION_TYPES from "../store/actions/actionsType.js";

import {
  addContactSaga,
  delContactSaga,
  getContactsSaga,
  updateContactSaga,
} from "./contactSagas.js";

function* rootSaga() {
  yield takeLatest(ACTION_TYPES.GET_CONTACTS_ACTION, getContactsSaga);
  yield takeLatest(ACTION_TYPES.POST_CONTACT_ACTION, addContactSaga);
  yield takeLatest(ACTION_TYPES.DELETE_CONTACT_ACTION, delContactSaga);
  yield takeLatest(ACTION_TYPES.PUT_CONTACT_ACTION, updateContactSaga);
}

export default rootSaga;
