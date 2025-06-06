import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import './index.scss';
import App from './App';
import { Provider } from "react-redux";
import { store } from './redux/store';
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from './redux/store.js';


createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</StrictMode>
);
