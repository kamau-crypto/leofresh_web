import { configureStore } from "@reduxjs/toolkit";
import { profileStorageMiddleware } from "./middleware/profileStorage";
import profileReducer from "./profile";

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		// Add other reducers here
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(profileStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
