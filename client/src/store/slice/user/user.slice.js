import { createSlice, isAction } from '@reduxjs/toolkit'
import { getUserProfileThunk, loginUserThunk, logoutUserThunk, signUpUserThunk, getOtherUsersThunk } from './user.thunk.js';

const initialState = {
    isAuthenticated: false,
    screenLoading: true,
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
            state.isAuthenticated = true
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
            state.isAuthenticated = true
            state.buttonLoading = false
        });
        builder.addCase(signUpUserThunk.rejected, (state, action) => {
            state.buttonLoading = false
        });

        // Logout
        builder.addCase(logoutUserThunk.pending, (state, action) => {
            state.buttonLoading = true;
          });
          builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
            state.userProfile = null;
            state.selectedUser = null;
            state.otherUsers = null;
            state.isAuthenticated = false;
            state.buttonLoading = false;
            localStorage.clear();
          });
          builder.addCase(logoutUserThunk.rejected, (state, action) => {
            state.buttonLoading = false;
          });
      
          // Get-User-Profile
          builder.addCase(getUserProfileThunk.pending, (state, action) => {
            state.screenLoading = true;
          });
          builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.screenLoading = false;
            state.userProfile = action.payload?.responseData;
          });
          builder.addCase(getUserProfileThunk.rejected, (state, action) => {
            state.screenLoading = false;
          });

          // Get-Other-Users
          builder.addCase(getOtherUsersThunk.pending, (state, action) => {
            state.screenLoading = true;
          });
          builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
            state.screenLoading = false;
            state.otherUsers = action.payload?.responseData;
          });
          builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
            state.screenLoading = false;
          });
    },
});

export const { } = userSlice.actions;
export default userSlice.reducer