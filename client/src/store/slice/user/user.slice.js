import { createSlice, isAction } from '@reduxjs/toolkit'
import { loginUserThunk } from './user.thunk';

const initialState = {
    isAuthenticated: false,
    screenLoading: false,
}
export const userSlice = createSlice ({
    name:'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(loginUserThunk.pending, (state, action) => {
        });
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
        });
        builder.addCase(loginUserThunk.rejected, (state, action) => {
        });
    },
});

export const {} = userSlice.actions;
export default userSlice.reducer