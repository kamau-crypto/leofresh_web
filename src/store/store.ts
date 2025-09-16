import { configureStore } from "@reduxjs/toolkit";
import manufacturingItemsReducer from "./manufacturingItems";
import { profileStorageMiddleware } from "./middleware/profileStorage";
import profileReducer from "./profile";

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		manufacturingItems: manufacturingItemsReducer,
		// Add other reducers her
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(profileStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
