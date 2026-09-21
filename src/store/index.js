import { createStore } from "redux";

import contactsReducer from "./reducers/contactsReducer.js";

export default createStore(contactsReducer);
