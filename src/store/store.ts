import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile";
// Example slice (replace with actual slices)
// import { workOrderSlice } from "../domain/entities/WorkOrder";

export const store = configureStore({
	reducer: {
		profile: profileReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
