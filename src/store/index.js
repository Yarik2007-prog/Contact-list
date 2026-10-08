import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";

import reducer from "./slices/contactSlice.js";

export default configureStore({
  reducer: {
    contactList: reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
