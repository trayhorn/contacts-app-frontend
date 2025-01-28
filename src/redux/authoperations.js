import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

export const tokenTest = {
  set(token) {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  },
  unset() {
    axios.defaults.headers.common = '';
  }
}

tokenTest.set();

export const registerUser = createAsyncThunk("auth/register",
  async (body, thunkAPI) => {
	try {
    const { data } = await axios.post("/users/signup", body);
    tokenTest.set(data.token);
    return data;
	} catch (e) {
    return thunkAPI.rejectWithValue(e.message);
	}
});

export const loginUser = createAsyncThunk("auth/login",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", body);
      tokenTest.set(data.token);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  });

export const logoutUser = createAsyncThunk("auth/logout",
  async (_, thunkAPI) => {
	try {
		const { data } = await axios.post("/users/logout", null);
    tokenTest.unset();
		return data;
  } catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
  });

export const fetchCurrentUser = createAsyncThunk("auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
			console.log("No token: returning from function");
			return;
    }

    tokenTest.set(persistedToken);

    try {
      const { data } = await axios.get("/users/current", {
				headers: { Authorization: `Bearer ${persistedToken}` },
			});
      return data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  });