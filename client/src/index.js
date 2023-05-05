import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App';

import mainReducer from "./state";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig= {
    key: "root",
    storage,
    version : 1,
    blacklist: ['date', 'pastGame', 'schedule']
};
const persistedReducer = persistReducer(persistConfig, mainReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware : (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck : {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
    
});

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
            <App />
        </PersistGate>
    </Provider>
);
