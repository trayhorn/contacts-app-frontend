import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://63cfa01f109824043782d052.mockapi.io/";

export const fetchAllContacts =
  createAsyncThunk('contacts/fetchAll', async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/contacts");
			return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  })

export const addContact = createAsyncThunk(
	"contacts/addContact",
	async (contact, thunkApi) => {
		try {
			const { data } = await axios.post("/contacts", contact);
			return data;
		} catch (e) {
			return thunkApi.rejectWithValue(e.message);
		}
	}
);

export const deleteContact = createAsyncThunk(
	"contacts/deleteContact",
	async (contactId, thunkApi) => {
		try {
			const { data } = await axios.delete(`/contacts/${contactId}`);
			return data;
		} catch (e) {
			return thunkApi.rejectWithValue(e.message);
    }
	}
);

export const editContact = createAsyncThunk(
	"contacts/editContact",
	async (contact, thunkApi) => {
		try {
			const { data } = await axios.put(`/contacts/${contact.id}`, contact);
      return data;
		} catch (e) {
			return thunkApi.rejectWithValue(e.message);
		}
	}
);