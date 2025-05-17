import { createSlice } from '@reduxjs/toolkit'
import { getMessageThunk, sendMessageThunk } from './message.thunk.js';

const initialState = {
  buttonLoading: false,
  screenLoading: false,
  messages: null
}
export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {

    },
    // send
    extraReducers: (builder) => {
        builder.addCase(sendMessageThunk.pending, (state, action) => {
            state.buttonLoading = true
        });
        builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
            state.messages = [...state.messages, action.payload?.responseData]
            state.buttonLoading = false
        });
        builder.addCase(sendMessageThunk.rejected, (state, action) => {
            state.buttonLoading = false
        });

        // get
        builder.addCase(getMessageThunk.pending, (state, action) => {
            state.buttonLoading = true
        });
        builder.addCase(getMessageThunk.fulfilled, (state, action) => {
            state.messages = action.payload?.responseData?.messages
            state.buttonLoading = false
        });
        builder.addCase(getMessageThunk.rejected, (state, action) => {
            state.buttonLoading = false
        });
    },
});

export const {  } = messageSlice.actions;
export default messageSlice.reducer