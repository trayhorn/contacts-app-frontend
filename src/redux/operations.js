import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllContacts = createAsyncThunk(
	'contacts/fetchAll',
	async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/api/contacts/");
			return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  })

export const addContact = createAsyncThunk(
	"contacts/addContact",
	async (params, thunkApi) => {
		try {
			const { data } = await axios.post("/api/contacts/", params.contact);
			return data;
		} catch (e) {
			return thunkApi.rejectWithValue(e.message);
		}
	}
);

export const deleteContact = createAsyncThunk(
	"contacts/deleteContact",
	async (params, thunkApi) => {
		try {
			const { data } = await axios.delete(`/api/contacts/${params._id}`);
			return data;
		} catch (e) {
			return thunkApi.rejectWithValue(e.message);
    }
	}
);

export const editContact = createAsyncThunk(
	"contacts/editContact",
	async (params, thunkApi) => {
		try {
			const { data } = await axios.put(
				`/api/contacts/${params._id}`,
				params.contact
			);
      return data;
		} catch (e) {
			return thunkApi.rejectWithValue(e.message);
		}
	}
);