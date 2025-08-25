import { createSlice } from "@reduxjs/toolkit";

interface BOM {
	id: string;
	name: string;
	description?: string;
}

interface BOMState {
	items: BOM[];
}

const initialState: BOMState = {
	items: [],
};

export const bomSlice = createSlice({
	name: "bom",
	initialState,
	reducers: {
		addBOM: (state, action) => {
			state.items.push(action.payload as BOM);
		},
	},
});

export const { addBOM } = bomSlice.actions;
export default bomSlice.reducer;
