import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const setAuthHeader = (token) => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const unsetAuthHeader = () => {
	axios.defaults.headers.common.Authorization = "";
};

export const registerUser = createAsyncThunk(
	"auth/register",
	async (body, thunkAPI) => {
		try {
			const { data } = await axios.post(
				"/users/register",
				body
			);
			setAuthHeader(data.token);
			return data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	"auth/login",
	async (body, thunkAPI) => {
		try {
			const { data } = await axios.post("/users/login", body);
			setAuthHeader(data.token);
			return data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const logoutUser = createAsyncThunk(
	"auth/logout",
	async (_, thunkAPI) => {
		try {
			const { data } = await axios.post("/users/logout", null);
			unsetAuthHeader();
			return data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);

export const fetchCurrentUser = createAsyncThunk(
	"auth/refresh",
	async (_, thunkAPI) => {
		const persistedToken = thunkAPI.getState().auth.token;

		if (!persistedToken) {
			return thunkAPI.rejectWithValue("No token found");
		}

		setAuthHeader(persistedToken);

		try {
			const { data } = await axios.get("/users/current", {
				headers: { Authorization: `Bearer ${persistedToken}` },
			});
			return data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);
