import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../../components/utilities/axiosinstance";
import { toast } from 'react-hot-toast'

export const loginUserThunk = createAsyncThunk("user/login", async ({ username_or_email, password }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/login", {
            username_or_email,
            password,
        })
        // console.log(response)
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
