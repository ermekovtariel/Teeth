import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import persistReducer from "redux-persist/es/persistReducer"
import storage from "redux-persist/lib/storage"
import { WBapi } from "./Api"

import authSlice from "./Auth/authSlice"

const rootReducer = combineReducers({
	auth: authSlice,
})

const persistConfig = {
	key: "TISH",
	storage,
	whitelist: ["settingsColumns"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
	return configureStore({
		reducer: persistedReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [
						FLUSH,
						REHYDRATE,
						PAUSE,
						PERSIST,
						PURGE,
						REGISTER,
						"userTariff/setUserTariff",
					],
					ignoredActionsPaths: ["userTariff.tariffExpiration", "payload.error"],
				},
			}).concat(WBapi.middleware),
	})
}
