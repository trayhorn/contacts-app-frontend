import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../store";

axios.defaults.baseURL = "https://contacts-book-be.onrender.com";

const setAuthHeader = (token: string) => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const unsetAuthHeader = () => {
	axios.defaults.headers.common.Authorization = "";
};

type RequestBody = {
	name: string;
	email: string;
	password: string;
}

type AuthResponse = {
	token: string;
	user: {
		name: string;
		email?: string;
	}
}

export const registerUser = createAsyncThunk<AuthResponse, RequestBody, {rejectValue: string}>(
	"auth/register",
	async (body, thunkApi) => {
		try {
			const { data } = await axios.post("/users/register", body);
			setAuthHeader(data.token);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return thunkApi.rejectWithValue(err.message);
		}
	}
);

type loginUserReturn = {
	token: string;
	user: {
		name: string;
	}
}

export const loginUser = createAsyncThunk<
	loginUserReturn,
	Partial<RequestBody>,
	{ rejectValue: string }
>("auth/login", async (body, thunkApi) => {
	try {
		const { data } = await axios.post("/users/login", body);
		setAuthHeader(data.token);
		return data;
	} catch (e) {
		const err = e as AxiosError;
		return thunkApi.rejectWithValue(err.message);
	}
});

export const logoutUser = createAsyncThunk<void, void, {rejectValue: string}>(
	"auth/logout",
	async (_, thunkApi) => {
		try {
			await axios.post("/users/logout", null);
			unsetAuthHeader();
		} catch (e) {
			const err = e as AxiosError;
			return thunkApi.rejectWithValue(err.message);
		}
	}
);

export const fetchCurrentUser = createAsyncThunk<{ name: string }, void, {state: RootState, rejectValue: string}>(
	"auth/refresh",
	async (_, thunkApi) => {
		const persistedToken = thunkApi.getState().auth.token;

		if (!persistedToken) {
			return thunkApi.rejectWithValue("No token found");
		}

		setAuthHeader(persistedToken);

		try {
			const { data } = await axios.get("/users/current", {
				headers: { Authorization: `Bearer ${persistedToken}` },
			});
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return thunkApi.rejectWithValue(err.message);
		}
	}
);
