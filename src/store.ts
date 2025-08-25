import { configureStore } from "@reduxjs/toolkit";

// Example slice (replace with actual slices)
// import { workOrderSlice } from "../domain/entities/WorkOrder";

export const store = configureStore({
	reducer: {
		// bom: bomSlice.reducer,
		// workOrder: workOrderSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
