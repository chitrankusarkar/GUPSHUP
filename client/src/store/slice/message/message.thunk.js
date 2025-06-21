import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/utilities/axiosinstance.js";
import { toast } from "react-hot-toast";

export const getMessageThunk = createAsyncThunk(
  "message/getMessages",
  async ({ receiverId, page = 1 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/message/get-messages/${receiverId}?page=${page}`);
      const data = res.data;

      if (!Array.isArray(data.responseData?.messages)) {
        data.responseData.messages = [];
      }

      return data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage || "Failed to load messages.";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
export const sendMessageThunk = createAsyncThunk(
  "message/sendMessage",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/message/send/${receiverId}`, { message });
      return res.data;
    } catch (error) {
      const errorOutput = error?.response?.data?.errMessage || "Message send failed.";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
