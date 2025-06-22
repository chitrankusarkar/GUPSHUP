import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk.js";

const initialState = {
  messages: [],
  hasMore: true,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
      state.hasMore = true;
    },
    addIncomingMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateMessageStatus: (state, action) => {
      const { messageId, status } = action.payload;
      const msg = state.messages.find(m => m._id === messageId);
      if (msg) msg.status = status;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      const res = action.payload?.responseData;
      const newMessages = Array.isArray(res?.messages) ? res.messages : [];
      state.hasMore = res?.hasMore ?? false;
      state.messages = [...newMessages, ...state.messages];
    });
  },
});

export const { clearMessages, addIncomingMessage, updateMessageStatus } = messageSlice.actions;
export default messageSlice.reducer;
