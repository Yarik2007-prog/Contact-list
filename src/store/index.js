import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../sagas/index.js";

import contactsReducer from "./reducers/contactsReducer.js";

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware, logger);

export default createStore(contactsReducer, composeWithDevTools(middleware));

sagaMiddleware.run(rootSaga);
