import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

export const fetchAllContacts =
  createAsyncThunk('contacts/fetchAll', async (token, thunkApi) => {
    try {
      const { data } = await axios.get("/contacts", {
				headers: { Authorization: `Bearer ${token}` },
			});
			return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  })

export const addContact = createAsyncThunk(
	"contacts/addContact",
	async (params, thunkApi) => {
		try {
			const { data } = await axios.post("/contacts", params.contact, {
				headers: { Authorization: `Bearer ${params.token} `}
			});
			return data;
		} catch (e) {
			return thunkApi.rejectWithValue(e.message);
		}
	}
);

export const deleteContact = createAsyncThunk(
	"contacts/deleteContact",
	async (params, thunkApi) => {
		console.log(params);
		try {
			const { data } = await axios.delete(
				`/contacts/${params.id}`,
				{
					headers: { Authorization: `Bearer ${params.token}` },
				}
			);
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
			const { data } = await axios.patch(`/contacts/${params.id}`, params.contact, {
				headers: { Authorization: `Bearer ${params.token}` },
			});
      return data;
		} catch (e) {
			return thunkApi.rejectWithValue(e.message);
		}
	}
);