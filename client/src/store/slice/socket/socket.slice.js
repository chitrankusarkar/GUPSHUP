import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';

const initialState = {
  socket: null,
  onlineUsers: [],
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setSocket, setOnlineUsers } = socketSlice.actions;

export const initializeSocket = (userId) => (dispatch, getState) => {
  const existingSocket = getState().socketReducer.socket;
  if (existingSocket) return;

  const socket = io(import.meta.env.VITE_DB_ORIGIN, {
    query: { userId },
    withCredentials: true,
  });

  dispatch(setSocket(socket));

  socket.on("onlineUsers", (users) => {
    dispatch(setOnlineUsers(users));
  });
};

export default socketSlice.reducer;
