import { configureStore } from "@reduxjs/toolkit";

// import { logger } from "redux-logger";
import reducer from "./slices/contactSlice";

export default configureStore({
  reducer: {
    contactList: reducer,
  },
});
