import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from './contactsSlice';
import filterReducer from './filterSlice';
import modalReducer from './modalSlice';
import authReducer from './authslice';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
	reducer: {
		contacts: contactsReducer,
		filter: filterReducer,
		modal: modalReducer,
		auth: persistedAuthReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

const persistor = persistStore(store);

export { store, persistor };






