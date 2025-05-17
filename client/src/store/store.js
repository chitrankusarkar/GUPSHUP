import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slice/user/user.slice.js";
import messageReducer from "./slice/message/message.slice.js"

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer
  },
})
