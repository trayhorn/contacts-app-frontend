import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

let token = '';

export const registerUser = createAsyncThunk("auth/register", async (body) => {
	try {
    const { data } = await axios.post("/users/signup", body);
    token = data.token;
    return data;
	} catch (error) {
		console.log(error);
	}
});

export const loginUser = createAsyncThunk("auth/login", async (body) => {
  try {
    const { data } = await axios.post("/users/login", body);
    token = data.token;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    const { data } = await axios.post("/users/logout", null, {
      headers: { Authorization: `Bearer ${token}` }
    })
    token = '';
    return data;
  } catch (error) {
    console.log(error);
  }
})