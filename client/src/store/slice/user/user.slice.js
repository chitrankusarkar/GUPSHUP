import { createSlice } from '@reduxjs/toolkit';
import {
  getUserProfileThunk,
  loginUserThunk,
  logoutUserThunk,
  signUpUserThunk,
  getOtherUsersThunk
} from './user.thunk.js';

const initialState = {
  isAuthenticated: false,
  userProfile: null,
  otherUsers: null,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
  buttonLoading: false,
  screenLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    builder.addCase(signUpUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(signUpUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;
    });
    builder.addCase(signUpUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    builder.addCase(logoutUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.userProfile = null;
      state.selectedUser = null;
      state.otherUsers = null;
      state.isAuthenticated = false;
      state.buttonLoading = false;
      localStorage.clear();
    });
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    builder.addCase(getUserProfileThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.screenLoading = false;
      state.userProfile = action.payload?.responseData;
    });
    builder.addCase(getUserProfileThunk.rejected, (state) => {
      state.screenLoading = false;
      state.isAuthenticated = false;
      state.userProfile = null;
    });

    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload?.responseData;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state) => {
      state.screenLoading = false;
    });
  },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
