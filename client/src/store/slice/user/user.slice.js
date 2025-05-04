import { createSlice, isAction } from '@reduxjs/toolkit'
import { loginUserThunk, signUpUserThunk } from './user.thunk.js';

const initialState = {
    isAuthenticated: false,
    screenLoading: false,
    userProfile: null,
    buttonLoading: false
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    // Login
    extraReducers: (builder) => {
        builder.addCase(loginUserThunk.pending, (state, action) => {
            state.buttonLoading = true
        });
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            state.userProfile = action.payload?.responseData?.user
            state.buttonLoading = false
        });
        builder.addCase(loginUserThunk.rejected, (state, action) => {
            state.buttonLoading = false
        });

        // Signup
        builder.addCase(signUpUserThunk.pending, (state, action) => {
            state.buttonLoading = true
        });
        builder.addCase(signUpUserThunk.fulfilled, (state, action) => {
            state.userProfile = action.payload?.responseData?.user
            state.buttonLoading = false
        });
        builder.addCase(signUpUserThunk.rejected, (state, action) => {
            state.buttonLoading = false
        });
    },
});

export const { } = userSlice.actions;
export default userSlice.reducer