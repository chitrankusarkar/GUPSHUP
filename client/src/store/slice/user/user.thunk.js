import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/utilities/axiosinstance.js";
import { toast } from "react-hot-toast";
import { initializeSocket } from "../socket/socket.slice.js";

export const getOtherUsersThunk = createAsyncThunk(
  "user/getOtherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-other-users");
      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      return rejectWithValue(errorOutput);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ username_or_email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        username_or_email,
        password,
      });

      dispatch(initializeSocket(response.data.responseData.user._id));
      dispatch(getOtherUsersThunk());

      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const signUpUserThunk = createAsyncThunk(
  "user/signup",
  async ({ fullName, username, email, password, gender }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/signup", {
        fullName,
        username,
        email,
        password,
        gender,
      });

      dispatch(initializeSocket(response.data.responseData.user._id));
      dispatch(getOtherUsersThunk());

      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage || "Signup failed";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      toast.success("Logout successful!");
      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      return rejectWithValue(errorOutput);
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-profile");

      dispatch(initializeSocket(response.data.responseData._id));
      dispatch(getOtherUsersThunk());

      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      return rejectWithValue(errorOutput);
    }
  }
);
