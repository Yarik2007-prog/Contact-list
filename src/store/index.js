import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";

import contactsReducer from "./reducers/contactsReducer.js";

const middleware = applyMiddleware(logger);

export default createStore(contactsReducer, composeWithDevTools(middleware));
