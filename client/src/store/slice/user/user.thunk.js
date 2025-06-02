import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../../components/utilities/axiosinstance.js";
import { toast } from 'react-hot-toast'

export const loginUserThunk = createAsyncThunk("user/login", async ({ username_or_email, password }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/login", {
            username_or_email,
            password,
        })
        return response.data
    }
    catch (error) {
        const errorOutput = error?.response?.data?.errMessage
        toast.error(errorOutput)
        return rejectWithValue(errorOutput)
    }
});
export const signUpUserThunk = createAsyncThunk("user/signup", async ({ fullName, username, email, password, gender }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/signup", {
            fullName,
            username,
            email,
            password,
            gender
        });
        return response.data;
    } catch (error) {
        const errorOutput = error?.response?.data?.errMessage || "Signup failed";
        toast.error(errorOutput);
        return rejectWithValue(errorOutput);
    }
});

export const logoutUserThunk = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/logout")
        toast.success('Logout successful!')
        return response.data
    }
    catch (error) {
        const errorOutput = error?.response?.data?.errMessage
        // toast.error(errorOutput)
        return rejectWithValue(errorOutput)
    }
});

export const getUserProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-profile");
      dispatch(getOtherUsersThunk());

      return response.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage;
      return rejectWithValue(errorOutput);
    }
  }
);


export const getOtherUsersThunk = createAsyncThunk(
    "user/getOtherUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user/get-other-users");
            return response.data;
        } catch (error) {
            console.error(error);
            const errorOutput = error?.response?.data?.errMessage;
            // toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }
    }
)