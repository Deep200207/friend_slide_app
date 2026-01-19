import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL=import.meta.env.VITE_BACKEND_URL;
// import { data } from "react-router-dom";

// const [user, setUser] = useState(JSON.parse(localStorage.getItem("slide_user")) || null);
export const sendUser = createAsyncThunk(
  "user/sendUser",
  async ({ name, email, password }) => {
    const res = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials:"include"
    });
    if (!res.ok) {
      throw new Error("Failed to register user");
    }
    return await res.json();
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password },{rejectWithValue}) => {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials:"include"
    });
    const data= await res.json();
    if (!res.ok) {
      return rejectWithValue(data)
    }
    return data
  }
)
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("slide_user")) || null,
    loading: false,
    error: null,
    response: null,
    isAuth: false
  },
  reducers: {
    signupfail: (state, action) => {
      state.error = action.payload;
    },
    loginfail: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("slide_user");
      localStorage.removeItem("slide_token");
      state.user=null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.response = null;
      })
      .addCase(sendUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.meta.arg;
      })
      .addCase(sendUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true,
          state.error = null,
          state.response = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false,
        state.user = action.payload.data,
        console.log(action.payload.data);
        state.response = action.payload
        localStorage.setItem("slide_user",JSON.stringify(action.payload))
        // setUser(action.payload);
        // console.log(action.payload.data.token);
        localStorage.setItem("slide_token",action.payload.data.token)
        state.isAuth=true;
        window.location.href='/'
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false,
          state.error = action.payload.error
          console.log(action.payload);
      })
  }
});

export const { signupfail,logout } = userSlice.actions;
export default userSlice.reducer;
