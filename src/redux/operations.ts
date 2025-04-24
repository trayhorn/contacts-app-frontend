import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Contact } from "./contactsSlice";

type Params = {
	_id?: string;
	contact: {
		name: string;
		number: string;
	};
	token: string;
};

type RejectValue = {
	rejectValue: string;
}

export const fetchAllContacts = createAsyncThunk<Contact[], void, RejectValue>(
	"contacts/fetchAll",
	async (_, thunkApi) => {
		try {
			const { data } = await axios.get("/api/contacts/");
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return thunkApi.rejectWithValue(err.message);
		}
	}
);

export const addContact = createAsyncThunk<Contact, Params, RejectValue>(
	"contacts/addContact",
	async (params, thunkApi) => {
		try {
			const { data } = await axios.post("/api/contacts/", params.contact);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return thunkApi.rejectWithValue(err.message);
		}
	}
);

export const deleteContact = createAsyncThunk<Contact, { _id: string; token: string }, RejectValue>(
	"contacts/deleteContact",
	async (params, thunkApi) => {
		try {
			const { data } = await axios.delete(`/api/contacts/${params._id}`);
			console.log(data);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return thunkApi.rejectWithValue(err.message);
		}
	}
);

export const editContact = createAsyncThunk<Contact, Params, RejectValue>(
	"contacts/editContact",
	async (params, thunkApi) => {
		try {
			const { data } = await axios.put(
				`/api/contacts/${params._id}`,
				params.contact
			);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return thunkApi.rejectWithValue(err.message);
		}
	}
);