import { createSlice } from "@reduxjs/toolkit";

interface WorkOrder {
	id: string;
	title: string;
	bomId?: string;
}

interface WorkOrderState {
	items: WorkOrder[];
}

const initialState: WorkOrderState = {
	items: [],
};

export const workOrderSlice = createSlice({
	name: "workOrder",
	initialState,
	reducers: {
		addWorkOrder: (state, action) => {
			state.items.push(action.payload as WorkOrder);
		},
	},
});

export const { addWorkOrder } = workOrderSlice.actions;
export default workOrderSlice.reducer;
